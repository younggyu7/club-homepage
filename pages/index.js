import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">🚀 동아리 홈페이지에 오신 것을 환영합니다!</h2>
        <p className="mt-2 text-gray-700">이곳에서 동아리 활동과 회계를 관리할 수 있습니다.</p>

        <div className="mt-6 space-y-4">
          <Link href="/board">
            <div className="p-4 bg-blue-300 text-white rounded cursor-pointer">📜 게시판</div>
          </Link>
          <Link href="/schedule">
            <div className="p-4 bg-green-300 text-white rounded cursor-pointer">📅 일정</div>
          </Link>
          <Link href="/account">
            <div className="p-4 bg-yellow-300 text-white rounded cursor-pointer">💰 회계</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

