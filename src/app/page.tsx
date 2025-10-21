"use client";
import { useRouter } from "next/navigation";

import { PATH } from "@/lib/constants/path";

export default function Home() {
  const router = useRouter();

  router.push(PATH.REGULAR);
  return <></>;
}
