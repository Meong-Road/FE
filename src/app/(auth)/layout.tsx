import React from "react";
import Image from "next/image";

import walkImage from "@/assets/images/image.png";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-12">
      <Image src={walkImage} alt="image" width={450} height={450} />
      {children}
    </div>
  );
};

export default layout;
