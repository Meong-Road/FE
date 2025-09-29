import { ProfileCardContent } from "./ProfileCardContent";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { ProfileCardImage } from "./ProfileCardImage";
import { ProfileCardInfo } from "./ProfileCardInfo";
import { ProfileCardName } from "./ProfileCardName";
import { type ProfileCardProps } from "./types";

export function ProfileCard({ children }: ProfileCardProps) {
  return <section>{children}</section>;
}

ProfileCard.Header = ProfileCardHeader;
ProfileCard.Content = ProfileCardContent;
ProfileCard.Image = ProfileCardImage;
ProfileCard.Name = ProfileCardName;
ProfileCard.Info = ProfileCardInfo;
