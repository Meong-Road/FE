"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthUser } from "@/hooks/auth/useAuthUser";
import { redirectIfNoUser } from "@/lib/utils/redirectIfNoUser";

export default function QuickCreatePage() {
  const router = useRouter();
  const { data: user } = useAuthUser();

  useEffect(() => {
    redirectIfNoUser({ user, redirect: router.replace });
  }, [user, router]);

  return <div>QuickCreatePage</div>;
}
