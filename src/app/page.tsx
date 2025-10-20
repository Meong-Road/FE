"use client";

import Link from "next/link";

import PetInfoModal from "@/components/Modal/PetInfoModal";
import { PATH } from "@/lib/constants/path";
import { usePetInfoModalStore } from "@/store/modalStore";

const BUTTON_CN =
  "block w-full rounded bg-gray-400 font-bold px-4 py-2 text-center text-white hover:brightness-90";

export default function Home() {
  const { isOpen, openModal, closeModal } = usePetInfoModalStore();

  return (
    <div className="p-8">
      <h1 className="mb-2 text-2xl font-bold">멍로드 네비게이션</h1>
      <p className="mb-8 text-sm text-gray-500">
        모든 링크로 이동할 수 있습니다.
      </p>

      {/* 네비게이션 링크 섹션 */}
      <div className="mb-8 grid w-full grid-cols-4 gap-4">
        {/* 인증 관련 */}
        <div className="rounded-lg bg-gray-50">
          <h2 className="mb-3 text-lg font-semibold">인증</h2>
          <div className="space-y-2">
            <Link href={PATH.SIGNIN} className={BUTTON_CN}>
              로그인
            </Link>
            <Link href={PATH.SIGNUP} className={BUTTON_CN}>
              회원가입
            </Link>
          </div>
        </div>

        {/* 모임 관련 */}
        <div className="rounded-lg bg-gray-50">
          <h2 className="mb-3 text-lg font-semibold">모임</h2>
          <div className="space-y-2">
            <Link href={PATH.REGULAR} className={BUTTON_CN}>
              정기 모임 목록
            </Link>
            <Link href={PATH.QUICK} className={BUTTON_CN}>
              번개 모임 목록
            </Link>
            <Link href={PATH.REGULAR_DETAIL(1)} className={BUTTON_CN}>
              정기 모임 상세
            </Link>
            <Link href={PATH.QUICK_DETAIL(1)} className={BUTTON_CN}>
              번개 모임 상세
            </Link>
            <Link href={PATH.REGULAR_CREATE} className={BUTTON_CN}>
              정기 모임 생성
            </Link>
            <Link href={PATH.QUICK_CREATE} className={BUTTON_CN}>
              번개 모임 생성
            </Link>
            <Link href={PATH.FAVORITES} className={BUTTON_CN}>
              찜한 모임
            </Link>
          </div>
        </div>

        {/* 프로필 관련 */}
        <div className="rounded-lg bg-gray-50">
          <h2 className="mb-3 text-lg font-semibold">프로필</h2>
          <div className="space-y-2">
            <Link href={PATH.MY_PROFILE} className={BUTTON_CN}>
              내 프로필
            </Link>
            <Link href={PATH.PROFILE(1)} className={BUTTON_CN}>
              사용자 프로필
            </Link>
          </div>
        </div>

        {/* 기타 */}
        <div className="rounded-lg bg-gray-50">
          <h2 className="mb-3 text-lg font-semibold">기타</h2>
          <div className="space-y-2">
            <Link href={PATH.REVIEWS} className={BUTTON_CN}>
              모든 리뷰
            </Link>
            <button onClick={() => openModal("add-pet")} className={BUTTON_CN}>
              반려견 정보 등록 모달
            </button>
          </div>
        </div>
      </div>

      {isOpen && <PetInfoModal type="add-pet" onClose={closeModal} />}
    </div>
  );
}
