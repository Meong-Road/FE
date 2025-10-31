import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format, isValid, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { PET_REQUIRED_OPTIONS } from "@/lib/constants/petRequired";
import { EGatheringType } from "@/lib/types/gatherings";
import { formatDateToISOString } from "@/lib/utils/dateTime";

import { Form } from "../Form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

import GatheringDateTimeField from "./GatheringDateTimeField";

interface GatheringDetailsProps {
  type: EGatheringType;
}

export default function GatheringDetails({ type }: GatheringDetailsProps) {
  return (
    <section className="flex flex-col gap-13">
      <div className="flex flex-col gap-13 md:gap-20 lg:flex-row">
        {/* 모임 날짜 */}
        <GatheringDateTimeField type={type} />

        {/* 마감 날짜 */}
        <Form.Field
          name="registrationEnd"
          render={({ field }) => (
            <Form.Item className="flex-1">
              {type === EGatheringType.REGULAR ? (
                <Form.Label required className="text-lg font-semibold">
                  마감 날짜
                </Form.Label>
              ) : (
                <Form.Label>
                  마감 날짜
                  <span className="text-accent-foreground text-sm">
                    모임 일시를 정하면 마감 시간이 자동으로 정해져요
                  </span>
                </Form.Label>
              )}

              <Form.Control>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="gray"
                      className="active:border-primary w-full rounded-xl bg-[#edf4fb] px-4 py-2.5 hover:bg-[#e6f0f8]"
                      disabled={type === EGatheringType.QUICK}
                    >
                      {field.value ? (
                        (() => {
                          if (type === EGatheringType.QUICK) {
                            // 번개 모임: 3시간 전 시간 표시
                            const date =
                              typeof field.value === "string"
                                ? parseISO(field.value)
                                : field.value;
                            return isValid(date)
                              ? format(date, "PPP p", { locale: ko }) // 날짜 + 시간 표시
                              : "마감 날짜를 선택해주세요";
                          } else {
                            // 정기 모임: 날짜만 표시
                            const date =
                              typeof field.value === "string"
                                ? parseISO(field.value)
                                : field.value;
                            return isValid(date)
                              ? format(date, "PPP", { locale: ko })
                              : "마감 날짜를 선택해주세요";
                          }
                        })()
                      ) : (
                        <span className="text-muted-foreground">
                          마감 날짜를 선택해주세요
                        </span>
                      )}
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="z-[999] w-auto bg-white p-0"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date ? formatDateToISOString(date) : "");
                      }}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>

      <div className="flex flex-col gap-13 md:gap-20 lg:flex-row">
        {/* 반려견 동반 여부 */}
        <Form.Field
          name="isPetRequired"
          render={({ field }) => (
            <Form.Item className="flex-1">
              <Form.Label required className="text-lg font-semibold">
                반려견 동반 여부
              </Form.Label>
              <Form.Control>
                <Form.Radio
                  className="max-h-10 text-sm md:text-base"
                  options={PET_REQUIRED_OPTIONS}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 모집 인원 */}
        <Form.Field
          name="capacity"
          render={({ field }) => (
            <Form.Item className="flex-1">
              <Form.Label required className="text-lg font-semibold">
                모집 인원
              </Form.Label>
              <Form.Control>
                <Form.Input
                  type="number"
                  className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </section>
  );
}
