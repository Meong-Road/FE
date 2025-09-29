import { formatDate, getRegistrationDeadlineInfo } from "./dateTime";

describe("dateTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("formatDate", () => {
    it("문자열 날짜를 올바른 형식으로 포맷해야 한다", () => {
      const date = "2025-09-29T18:30:00";
      const result = formatDate(date);
      expect(result).toBe("25. 09. 29 (월) 18:30");
    });

    it("Date 객체를 올바른 형식으로 포맷해야 한다", () => {
      const date = new Date("2025-12-25T09:15:00");
      const result = formatDate(date);
      expect(result).toBe("25. 12. 25 (목) 09:15");
    });

    it("연도를 두 자리로 표시해야 한다", () => {
      const date = "2030-06-15T14:45:00";
      const result = formatDate(date);
      expect(result).toBe("30. 06. 15 (토) 14:45");
    });

    it("한국어 요일을 올바르게 표시해야 한다", () => {
      // 각 요일별 테스트
      const testCases = [
        { date: "2025-09-29T12:00:00", expected: "25. 09. 29 (월) 12:00" }, // 월요일
        { date: "2025-09-30T12:00:00", expected: "25. 09. 30 (화) 12:00" }, // 화요일
        { date: "2025-10-01T12:00:00", expected: "25. 10. 01 (수) 12:00" }, // 수요일
        { date: "2025-10-02T12:00:00", expected: "25. 10. 02 (목) 12:00" }, // 목요일
        { date: "2025-10-03T12:00:00", expected: "25. 10. 03 (금) 12:00" }, // 금요일
        { date: "2025-10-04T12:00:00", expected: "25. 10. 04 (토) 12:00" }, // 토요일
        { date: "2025-10-05T12:00:00", expected: "25. 10. 05 (일) 12:00" }, // 일요일
      ];

      testCases.forEach(({ date, expected }) => {
        expect(formatDate(date)).toBe(expected);
      });
    });
  });

  describe("getRegistrationDeadlineInfo", () => {
    beforeEach(() => {
      // 기준 시간을 2025-10-01 10:00:00으로 설정
      jest.setSystemTime(new Date("2025-10-01T10:00:00"));
    });

    it("이미 마감된 경우 '마감 완료'와 'secondary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-01T09:00:00"; // 1시간 전
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "마감 완료",
        variant: "secondary",
      });
    });

    it("마감까지 남은 시간이 1시간 이내인 경우, 'n분 뒤 마감'과 'primary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-01T10:30:00"; // 30분 뒤
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "30분 뒤 마감",
        variant: "primary",
      });
    });

    it("마감까지 남은 시간이 12시간 이내인 경우, 'n시간 뒤 마감'과 'primary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-01T21:00:00"; // 11시간 뒤
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "11시간 뒤 마감",
        variant: "primary",
      });
    });

    it("마감까지 남은 시간이 24시간 이상인 경우, '마감 n일 전'과 'secondary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-04T10:00:00"; // 3일 뒤
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "마감 3일 전",
        variant: "secondary",
      });
    });
  });
});
