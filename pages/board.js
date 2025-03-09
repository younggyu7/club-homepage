"use client";

import { useEffect, useState } from "react";
import { db, auth, collection, addDoc, query, orderBy, onSnapshot } from "../lib/firebase";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 🔹 Firestore에서 게시글 가져오기 (실시간 업데이트)
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe(); // 🔹 컴포넌트가 언마운트될 때 구독 해제
  }, []);

  const handlePost = async () => {
    if (!content.trim()) {
      setMessage("내용을 입력하세요.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setMessage("로그인 후 작성할 수 있습니다.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        author: user.displayName || "익명",
        email: user.email,
        createdAt: new Date(),
      });

      setContent(""); // 입력창 초기화
      setMessage("게시글이 등록되었습니다.");
    } catch (error) {
      console.error(error);
      setMessage("게시글 등록 실패: " + error.message);
    }
  };

  return (
    <div>
      <h1>게시판</h1>
      {auth.currentUser ? (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요..."
          />
          <button onClick={handlePost}>게시글 작성</button>
        </div>
      ) : (
        <p>로그인 후 글을 작성할 수 있습니다.</p>
      )}
      {message && <p>{message}</p>}

      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p><strong>{post.author}</strong> ({post.email})</p>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

