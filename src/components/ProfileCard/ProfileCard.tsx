import { Card, CardContent } from "@/components/ui/card";

import { ProfileCardContent } from "./ProfileCardContent";
import { ProfileCardEditBtn } from "./ProfileCardEditBtn";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { ProfileCardImage } from "./ProfileCardImage";
import { ProfileCardInfo } from "./ProfileCardInfo";
import { ProfileCardNickName } from "./ProfileCardNickName";
import { ProfileCardProps } from "./types";

export function ProfileCard({ children, className }: ProfileCardProps) {
  return (
    <Card
      className={`group bg-card border-border relative overflow-hidden rounded-3xl transition-all ${className || ""}`}
    >
      <CardContent className="p-2 sm:p-4">{children}</CardContent>
    </Card>
  );
}

ProfileCard.Header = ProfileCardHeader;
ProfileCard.Content = ProfileCardContent;
ProfileCard.Image = ProfileCardImage;
ProfileCard.Info = ProfileCardInfo;
ProfileCard.EditBtn = ProfileCardEditBtn;
ProfileCard.NickName = ProfileCardNickName;
