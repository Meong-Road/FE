"use client";
import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import {
  RegularGatheringFormSchema,
  useRegularGatheringForm,
} from "@/hooks/gathering/useRegularGatheringForm";
import { DAY_MAP_KR, DAY_OF_WEEK } from "@/lib/constants/date";
import { PET_REQUIRED_OPTIONS } from "@/lib/constants/petRequired";
import { cn } from "@/lib/utils";

import Dog from "../../../../assets/images/dog.svg";

export default function RegularCreatePage() {
  const form = useRegularGatheringForm();
  const handleCancle = () => {
    // TODO : 취소 로직 추가
  };
  const handleSubmit = (data: RegularGatheringFormSchema) => {
    // TODO: 생성 API 추가
    console.log("폼 제출하기 : ", data);
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        정기 모임 만들기
      </h1>
      {/* 이미지, 모임 이름, 모임 설명 section */}
      <Form form={form} onSubmit={handleSubmit} className="bg-transparent !p-0">
        <div className="flex flex-col gap-11">
          <section className="flex gap-6">
            {/* 이미지 */}
            <Form.Field
              name="photo"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item className="bg-card flex h-[357px] w-[456px] flex-col justify-center rounded-xl border-1 border-[#bbb]">
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
                name="days"
                render={({ field }) => (
                  <Form.Item className="flex-1">
                    <Form.Label required className="text-lg font-semibold">
                      모임 날짜
                    </Form.Label>
                    <Form.Control>
                      <Form.Checkbox
                        name="days"
                        options={DAY_OF_WEEK.map((day) => ({
                          id: day,
                          label: DAY_MAP_KR[day],
                          value: day,
                        }))}
                        value={field.value || []}
                        onChange={field.onChange}
                        className="flex gap-1"
                      />
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
                      <Form.Radio options={PET_REQUIRED_OPTIONS} {...field} />
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
