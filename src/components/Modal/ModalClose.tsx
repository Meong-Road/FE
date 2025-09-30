import React from "react";

export function ModalClose({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>닫기</button>;
}
