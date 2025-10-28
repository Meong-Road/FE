"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = Omit<React.ComponentProps<typeof BaseInput>, "type"> & {
  type: "text" | "email" | "password" | "date" | "number" | "datetime-local";
};

function ShowPasswordButton({
  isShowPassword,
  onClick,
}: {
  isShowPassword: boolean;
  onClick: () => void;
}) {
  return (
    <>
      {isShowPassword ? (
        <EyeIcon
          onClick={onClick}
          className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
        />
      ) : (
        <EyeOffIcon
          onClick={onClick}
          className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
        />
      )}
    </>
  );
}

export function Input({ className, type, onChange, ...props }: Props) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <BaseInput
        className={cn(type === "password" && "pr-10", className)}
        {...props}
        type={type !== "password" ? type : isShowPassword ? "text" : "password"}
        onInput={onChange}
      />
      {type === "password" && (
        <ShowPasswordButton
          isShowPassword={isShowPassword}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      )}
    </div>
  );
}
