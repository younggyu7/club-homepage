"use client";

import { useEffect, useState } from "react";
import { auth, signOut } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");  // ✅ 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        동아리 홈페이지
      </h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.displayName}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              로그아웃
            </button>
          </>
        ) : (
          <button onClick={() => router.push("/login")} className="hidden">
            로그인
          </button>
        )}
      </div>
    </nav>
  );
}

