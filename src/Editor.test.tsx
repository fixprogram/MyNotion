import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Editor from "./Editor";

describe("Testing editor", () => {
  afterEach(() => cleanup());

  test("Page title has to be focused", () => {
    render(<Editor />);

    const pageTitle = screen.getByPlaceholderText(
      /untitled/i
    ) as HTMLInputElement;
    expect(pageTitle).toHaveFocus();
    userEvent.type(pageTitle, "First page");
    expect(pageTitle.value).toBe("First page");
  });

  test("Creates a space by enter event", () => {
    render(<Editor />);

    userEvent.click(screen.getByTestId("main-textarea-trigger"));
    const textarea = screen.getByPlaceholderText("Type '/' for commands");
    expect(textarea).toBeInTheDocument();

    userEvent.type(textarea, "{enter}");
    userEvent.type(textarea, "{enter}");
    const contentBlocks = screen.getAllByTestId("content-block");
    expect(contentBlocks).toHaveLength(2);

    userEvent.type(textarea, "{backspace}");
    const contentBlocksAgain = screen.getAllByTestId("content-block");
    expect(contentBlocksAgain).toHaveLength(2);
  });
});
