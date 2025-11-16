// 루트 페이지는 next.config.ts의 redirects 설정에 의해
// /regular로 자동 리다이렉트됩니다.
// 이 파일은 실제로 렌더링되지 않지만, Next.js 규칙상 유지합니다.

export default function Home() {
  return null;
}
