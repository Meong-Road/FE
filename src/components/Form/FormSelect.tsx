"use client";

import { ChevronDownIcon } from "lucide-react";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  id?: string;
  name: string;
  placeholder?: string;
  options: Option[];
  className?: string;
  value?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function Select({
  id,
  name,
  placeholder = "선택해주세요",
  options,
  className,
  value = "",
  disabled,
  onValueChange,
}: SelectProps) {
  // 빈 문자열이거나 undefined일 때는 undefined를 전달 (uncontrolled 모드로 동작)
  // 값이 있을 때만 controlled 모드로 동작
  // key를 value 기반으로 설정하여 form.reset() 시 리셋되도록 함
  // value가 변경되면 key도 변경되어 컴포넌트가 리마운트됨
  const normalizedValue = value && value.length > 0 ? value : undefined;
  const selectKey = `${name}-${value ?? "empty"}`;

  return (
    <ShadcnSelect
      key={selectKey}
      name={name}
      value={normalizedValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger id={id} className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
        <ChevronDownIcon className="text-muted-foreground size-4" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}
