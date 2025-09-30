import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";

import Header from "../Header";

// Next.js navigation 모킹
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Logo 컴포넌트 모킹
jest.mock("../Logo", () => {
  return function Logo({ width }: { width: number }) {
    return <div data-testid="logo" style={{ width }} />;
  };
});

// ProfileSvg 컴포넌트 모킹
jest.mock("@/assets/images/profile.svg", () => {
  return function ProfileSvg({
    width,
    className,
  }: {
    width: number;
    className?: string;
  }) {
    return (
      <div data-testid="profile-svg" style={{ width }} className={className} />
    );
  };
});

const mockUsePathname = jest.mocked(usePathname);

const renderHeader = (pathname = "/") => {
  mockUsePathname.mockReturnValue(pathname);
  return render(<Header />);
};

describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("로고와 네비게이션 메뉴가 렌더링되어야 한다", () => {
    renderHeader();

    expect(screen.getByTestId("logo")).toBeInTheDocument();

    expect(screen.getByText("정기 모임")).toBeInTheDocument();
    expect(screen.getByText("번개 모임")).toBeInTheDocument();
    expect(screen.getByText("찜한 모임")).toBeInTheDocument();
    expect(screen.getByText("모든 리뷰")).toBeInTheDocument();

    expect(screen.getByTestId("profile-svg")).toBeInTheDocument();
  });

  it("로고 링크가 홈페이지로 연결되어야 한다", () => {
    renderHeader();

    const logoLink = screen.getByTestId("logo").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("각 네비게이션 메뉴가 올바른 링크를 가져야 한다", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "정기 모임" })).toHaveAttribute(
      "href",
      "/regular",
    );
    expect(screen.getByRole("link", { name: "번개 모임" })).toHaveAttribute(
      "href",
      "/quick",
    );
    expect(screen.getByRole("link", { name: "찜한 모임" })).toHaveAttribute(
      "href",
      "/favorites",
    );
    expect(screen.getByRole("link", { name: "모든 리뷰" })).toHaveAttribute(
      "href",
      "/review",
    );
  });

  it("프로필 링크가 올바른 경로를 가져야 한다", () => {
    renderHeader();

    const profileLink = screen.getByTestId("profile-svg").closest("a");
    expect(profileLink).toHaveAttribute("href", "/profile/userId");
  });

  it("현재 경로에 해당하는 메뉴가 활성화되어야 한다", () => {
    renderHeader("/regular/some-path");

    const regularMenuItem = screen.getByText("정기 모임");
    expect(regularMenuItem).toHaveClass("text-primary", "font-bold");

    const quickMenuItem = screen.getByText("번개 모임");
    expect(quickMenuItem).toHaveClass("text-[#8B8B8B]");
    expect(quickMenuItem).not.toHaveClass("text-primary", "font-bold");
  });

  it("활성화되지 않은 메뉴들은 기본 스타일을 가져야 한다", () => {
    renderHeader("/some-other-path");

    const menuItems = [
      screen.getByText("정기 모임"),
      screen.getByText("번개 모임"),
      screen.getByText("찜한 모임"),
      screen.getByText("모든 리뷰"),
    ];

    menuItems.forEach((item) => {
      expect(item).toHaveClass("text-[#8B8B8B]");
      expect(item).not.toHaveClass("text-primary", "font-bold");
    });
  });
});
