import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home", () => {
  it("should render", () => {
    render(<Home />);
    expect(screen.getByText("멍로드")).toBeInTheDocument();
  });
});
