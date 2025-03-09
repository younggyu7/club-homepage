import { useEffect, useState } from "react";
import { auth, signInWithPopup, provider, signOut } from "../lib/firebase";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>동아리 홈페이지</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.displayName}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              로그아웃
            </button>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-white text-blue-500 px-4 py-2 rounded">
            로그인
          </button>
        )}
      </div>
    </nav>
  );
}

