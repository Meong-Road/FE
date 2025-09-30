import Image from "next/image";

import SignupForm from "@/app/(auth)/signup/_components/SignupForm";
import walkImage from "@/assets/images/image.png";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-8 xl:gap-12">
      <Image
        src={walkImage}
        alt="image"
        width={480}
        height={480}
        className="hidden h-full min-w-[315px] xl:block"
      />
      <SignupForm />
    </div>
  );
}
