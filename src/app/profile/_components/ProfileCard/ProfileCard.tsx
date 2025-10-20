import { ProfileCardContent } from "./ProfileCardContent";
import { ProfileCardEditBtn } from "./ProfileCardEditBtn";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { ProfileCardImage } from "./ProfileCardImage";
import { ProfileCardInfo } from "./ProfileCardInfo";
import { ProfileCardName } from "./ProfileCardName";
import { type ProfileCardProps } from "./types";

export function ProfileCard({ children }: ProfileCardProps) {
  return (
    <section className="rounded-3xl border-2 border-gray-200 bg-white px-6 py-4">
      {children}
    </section>
  );
}

ProfileCard.Header = ProfileCardHeader;
ProfileCard.Content = ProfileCardContent;
ProfileCard.Image = ProfileCardImage;
ProfileCard.Name = ProfileCardName;
ProfileCard.Info = ProfileCardInfo;
ProfileCard.EditBtn = ProfileCardEditBtn;
