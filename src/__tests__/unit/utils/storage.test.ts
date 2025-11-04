import { storageUtils } from "@/lib/utils/storage";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    setItem: (key: string, value: string) => (store[key] = value),
    getItem: (key: string) => store[key] || null,
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

const sessionStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    setItem: (key: string, value: string) => (store[key] = value),
    getItem: (key: string) => store[key] || null,
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
  writable: true,
});

describe("storageUtils", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe("setItem", () => {
    test("localStorage에 값을 저장해야 한다", () => {
      storageUtils.setItem("testKey", { name: "test" });
      const result = localStorage.getItem("testKey");
      expect(result).toBe('{"name":"test"}');
    });

    test("sessionStorage 값을 저장해야 한다", () => {
      storageUtils.setItem("testKey", { name: "test" }, "sessionStorage");
      const result = sessionStorage.getItem("testKey");
      expect(result).toBe('{"name":"test"}');
    });

    test("다양한 타입의 값을 저장할 수 있어야 한다", () => {
      storageUtils.setItem("string", "test");
      storageUtils.setItem("number", 123);
      storageUtils.setItem("boolean", true);
      storageUtils.setItem("array", [1, 2, 3]);
      storageUtils.setItem("object", { key: "value" });

      expect(localStorage.getItem("string")).toBe('"test"');
      expect(localStorage.getItem("number")).toBe("123");
      expect(localStorage.getItem("boolean")).toBe("true");
      expect(localStorage.getItem("array")).toBe("[1,2,3]");
      expect(localStorage.getItem("object")).toBe('{"key":"value"}');
    });

    test("기본값으로 localStorage에 저장해야 한다", () => {
      storageUtils.setItem("default", "value");
      const result = localStorage.getItem("default");
      expect(result).toBe('"value"');
      expect(sessionStorage.getItem("default")).toBeNull();
    });

    describe("getItem", () => {
      test("localStorage에서 값을 조회해야 한다", () => {
        localStorage.setItem("testKey", '{"name":"test"}');
        const result = storageUtils.getItem("testKey");
        expect(result).toEqual({ name: "test" });
      });

      test("sessionStorage에서 값을 조회해야 한다", () => {
        sessionStorage.setItem("testKey", '{"name":"test"}');
        const result = storageUtils.getItem("testKey", "sessionStorage");
        expect(result).toEqual({ name: "test" });
      });

      test("존재하지 않는 키는 null을 반환해야 한다", () => {
        const result = storageUtils.getItem("notExist");
        expect(result).toBeNull();
      });

      test("잘못된 JSON은 null을 반환해야 한다", () => {
        localStorage.setItem("invalidJSON", "{invalid json}");
        const result = storageUtils.getItem("invalidJSON");
        expect(result).toBeNull();
      });

      test("다양한 타입의 값을 올바르게 파싱해야 한다", () => {
        localStorage.setItem("string", '"test"');
        localStorage.setItem("number", "123");
        localStorage.setItem("boolean", "true");
        localStorage.setItem("array", "[1,2,3]");
        localStorage.setItem("object", '{"key":"value"}');

        expect(storageUtils.getItem<string>("string")).toBe("test");
        expect(storageUtils.getItem<number>("number")).toBe(123);
        expect(storageUtils.getItem<boolean>("boolean")).toBe(true);
        expect(storageUtils.getItem<number[]>("array")).toEqual([1, 2, 3]);
        expect(storageUtils.getItem<{ key: string }>("object")).toEqual({
          key: "value",
        });
      });

      test("기본값으로 localStorage를 사용해야 한다", () => {
        localStorage.setItem("localKey", '"local"');
        sessionStorage.setItem("sessionKey", '"session"');

        expect(storageUtils.getItem("localKey")).toBe("local");
        expect(storageUtils.getItem("sessionKey")).toBeNull();
      });
    });

    describe("removeItem", () => {
      test("localStorage에서 항목을 제거해야 한다", () => {
        localStorage.setItem("testKey", '"value"');
        storageUtils.removeItem('"testKey"');
        const result = localStorage.getItem('"testKey"');
        expect(result).toBeNull();
      });

      test("sessionStorage에서 항목을 제거해야 한다", () => {
        sessionStorage.setItem("testKey", '"value"');
        storageUtils.removeItem("testKey", "sessionStorage");
        const result = sessionStorage.getItem("testKey");
        expect(result).toBeNull();
      });

      test("기본값으로 localStorage를 사용해야 한다", () => {
        localStorage.setItem("localKey", '"localValue"');
        sessionStorage.setItem("sessionKey", '"sessionValue"');

        storageUtils.removeItem("localKey");
        expect(localStorage.getItem("localKey")).toBeNull();
        expect(sessionStorage.getItem("sessionKey")).toBe('"sessionValue"');
      });

      test("존재하지 않는 키를 제거해도 에러가 발생하지 않아야 한다", () => {
        expect(() => storageUtils.removeItem("notExist")).not.toThrow();
      });
    });

    describe("clear", () => {
      test("localStorage를 비워야 한다", () => {
        localStorage.setItem("key1", '"value1"');
        localStorage.setItem("key2", '"value2"');
        storageUtils.clear();
        expect(localStorage.getItem("key1")).toBeNull();
        expect(localStorage.getItem("key2")).toBeNull();
      });

      test("sessionStorage를 비워야 한다", () => {
        sessionStorage.setItem("key1", '"value1"');
        sessionStorage.setItem("key2", '"value2"');
        storageUtils.clear("sessionStorage");
        expect(sessionStorage.getItem("key1")).toBeNull();
        expect(sessionStorage.getItem("key2")).toBeNull();
      });

      test("기본값으로 localStorage를 사용해야 한다", () => {
        localStorage.setItem("localKey", '"localValue"');
        sessionStorage.setItem("sessionKey", '"sessionValue"');
        storageUtils.clear();
        expect(sessionStorage.getItem("localKey")).toBeNull();
        expect(sessionStorage.getItem("sessionKey")).toBe('"sessionValue"');
      });
    });
  });
});
