import { ProfileCardInfoProps } from "./types";

export function ProfileCardInfo({ label, value }: ProfileCardInfoProps) {
  return (
    <div className="mb-1 flex items-center gap-6">
      <dt className="w-11 shrink-0 text-sm font-semibold text-gray-800">
        {label}
      </dt>
      <dd className="text-sm text-gray-700">{value}</dd>
    </div>
  );
}
