"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/auth";
import { PATH } from "@/lib/constants/path";
import { cn } from "@/lib/utils";

import { DesktopOnly, MobileOnly } from "../common";
import Logo from "../Logo";

import { AuthButtons } from "./AuthButtons";
import { MobileMenuDropdown } from "./MobileMenuDropdown";
import { UserProfileDropdown } from "./UserProfileDropdown";

const HEADER_ITEMS = [
  {
    name: "정기 모임",
    href: PATH.REGULAR,
  },
  {
    name: "번개 모임",
    href: PATH.QUICK,
  },
  {
    name: "찜한 모임",
    href: PATH.FAVORITES,
  },
  {
    name: "모든 리뷰",
    href: PATH.REVIEWS,
  },
];

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div
      className={cn(
        "bg-background/70 fixed top-0 left-0 z-10 flex h-16 w-full items-center justify-center backdrop-blur-lg select-none sm:h-22",
        className,
      )}
    >
      <div className="flex w-full max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <Link href={PATH.HOME} className="shrink-0">
          <Logo width={92} />
        </Link>

        {/* Desktop Menu */}
        <DesktopOnly className="ml-4 w-full items-center justify-between">
          <ul className="flex items-center gap-2">
            {HEADER_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2.5 font-medium text-[#8B8B8B]",
                    isActive(item.href) && "text-primary font-bold",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {isLoading ? (
            <div className="h-[42px] w-[42px] animate-pulse rounded-full border border-[#DDDDDD]" />
          ) : user ? (
            <UserProfileDropdown />
          ) : (
            <AuthButtons />
          )}
        </DesktopOnly>

        {/* Mobile Menu */}
        <MobileOnly>
          <MobileMenuDropdown />
        </MobileOnly>
      </div>
    </div>
  );
}
