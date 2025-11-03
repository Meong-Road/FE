"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { useSignoutMutation } from "@/hooks/auth/useSignoutMutation";
import { QUERY_KEYS } from "@/hooks/queries/queryKey";
import { PATH } from "@/lib/constants/path";
import { cn } from "@/lib/utils";

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

export function MobileMenuDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate: signoutMutation } = useSignoutMutation();
  const isSigningOutRef = useRef(false);

  const isActive = (href: string) => pathname.startsWith(href);

  // pathname이 변경되면 user invalidate
  useEffect(() => {
    if (isSigningOutRef.current && pathname === PATH.REGULAR) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
      isSigningOutRef.current = false;
    }
  }, [pathname, queryClient]);

  const handleSignout = () => {
    signoutMutation(undefined, {
      onSuccess: () => {
        isSigningOutRef.current = true;
        router.push(PATH.REGULAR);
        toast.success("로그아웃에 성공했습니다.");
      },
      onError: (error: Error) => {
        toast.error(`로그아웃 실패: ${error.message}`);
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="text-primary h-7 w-7 cursor-pointer sm:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={4}
        className="w-36 sm:hidden"
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
          <>
            <DropdownMenuItem onSelect={() => router.push(PATH.SIGNIN)}>
              로그인
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push(PATH.SIGNUP)}>
              회원가입
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
