import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SEOUL_DISTRICTS = [
  {
    key: "seoul",
    name: "서울 전체",
  },
  {
    key: "gangnam",
    name: "강남구",
  },
  {
    key: "gangdong",
    name: "강동구",
  },
  {
    key: "gangbuk",
    name: "강북구",
  },
  {
    key: "gangseo",
    name: "강서구",
  },
  {
    key: "gwangjin",
    name: "광진구",
  },
  {
    key: "guro",
    name: "구로구",
  },
  {
    key: "geumcheon",
    name: "금천구",
  },
  {
    key: "nowon",
    name: "노원구",
  },
  {
    key: "dobong",
    name: "도봉구",
  },
  {
    key: "dongdaemun",
    name: "동대문구",
  },
  {
    key: "dongjak",
    name: "동작구",
  },
  {
    key: "mapo",
    name: "마포구",
  },
  {
    key: "seodae",
    name: "서대문구",
  },
  {
    key: "seocho",
    name: "서초구",
  },
  {
    key: "seongdong",
    name: "성동구",
  },
  {
    key: "sungbuk",
    name: "성북구",
  },
  {
    key: "songpa",
    name: "송파구",
  },
  {
    key: "yangcheon",
    name: "양천구",
  },
  {
    key: "yeongdeungpo",
    name: "영등포구",
  },
  {
    key: "yongsan",
    name: "용산구",
  },
  {
    key: "eunpyeong",
    name: "은평구",
  },
  {
    key: "jongno",
    name: "종로구",
  },
  {
    key: "jung",
    name: "중구",
  },
  {
    key: "jungnang",
    name: "중랑구",
  },
];

export default function LocationSelect() {
  return (
    <Select>
      <SelectTrigger className="cursor-pointer">
        <SelectValue placeholder="서울 전체" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {SEOUL_DISTRICTS.map((district) => (
          <SelectItem key={district.key} value={district.key}>
            {district.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
