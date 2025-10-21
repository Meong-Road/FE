"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { useSignout } from "@/hooks/auth/useSignout";
import { PATH } from "@/lib/constants/path";

import UserProfileImage from "./UserProfileImage";

export function UserProfileDropdown() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const signout = useSignout();

  const handleSignout = () => {
    signout();
    router.push(PATH.SIGNIN);
  };

  if (isLoading) {
    return (
      <div className="h-[42px] w-[42px] animate-pulse rounded-full border border-[#DDDDDD]" />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserProfileImage userProfileImageURL={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={4}
        className="hidden w-36 sm:block"
      >
        <DropdownMenuItem onSelect={() => router.push(PATH.MY_PROFILE)}>
          마이페이지
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleSignout}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
