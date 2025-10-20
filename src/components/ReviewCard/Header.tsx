import { CreatedAt } from "./Review/CreatedAt";
import { Rating } from "./Review/Rating";
import { UserAvatar } from "./User/UserAvatar";
import { UserName } from "./User/UserName";
import { EditBtn } from "./Legacy";
import { ReviewCardHeaderProps } from "./types";

export function Header({
  profileImage,
  nickName,
  score,
  createdAt,
  reviewId,
}: ReviewCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar image={profileImage} />

        <div className="flex-1 flex-col items-center gap-2 overflow-hidden">
          <UserName nickName={nickName} />
          <div className="flex items-center gap-2">
            <Rating score={score} />
            <CreatedAt date={createdAt} />
          </div>
        </div>
      </div>
      <EditBtn reviewId={reviewId} />
    </div>
  );
}
