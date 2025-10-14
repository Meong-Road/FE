"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ProfileSvg from "@/assets/images/profile.svg";
import { cn } from "@/lib/utils";

import Logo from "./Logo";

const HEADER_ITEMS = [
  {
    name: "정기 모임",
    href: "/regular",
  },
  {
    name: "번개 모임",
    href: "/quick",
  },
  {
    name: "찜한 모임",
    href: "/favorites",
  },
  {
    name: "모든 리뷰",
    href: "/reviews",
  },
];

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-10 h-22 w-full bg-white/70 py-4 backdrop-blur-2xl",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-2">
        <Link href="/" className="shrink-0">
          <Logo width={92} />
        </Link>
        <div className="flex w-full items-center justify-between gap-4">
          <ul className="flex items-center gap-2">
            {HEADER_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-4 font-medium text-[#8B8B8B]",
                    isActive(item.href) && "text-primary font-bold",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/profile" className="shrink-0 p-1.5">
            <ProfileSvg
              width={42}
              className="rounded-full border border-[#DDDDDD]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
