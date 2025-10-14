import Image from "next/image";

import SigninForm from "@/app/(auth)/signin/SigninForm";
import walkImage from "@/assets/images/image.png";
import Header from "@/components/Header";

export default function SigninPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-svh w-full items-center justify-center px-4 py-8 xl:gap-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="text-2xl leading-8 font-semibold">
              Welcome to 멍로드!
            </div>
            <div className="text-base leading-6 font-bold">
              한줄소개 있으면 좋을 것 같습니다.
            </div>
          </div>

          <Image
            src={walkImage}
            alt="image"
            width={400}
            height={400}
            className="hidden h-full min-w-[315px] xl:block"
          />
        </div>

        <SigninForm />
      </div>
    </>
  );
}
