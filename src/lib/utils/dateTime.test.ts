import {
  formatDate,
  getRegistrationDeadlineInfo,
  getTimeAgo,
} from "./dateTime";

describe("dateTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // 기준 시간을 2025-10-01 10:00:00으로 설정
    jest.setSystemTime(new Date("2025-10-01T10:00:00"));
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
    it("이미 마감된 경우 '모집 마감'와 'secondary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-01T09:00:00"; // 1시간 전
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "모집 마감",
        variant: "secondary",
      });
    });

    it("마감까지 남은 시간이 1시간 이내인 경우, 'n분 후 마감'과 'primary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-01T10:30:00"; // 30분 뒤
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "30분 후 마감",
        variant: "primary",
      });
    });

    it("마감까지 남은 시간이 24시간 이내인 경우, 'n시간 후 마감'과 'primary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-02T09:00:00"; // 23시간 뒤
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "23시간 후 마감",
        variant: "primary",
      });
    });

    it("마감까지 남은 시간이 24시간 이상인 경우, 'n일 후 마감'과 'secondary'를 반환해야 한다", () => {
      const registrationEnd = "2025-10-04T10:00:00"; // 3일 뒤
      const result = getRegistrationDeadlineInfo(registrationEnd);

      expect(result).toEqual({
        text: "3일 후 마감",
        variant: "secondary",
      });
    });
  });

  describe("getTimeAgo", () => {
    it("방금 전을 반환해야 한다", () => {
      const createdAt = "2025-10-01T09:59:50"; // 10초 전
      const result = getTimeAgo(createdAt);
      expect(result).toBe("방금 전");
    });

    it("10분 전을 반환해야 한다", () => {
      const createdAt = "2025-10-01T09:50:00"; // 정확히 10분 전
      const result = getTimeAgo(createdAt);
      expect(result).toBe("10분 전");
    });

    it("1시간 전을 반환해야 한다", () => {
      const createdAt = "2025-10-01T09:00:00"; // 정확히 1시간 전
      const result = getTimeAgo(createdAt);
      expect(result).toBe("1시간 전");
    });

    it("1일 전을 반환해야 한다", () => {
      const createdAt = "2025-09-30T10:00:00"; // 하루 전
      const result = getTimeAgo(createdAt);
      expect(result).toBe("1일 전");
    });

    it("2일 전을 반환해야 한다", () => {
      const createdAt = "2025-09-29T10:00:00"; // 이틀 전
      const result = getTimeAgo(createdAt);
      expect(result).toBe("2일 전");
    });

    it("7일 전부터는 날짜를 반환해야 한다", () => {
      const createdAt = "2025-09-24T10:00:00"; // 7일 전
      const result = getTimeAgo(createdAt);
      expect(result).toBe("2025.09.24");
    });
  });
});
