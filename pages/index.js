"use client";  // ✅ Next.js의 Client Component로 설정

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">🚀 동아리 홈페이지</h2>
        <p className="mt-2 text-gray-700">이곳에서 동아리 활동과 회계를 관리할 수 있습니다.</p>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => router.push("/login")}
            className="p-4 bg-gray-300 text-black rounded w-full"
          >
            🔑 로그인
          </button>
          <button
            onClick={() => router.push("/board")}
            className="p-4 bg-blue-500 text-white rounded w-full"
          >
            📜 게시판
          </button>
          <button
            onClick={() => router.push("/schedule")}
            className="p-4 bg-green-500 text-white rounded w-full"
          >
            📅 일정
          </button>
          <button
            onClick={() => router.push("/account")}
            className="p-4 bg-yellow-500 text-white rounded w-full"
          >
            💰 회계
          </button>
        </div>
      </div>
    </div>
  );
}

