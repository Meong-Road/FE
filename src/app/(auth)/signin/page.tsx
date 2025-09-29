import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex bg-[#F3F4F6]">
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
        <Image
          src="/assets/images/image.png"
          alt="image"
          width={630}
          height={630}
        />
      </div>

      {/* right block */}
      <div className="flex h-[769px] w-[568px] shrink-0 flex-col items-center justify-center rounded-[40px] bg-[#FFF] px-[56px] py-[81.5px]">
        {/* right block 1: input, login buttons */}
        <div className="flex w-[456px] flex-col items-start gap-[40px]">
          <div className="flex h-[32px] items-center justify-center gap-[341px] self-stretch text-2xl font-bold tracking-[-0.72px] text-[#111827]">
            로그인
          </div>

          <div className="flex flex-col items-start gap-[24px] self-stretch">
            <div className="flex flex-col items-start gap-[4px] self-stretch">
              <label className="flex w-[223px] items-center pr-[178px] pl-[4px] text-base leading-[24px] font-bold tracking-[-0.48px] text-[#333]">
                아이디
              </label>
              <input
                className="flex h-[48px] w-[456px] items-center gap-[10px] rounded-[12px] bg-[#F9FAFB] px-[16px] py-[10px]"
                type="text"
                placeholder="이메일을 입력해주세요"
              />
            </div>

            <div className="flex flex-col items-start gap-[4px] self-stretch">
              <label className="flex w-[223px] items-center pr-[165px] pl-[4px] text-base leading-[24px] font-bold tracking-[-0.48px] text-[#333]">
                비밀번호
              </label>
              <input
                className="flex h-[48px] w-[456px] items-center gap-[10px] rounded-[12px] bg-[#F9FAFB] px-[16px] py-[10px]"
                type="text"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-[16px] self-stretch">
            <button className="flex h-[56px] w-[456px] flex-col items-center justify-center gap-[10px] rounded-[16px] bg-[#EEE] px-[30px] py-[16px] text-xl leading-[28px] font-semibold tracking-[-0.6px] text-[#737373]">
              로그인
            </button>
            <button className="flex h-[56px] w-[456px] flex-col items-center justify-center gap-[10px] rounded-[16px] bg-[#EEE] px-[30px] py-[16px] text-xl leading-[28px] font-semibold tracking-[-0.6px] text-[#737373]">
              카카오 로그인
            </button>
            <div className="flex items-center justify-center gap-[4px] self-stretch">
              <p className="text-[15px] font-bold text-[#1F2937]">
                멍로드가 처음이신가요?
              </p>
              <p className="text-[15px] font-bold text-[#FF8400] underline">
                회원가입
              </p>
            </div>
          </div>
        </div>

        {/* right block 2: --- 또는 --- */}
        <div className="flex w-[451px] flex-wrap content-start items-start gap-x-[30px] gap-y-[24px] pt-[30px]">
          <div className="flex h-[18px] w-[456px] shrink-0 flex-col items-start justify-center gap-[72px] py-[9px]">
            <div className="flex h-[18px] w-[456px] shrink-0 items-center gap-[72px] py-[9px]">
              <div className="flex w-[456px] items-center justify-center gap-[4px]">
                <hr className="h-[1px] w-[192px] border-[#575F69]" />
                <p className="text-[15px] font-bold text-[#1F2937]">또는</p>
                <hr className="h-[1px] w-[192px] border-[#575F69]" />
              </div>
            </div>
          </div>
        </div>

        {/* right block 3: three circles */}
        <div className="flex w-[456px] items-center gap-[30px] px-[103px] pt-[23px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="66"
            viewBox="0 0 65 66"
            fill="none"
          >
            <circle cx="32.5" cy="33" r="32.5" fill="#EEEEEE" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="66"
            viewBox="0 0 65 66"
            fill="none"
          >
            <circle cx="32.5" cy="33" r="32.5" fill="#EEEEEE" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="66"
            viewBox="0 0 65 66"
            fill="none"
          >
            <circle cx="32.5" cy="33" r="32.5" fill="#EEEEEE" />
          </svg>
        </div>
      </div>
    </div>
  );
}
