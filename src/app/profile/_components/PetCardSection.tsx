import { PetAdd } from "./PetAdd";
import { PetCard } from "./PetCard";

export default function PetCardSection() {
  return (
    <ul className="flex flex-wrap gap-6">
      <PetCard>
        <PetCard.Image />
        <PetCard.Info name="멍멍이" age="나이" gender="성별" type="견종" />
      </PetCard>
      <PetAdd>
        <PetAdd.Image />
        <PetAdd.Btn />
      </PetAdd>
    </ul>
  );
}
