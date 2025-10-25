import { useAuth } from "@/hooks/auth";

import { CreatedAt } from "./Review/CreatedAt";
import { Rating } from "./Review/Rating";
import { UserAvatar } from "./User/UserAvatar";
import { UserName } from "./User/UserName";
import { ReviewCardEditButton } from "./ReviewCardEditButton";
import { ReviewCardHeaderProps } from "./types";

export function Header({
  profileImage,
  nickName,
  score,
  createdAt,
  reviewId,
  reviewAuthorId,
}: ReviewCardHeaderProps) {
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center gap-3 sm:mb-3">
        <UserAvatar image={profileImage} />

        <div className="flex-1 flex-col items-center gap-2 overflow-hidden">
          <UserName nickName={nickName} />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <Rating score={score} />
            <CreatedAt date={createdAt} />
          </div>
        </div>
      </div>
      {user?.id === reviewAuthorId && (
        <ReviewCardEditButton reviewId={reviewId} />
      )}
    </>
  );
}
