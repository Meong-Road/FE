import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useAuthUser } from "@/hooks/auth/useAuthUser";
import { PATH } from "@/lib/constants/path";
import { UserType } from "@/lib/types/user";

import Header from "../components/Header";

// Next.js navigation 모킹
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    usePathname: jest.fn(() => "/"),
  };
});

// Logo 컴포넌트 모킹
jest.mock("../components/Logo", () => {
  return function Logo({ width }: { width: number }) {
    return <div data-testid="logo" style={{ width }} />;
  };
});

// ProfileSvg 컴포넌트 모킹
jest.mock("@/assets/images/profile.svg", () => {
  return function ProfileSvg({
    width,
    className,
    onClick,
  }: {
    width: number;
    className?: string;
    onClick?: () => void;
  }) {
    return (
      <div
        data-testid="profile-svg"
        style={{ width }}
        className={className}
        onClick={onClick}
      />
    );
  };
});

jest.mock("@/hooks/auth/useAuthUser", () => ({
  useAuthUser: jest.fn(),
}));

jest.mock("@/hooks/auth/useSignout", () => ({
  useSignout: jest.fn(() => jest.fn()),
}));

// DropdownMenu 모킹
jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onSelect,
  }: {
    children: React.ReactNode;
    onSelect?: () => void;
  }) => (
    <div data-testid="dropdown-item" onClick={onSelect}>
      {children}
    </div>
  ),
}));

const mockUsePathname = jest.mocked(usePathname);
const mockUseAuthUser = useAuthUser as jest.Mock;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>,
  );
};

const renderHeader = (pathname = "/", user: UserType | null = null) => {
  mockUsePathname.mockReturnValue(pathname);
  mockUseAuthUser.mockReturnValue({ data: user });
  return renderWithQueryClient(<Header />);
};

const loggedInUser: UserType = {
  id: 1,
  email: "test@example.com",
  name: "멍로드",
  nickName: "멍로드",
  image: null,
  isPetInfoSubmitted: true,
  createdAt: "",
  updatedAt: "",
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
    expect(logoLink).toHaveAttribute("href", PATH.HOME);
  });

  it("각 네비게이션 메뉴가 올바른 링크를 가져야 한다", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "정기 모임" })).toHaveAttribute(
      "href",
      PATH.REGULAR,
    );
    expect(screen.getByRole("link", { name: "번개 모임" })).toHaveAttribute(
      "href",
      PATH.QUICK,
    );
    expect(screen.getByRole("link", { name: "찜한 모임" })).toHaveAttribute(
      "href",
      PATH.FAVORITES,
    );
    expect(screen.getByRole("link", { name: "모든 리뷰" })).toHaveAttribute(
      "href",
      PATH.REVIEWS,
    );
  });

  it("로그인 상태에서 프로필 아이콘을 클릭하면 드롭다운 메뉴가 나타남", async () => {
    renderHeader("/", loggedInUser);

    const profileIcon = screen.getByTestId("profile-svg");
    fireEvent.click(profileIcon);

    await waitFor(() => {
      expect(screen.getByText("마이페이지")).toBeInTheDocument();
      expect(screen.getByText("로그아웃")).toBeInTheDocument();
    });
  });

  it("로그아웃 상태에서 프로필 아이콘을 클릭하면 로그인 페이지로 이동", () => {
    renderHeader("/", null);

    const profileIcon = screen.getByTestId("profile-svg");
    fireEvent.click(profileIcon);

    // onClick 이벤트가 트리거되었는지 확인
    expect(profileIcon).toBeInTheDocument();
  });

  it("현재 경로에 해당하는 메뉴가 활성화되어야 한다", () => {
    renderHeader(PATH.REGULAR_DETAIL(1));

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
