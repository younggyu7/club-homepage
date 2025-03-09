import Navbar from "../components/Navbar";

export default function Board() {
  const posts = [
    { id: 1, title: "첫 번째 공지", author: "관리자", date: "2025-03-10" },
    { id: 2, title: "두 번째 공지", author: "운영진", date: "2025-03-09" }
  ];

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">📜 게시판</h2>
        <ul className="mt-4 space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.author} | {post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

