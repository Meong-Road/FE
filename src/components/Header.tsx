"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import ProfileSvg from "@/assets/images/profile.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignout } from "@/hooks/auth/useSignout";
import { useGetMyInfo } from "@/hooks/queries/user";
import { PATH } from "@/lib/constants/path";
import { cn } from "@/lib/utils";

import Logo from "./Logo";

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
  const router = useRouter();
  const pathname = usePathname();
  const signout = useSignout();

  const { data: user } = useGetMyInfo();
  const handleSignout = () => {
    signout();
    router.push(PATH.SIGNIN);
  };

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-10 flex h-16 w-full items-center justify-center bg-white/70 backdrop-blur-2xl select-none md:h-22",
        className,
      )}
    >
      <div className="flex w-full max-w-[1280px] items-center justify-between px-4 md:px-8">
        <Link href={PATH.HOME} className="shrink-0">
          <Logo width={92} />
        </Link>

        {/* Desktop Menu */}
        <div className="ml-4 hidden w-full items-center justify-between md:flex">
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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ProfileSvg
                  width={42}
                  height={42}
                  className="cursor-pointer rounded-full border border-[#DDDDDD]"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="end"
                sideOffset={8}
                className="hidden w-36 md:block"
              >
                <DropdownMenuItem onSelect={() => router.push(PATH.MY_PROFILE)}>
                  마이페이지
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignout}>
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <ProfileSvg
              width={42}
              height={42}
              className="cursor-pointer rounded-full border border-[#DDDDDD]"
              onClick={() => router.push(PATH.SIGNIN)}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="text-primary h-7 w-7 cursor-pointer md:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="w-36 md:hidden"
          >
            {HEADER_ITEMS.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onSelect={() => router.push(item.href)}
                className={cn(isActive(item.href) && "text-primary font-bold")}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
            <div className="my-1 border-t" />
            {user ? (
              <>
                <DropdownMenuItem onSelect={() => router.push(PATH.MY_PROFILE)}>
                  마이페이지
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignout}>
                  로그아웃
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onSelect={() => router.push(PATH.SIGNIN)}>
                로그인
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
