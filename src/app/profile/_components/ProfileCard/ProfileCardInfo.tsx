import { ProfileCardInfoProps } from "./types";

export function ProfileCardInfo({ label, value }: ProfileCardInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-gray-900">{value}</dd>
    </div>
  );
}
