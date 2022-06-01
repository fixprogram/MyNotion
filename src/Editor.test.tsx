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

  test("Adds corrent amount of spaces", () => {
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

  test("Backspace from main textarea sets focus on last content block", () => {
    render(<Editor />);

    userEvent.click(screen.getByTestId("main-textarea-trigger"));
    const textarea = screen.getByPlaceholderText("Type '/' for commands");

    userEvent.type(textarea, "{enter}");
    userEvent.type(textarea, "{enter}");

    userEvent.type(textarea, "{backspace}");
    const contentBlocks = screen.getAllByTestId("content-block");
    expect(textarea).not.toHaveFocus();
    expect(contentBlocks[1].querySelector("textarea")).toHaveFocus();
  });

  test("Adds two blocks with different texts", () => {
    render(<Editor />);

    userEvent.click(screen.getByTestId("main-textarea-trigger"));
    const textarea = screen.getByPlaceholderText("Type '/' for commands");

    userEvent.type(textarea, "123{enter}");
    userEvent.type(textarea, "321{enter}");

    const contentBlocks = screen.getAllByTestId("content-block");
    expect(contentBlocks[0].querySelector("textarea").value).toBe("123");
    expect(contentBlocks[1].querySelector("textarea").value).toBe("321");
    expect(textarea).toHaveFocus();
  });

  test("Removes two blocks correctly", () => {
    render(<Editor />);

    userEvent.click(screen.getByTestId("main-textarea-trigger"));
    const textarea = screen.getByPlaceholderText("Type '/' for commands");

    userEvent.type(textarea, "1{enter}");
    userEvent.type(textarea, "3{enter}");
    userEvent.type(textarea, "{backspace}");
    const contentBlocks = screen.getAllByTestId("content-block");
    const firstTextarea = contentBlocks[0].querySelector("textarea") as Element;
    const secondTextarea = contentBlocks[1].querySelector(
      "textarea"
    ) as Element;

    expect(secondTextarea).toHaveFocus();
    expect(secondTextarea).toHaveTextContent("3");
    expect(firstTextarea).toHaveTextContent("1");

    userEvent.type(secondTextarea, "{backspace}{backspace}");
    const contentBlocksAgain = screen.getAllByTestId("content-block");
    expect(firstTextarea).toHaveFocus();
    expect(contentBlocksAgain).toHaveLength(1);

    userEvent.type(firstTextarea, "{backspace}{backspace}");
    const contentBlocksAgai = screen.queryAllByTestId("content-block");
    expect(contentBlocksAgai).toHaveLength(0);
  });
});
