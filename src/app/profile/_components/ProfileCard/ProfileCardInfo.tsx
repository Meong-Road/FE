import { ProfileCardInfoProps } from "./types";

export function ProfileCardInfo({ label, value }: ProfileCardInfoProps) {
  return (
    <div className="mb-2 flex items-center gap-4">
      <dt className="text-muted-foreground w-12 shrink-0 text-sm font-medium">
        {label}
      </dt>
      <dd className="text-foreground text-sm">{value}</dd>
    </div>
  );
}
