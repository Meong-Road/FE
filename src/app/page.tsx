import { redirect } from "next/navigation";

import { PATH } from "@/lib/constants/path";

export default function Home() {
  redirect(PATH.REGULAR);
}
