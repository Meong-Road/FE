import { ReviewScore } from "@/lib/types/reviews";

import { CreatedAt } from "../Review/CreatedAt";
import { Rating } from "../Review/Rating";
import { UserAvatar } from "../User/UserAvatar";
import { UserName } from "../User/UserName";

interface ProfileProps {
  user?: {
    image: string | null;
    nickName: string;
  };
  score: ReviewScore;
  date?: string;
}

export function Profile({ user, score, date }: ProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar image={user?.image || null} />

      <div className="flex-1 flex-col items-center gap-2 overflow-hidden">
        <UserName nickName={user?.nickName || "익명"} />
        <div className="flex items-center gap-2">
          <Rating score={score} />
          {date && <CreatedAt date={date} />}
        </div>
      </div>
    </div>
  );
}
