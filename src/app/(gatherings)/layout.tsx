import { ReactNode } from "react";

import Header from "@/components/Header";

export default function GatheringsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mt-26">{children}</div>
    </>
  );
}
