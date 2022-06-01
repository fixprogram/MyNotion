import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import userEvent from "@testing-library/user-event";

describe("testing sidebar", () => {
  test("renders a menu with first page", () => {
    render(<Sidebar />);
    const newPage = screen.getByText(/untitled/i);
    expect(newPage).toBeInTheDocument();

    const addPageBtn = screen.getByRole("button", { name: /add a page/i });

    userEvent.click(addPageBtn);
    const pages = screen.getAllByRole("listitem");
    expect(pages).toHaveLength(3);
  });
});
