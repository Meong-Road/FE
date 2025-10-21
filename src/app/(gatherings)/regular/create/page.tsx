import { Form } from "@/components/Form";
import {
  RegularGatheringFormSchema,
  useRegularGatheringForm,
} from "@/hooks/gathering/useRegularGatheringForm";

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
      <Form form={form} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-11">
          <section className="flex gap-6">
            {/* 이미지 */}
            <Form.Field
              name="photo"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>모임의 대표사진을 등록해주세요</Form.Label>
                  <Form.Control>
                    {/* TODO: 모임 생성 이미지 업로드 컴포넌트 추가 */}
                  </Form.Control>
                </Form.Item>
              )}
            />
            <div className="bg-card h-[357px] w-[456px] rounded-xl border-1 border-[#bbb]"></div>
            {/* 모임 이름, 모임 설명 */}
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <label htmlFor="">모임 이름</label>
                  <span>0/30 *</span>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="모임 이름을 작성해주세요"
                  className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex gap-2">
                  <label htmlFor="">모임 설명</label>
                  <span>0/1000</span>
                </div>
                <textarea
                  name=""
                  id=""
                  placeholder="모임 설명을 간단하게 작성해주세요"
                  className="w-full flex-1 resize-none rounded-xl bg-[#edf4fb] px-4 py-2.5"
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
              <div className="flex flex-1 flex-col bg-red-50">
                <label htmlFor="">모임 날짜 *</label>
                <div>월화수목금토일</div>
              </div>
              {/* 마감 날짜 */}
              <div className="flex flex-1 flex-col bg-blue-50">
                <label htmlFor="">마감 날짜</label>
                <input
                  type="date"
                  name=""
                  id=""
                  placeholder="마감 날짜를 선택해주세요"
                />
              </div>
            </div>
            <div className="flex justify-between gap-29">
              {/* 반려견 동반 여부 */}
              <div className="flex flex-1 flex-col bg-red-50">
                <label htmlFor="">반려견 동반 여부 *</label>
                <div>반려견 없이도 참여 가능해요</div>
                <div>반려견이 함께 해야 해요</div>
              </div>
              {/* 모집 인원 */}
              <div className="flex flex-1 flex-col bg-blue-50">
                <label htmlFor="">모집 인원 *</label>
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="최소 5인 이상 입력해주세요"
                />
              </div>
            </div>
          </section>
          <section className="flex justify-center gap-6">
            <button>나가기</button>
            <button>정기 모임 만들기</button>
          </section>
        </div>
      </Form>
    </div>
  );
}
