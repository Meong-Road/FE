import { ProfileCardInfoProps } from "./types";

export function ProfileCardInfo({ name, email }: ProfileCardInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground line-clamp-1 text-sm font-light">
        E-mail.
      </span>
      <span className="line-clamp-1 text-sm font-light text-zinc-600">
        {email}
      </span>
    </div>
  );
}
