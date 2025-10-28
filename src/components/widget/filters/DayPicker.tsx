import { DAY_MAP_KR, DAY_OF_WEEK } from "@/lib/constants/date";
import { cn } from "@/lib/utils";

interface DayPickerProps {
  value: string[];
  onChange: (value: string[]) => void;
}

function DayPicker({ value, onChange }: DayPickerProps) {
  const isSelectedDay = (day: string) => value.includes(day);

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {DAY_OF_WEEK.map((day) => (
        <div key={day} className="flex items-center justify-center">
          <input
            type="checkbox"
            id={day}
            className="hidden"
            checked={isSelectedDay(day)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, day]);
              } else {
                onChange(value.filter((v) => v !== day));
              }
            }}
          />
          <label
            htmlFor={day}
            className={cn(
              "flex w-full cursor-pointer items-center justify-center rounded-lg p-2 text-sm",

              isSelectedDay(day)
                ? "bg-primary font-medium text-white"
                : "bg-[#EEEEEE]",
            )}
          >
            {DAY_MAP_KR[day]}
          </label>
        </div>
      ))}
    </div>
  );
}

export default DayPicker;
