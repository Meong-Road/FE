export function ProfileHeader({ title = "마이페이지" }: { title?: string }) {
  return (
    <h2 className="mb-6 text-left text-xl leading-none font-semibold select-none sm:text-2xl">
      {title}
    </h2>
  );
}
