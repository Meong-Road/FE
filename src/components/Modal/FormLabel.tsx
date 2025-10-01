import React from "react";

interface FormLabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
}

export function FormLabel({ label, required, htmlFor }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor}>
      {label}
      {required && <span className="text-primary">*</span>}
    </label>
  );
}
