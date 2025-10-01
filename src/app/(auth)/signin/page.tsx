import Image from "next/image";

import walkImage from "@/assets/images/image.png";

import SigninForm from "./_components/SigninForm";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-8">
      {/* left block */}
      <div>
        <div className="flex h-[61px] w-[205px] shrink-0 flex-col items-center gap-[8px]">
          <div className="text-2xl leading-[32px] font-semibold">
            Welcome to 멍로드!
          </div>
          <div className="text-base leading-[24px] font-bold">
            한줄소개 있으면 좋을 것 같습니다.
          </div>
        </div>
        <Image src={walkImage} alt="image" width={630} height={630} />
      </div>

      <SigninForm />
    </div>
  );
}
