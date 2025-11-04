"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { useSignoutMutation } from "@/hooks/auth/useSignoutMutation";
import { PATH } from "@/lib/constants/path";

import UserProfileImage from "./UserProfileImage";

export function UserProfileDropdown() {
  const router = useRouter();

  const { user, isLoading } = useAuth();
  const { mutate: signoutMutation } = useSignoutMutation();

  const handleSignout = () => {
    signoutMutation(undefined, {
      onSuccess: () => {
        router.push(PATH.SIGNIN);
        toast.success("로그아웃에 성공했습니다.");
      },
      onError: (error: Error) => {
        toast.error(`로그아웃 실패: ${error.message}`);
      },
    });
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
