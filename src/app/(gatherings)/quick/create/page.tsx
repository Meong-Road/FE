"use client";

import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import {
  QuickGatheringFormSchema,
  useQuickGatheringForm,
} from "@/hooks/gathering/useQuickGatheringForm";
import { cn } from "@/lib/utils";

import Dog from "../../../../assets/images/dog.svg";

interface RadioOptionType {
  id: string;
  label: string;
  value: string;
  color: string;
}

const PET_REQUIRED_OPTIONS: RadioOptionType[] = [
  {
    id: "optional",
    label: "반려견 없이도 참여 가능해요",
    value: "false",
    color: "#edf4fb",
  },
  {
    id: "required",
    label: "반려견이 함께 해야 해요",
    value: "true",
    color: "#edf4fb",
  },
];

export default function QuickCreatePage() {
  const form = useQuickGatheringForm();
  const handleCancle = () => {
    // TODO : 취소 로직 추가
  };
  const handleSubmit = (data: QuickGatheringFormSchema) => {
    // TODO: 생성 API 추가
    console.log("폼 제출하기 : ", data);
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        번개 모임 만들기
      </h1>
      {/* 이미지, 모임 이름, 모임 설명 section */}
      <Form form={form} onSubmit={handleSubmit} className="bg-transparent !p-0">
        <div className="flex flex-col gap-11">
          <section className="flex gap-6">
            {/* 이미지 */}
            <Form.Field
              name="photo"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item className="bg-card h-[357px] w-[456px] rounded-xl border-1 border-[#bbb]">
                  <Form.Control>
                    <Form.ImageUpload
                      onChange={onChange}
                      value={value}
                      {...field}
                    >
                      <Dog className="w-20" />
                    </Form.ImageUpload>
                  </Form.Control>
                  <Form.Label className="flex justify-center">
                    모임의 대표사진을 등록해주세요
                  </Form.Label>
                </Form.Item>
              )}
            />

            {/* 모임 이름, 모임 설명 */}
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Form.Field
                  name="name"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label required className="text-lg font-semibold">
                        모임 이름
                        <span>
                          0/<span className="text-primary">30</span>
                        </span>
                      </Form.Label>
                      <Form.Control>
                        <Form.Input
                          type="text"
                          placeholder="모임 이름을 작성해주세요"
                          className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                          {...field}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <Form.Field
                  name="description"
                  render={({ field }) => (
                    <Form.Item className="flex flex-1 flex-col">
                      <Form.Label className="text-lg font-semibold">
                        모임 설명
                        <span>
                          0/<span className="text-primary">1000</span>
                        </span>
                      </Form.Label>
                      <Form.Control>
                        <Form.Textarea
                          placeholder="모임 설명을 간단하게 작성해주세요"
                          className="w-full flex-1 rounded-xl bg-[#edf4fb] px-4 py-2.5"
                          {...field}
                        />
                      </Form.Control>
                    </Form.Item>
                  )}
                />
              </div>
            </div>
          </section>

          {/* 모임 위치 section */}
          <section></section>

          {/* 모임 디테일 section*/}
          <section className="flex flex-col gap-13">
            <div className="flex justify-between gap-29">
              {/* 모임 날짜 */}
              <Form.Field
                name="dateTime"
                render={({ field: { value, onChange } }) => (
                  <Form.Item className="flex-1">
                    <Form.Label required className="text-lg font-semibold">
                      모임 시간
                    </Form.Label>
                    <Form.Control>
                      <div className="flex gap-4">
                        <Form.Select
                          name="hour"
                          value={value.hour ?? ""}
                          placeholder="시"
                          options={Array.from({ length: 24 }, (_, i) => i + 1)}
                          onChange={(e) => {
                            const hour =
                              e.target.value === ""
                                ? undefined
                                : parseInt(e.target.value, 10);
                            onChange({ ...value, hour });
                          }}
                          className="flex-1 rounded-xl bg-[#edf4fb] px-4 py-2.5"
                        />
                        <Form.Select
                          name="minute"
                          value={value.minute ?? ""}
                          placeholder="분"
                          options={Array.from({ length: 60 }, (_, i) => i + 1)}
                          onChange={(e) => {
                            const minute =
                              e.target.value === ""
                                ? undefined
                                : parseInt(e.target.value, 10);
                            onChange({ ...value, minute });
                          }}
                          className="flex-1 rounded-xl bg-[#edf4fb] px-4 py-2.5"
                        />
                      </div>
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              {/* 마감 날짜 */}
              <Form.Field
                name="registrationEnd"
                render={({ field }) => (
                  <Form.Item className="flex-1">
                    <Form.Label required className="text-lg font-semibold">
                      마감 날짜
                    </Form.Label>
                    <Form.Control>
                      <Form.Input
                        type="date"
                        placeholder="마감 날짜를 선택해주세요"
                        className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                        {...field}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </div>

            <div className="flex justify-between gap-29">
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
                        options={PET_REQUIRED_OPTIONS}
                        {...field}
                        defaultChecked="true"
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

          {/* 버튼 section */}
          <section className="mx-auto mt-27 flex w-1/2 items-center justify-center gap-6">
            <Button
              type="button"
              onClick={handleCancle}
              className={cn(
                "h-12 flex-1",
                "border-primary border bg-white",
                "rounded-2xl",
                "text-primary text-base font-semibold md:text-lg",
                "select-none",
                "hover:bg-primary/5",
              )}
            >
              나가기
            </Button>
            <Form.SubmitButton
              label="정기 모임 만들기"
              className="mt-0 flex-1"
              disabled={!form.formState.isValid}
            >
              정기 모임 만들기
            </Form.SubmitButton>
          </section>
        </div>
      </Form>
    </div>
  );
}
