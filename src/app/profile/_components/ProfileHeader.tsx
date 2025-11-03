export function ProfileHeader({ title }: { title: string }) {
  return (
    <h2 className="mb-6 text-left text-[24px] leading-none font-semibold select-none sm:text-[32px]">
      {title}
    </h2>
  );
}
