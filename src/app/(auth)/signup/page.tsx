import Image from "next/image";

import SignupForm from "@/app/(auth)/signup/_components/SignupForm";
import walkImage from "@/assets/images/image.png";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-8">
      <Image
        src={walkImage}
        alt="image"
        width={630}
        height={630}
        className="hidden min-w-[315px] lg:block"
      />
      <SignupForm />
    </div>
  );
}
