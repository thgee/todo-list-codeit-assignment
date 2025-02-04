import { render, screen } from "@testing-library/react";
import ActionBtn from "./action-btn";

describe("ActionBtn Component", () => {
  test("renders the add button correctly", () => {
    render(<ActionBtn type="add" onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByAltText("addIcon")).toBeInTheDocument();
  });
});
