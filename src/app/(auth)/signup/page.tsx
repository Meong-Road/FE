import Image from "next/image";

import SignupForm from "@/app/(auth)/signup/SignupForm";
import walkImage from "@/assets/images/image.png";

export default function SignupPage() {
  return (
    <div className="absolute top-0 left-0 flex min-h-svh w-full items-center justify-center px-4 py-8 xl:gap-10">
      <Image
        src={walkImage}
        alt="image"
        width={400}
        height={400}
        className="hidden h-full min-w-[315px] xl:block"
      />
      <SignupForm />
    </div>
  );
}
