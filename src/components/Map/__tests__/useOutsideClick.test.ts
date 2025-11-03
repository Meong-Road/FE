import { fireEvent, renderHook } from "@testing-library/react";

import { useOutsideClick } from "../_hooks/useOutsideClick";

let container: HTMLDivElement;
let button: HTMLButtonElement;
let mockCallback: jest.Mock;
let ref: React.RefObject<HTMLDivElement>;

beforeEach(() => {
  container = document.createElement("div");
  button = document.createElement("button");
  container.appendChild(button);
  document.body.appendChild(container);

  mockCallback = jest.fn();
  ref = { current: container };
});

afterEach(() => {
  document.body.innerHTML = "";
  jest.clearAllMocks();
});

describe("useOutsideClick 훅 테스트", () => {
  test("요소 내부 클릭 시 onOutsideClick 콜백이 호출되지 않아야 한다", () => {
    renderHook(() => useOutsideClick(ref, mockCallback));

    fireEvent.mouseDown(button);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  test("요소 외부 클릭 시 onOutsideClick 콜백이 호출되어야 한다", () => {
    renderHook(() => useOutsideClick(ref, mockCallback));
    const outside = document.createElement("div");
    document.body.appendChild(outside);

    fireEvent.mouseDown(outside);

    expect(mockCallback).toHaveBeenCalled();
  });
});
