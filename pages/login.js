"use client";

import { auth, provider, signInWithPopup, signOut } from "../lib/firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// ✅ db를 `getFirestore()`로 명확하게 선언
const db = getFirestore();


import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");

  // 🔹 Google 로그인 (학교 이메일만 허용 + 가입 절차 추가)
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const uid = result.user.uid;

      // 🚨 학교 이메일(@yonsei.ac.kr) 체크
      if (!email.endsWith("@yonsei.ac.kr")) {
        setMessage("연세대학교 이메일(@yonsei.ac.kr)만 가입할 수 있습니다.");
        await signOut(auth); // 자동 로그아웃
        setUser(null);
        return;
      }

      // 🔹 Firestore에서 사용자 정보 확인
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // 🔥 최초 로그인 → 추가 정보 입력 단계로 이동
        setUser(result.user);
        setIsNewUser(true);
      } else {
        // 🔹 기존 사용자 → 바로 로그인 완료
        setUser(result.user);
        setMessage("로그인 성공!");
      }
    } catch (error) {
      console.error(error);
      setMessage("로그인 실패: " + error.message);
    }
  };

  // 🔹 가입 절차 (Firestore에 추가 정보 저장)
  const handleSignup = async () => {
    if (!extraInfo.trim()) {
      setMessage("추가 정보를 입력해주세요.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        extraInfo: extraInfo,
        createdAt: new Date()
      });

      setMessage("회원가입 완료! 로그인되었습니다.");
      setIsNewUser(false);
    } catch (error) {
      console.error(error);
      setMessage("회원가입 실패: " + error.message);
    }
  };

  // 🔹 로그아웃
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMessage("로그아웃되었습니다.");
  };

  return (
    <div>
      <h1>로그인</h1>
      {user ? (
        isNewUser ? (
          <div>
            <p>추가 정보를 입력해주세요:</p>
            <input
              type="text"
              placeholder="예: 학번, 전공, 전화번호 등"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <button onClick={handleSignup}>가입 완료</button>
          </div>
        ) : (
          <div>
            <p>환영합니다, {user.displayName}님! ({user.email})</p>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )
      ) : (
        <button onClick={handleLogin}>Google 로그인</button>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

