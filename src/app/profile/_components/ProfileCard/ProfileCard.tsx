import { Card, CardContent } from "@/components/ui/card";

import { ProfileCardContent } from "./ProfileCardContent";
import { ProfileCardEditBtn } from "./ProfileCardEditBtn";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { ProfileCardImage } from "./ProfileCardImage";
import { ProfileCardInfo } from "./ProfileCardInfo";
import { ProfileCardName } from "./ProfileCardName";
import { type ProfileCardProps } from "./types";

export function ProfileCard({ children, className }: ProfileCardProps) {
  return (
    <Card
      className={`group bg-card border-border relative overflow-hidden transition-all select-none ${className || ""}`}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}

ProfileCard.Header = ProfileCardHeader;
ProfileCard.Content = ProfileCardContent;
ProfileCard.Image = ProfileCardImage;
ProfileCard.Name = ProfileCardName;
ProfileCard.Info = ProfileCardInfo;
ProfileCard.EditBtn = ProfileCardEditBtn;
