import Image from "next/image";

import SigninForm from "@/app/(auth)/signin/SigninForm";
import walkImage from "@/assets/images/image.png";

export default function SigninPage() {
  return (
    <div className="relative flex w-full items-center justify-center xl:gap-10">
      <Image
        src={walkImage}
        alt="image"
        width={400}
        height={400}
        className="hidden h-full min-w-[315px] xl:block"
      />
      <SigninForm />
    </div>
  );
}
