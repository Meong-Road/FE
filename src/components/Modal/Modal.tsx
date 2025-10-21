import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  useEffect(() => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;

    // body에 스크롤 방지 스타일 적용 (스크롤바는 유지)
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // 컴포넌트 언마운트 시 스타일 복원
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (typeof window === "undefined") return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]">
      <div className="bg-card animate-scaleIn relative flex h-[85vh] w-full max-w-screen-sm flex-col gap-2 rounded-3xl py-8 select-none sm:rounded-4xl sm:py-12">
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
