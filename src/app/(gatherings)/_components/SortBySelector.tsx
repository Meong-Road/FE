import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortBySelector() {
  return (
    <Select>
      <SelectTrigger className="cursor-pointer">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="close">마감 임박</SelectItem>
      </SelectContent>
    </Select>
  );
}
