/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // ✅ Vercel에서 동적 페이지를 제대로 인식하게 함
  trailingSlash: true,   // ✅ URL 끝에 슬래시 추가하여 라우팅 문제 해결 가능
};

module.exports = nextConfig;

