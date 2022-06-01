import { nanoid } from "nanoid";
import type { Action } from "./actions";

type State = {
  onText: boolean;
  content: any[];
  previous: boolean;
  focusIndex: number;
  title: string;
};

export const initialState: State = {
  onText: false,
  content: [],
  previous: false,
  focusIndex: 0,
  title: "",
};

export enum ActionKind {
  Focus = "FOCUS_DOCUMENT",
  Blur = "BLUR_DOCUMENT",
  AddSpace = "ADD_SPACE",
  AddContent = "ADD_CONTENT",
  RemoveContent = "REMOVE_CONTENT",
  SetTitle = "SET_TITLE",
  SetContent = "SET_CONTENT",
}

export const reducer = (state: State, action: Action) => {
  const { content } = state;
  switch (action.type) {
    case ActionKind.Focus: {
      return { ...state, onText: true };
    }
    case ActionKind.Blur: {
      return { ...state, onText: false };
    }
    case ActionKind.AddSpace: {
      const { idx } = action.payload;
      return {
        ...state,
        content: [...content, { tag: "div", value: "" }],
        previous: false,
        focusIndex: idx + 1,
      };
    }
    case ActionKind.AddContent: {
      const { tag, value, idx = content.length - 1 } = action.payload;
      return {
        ...state,
        onText: tag === "p" ? true : false,
        previous: tag === "h1",
        content: [...content, { tag, value, id: nanoid() }],
        focusIndex: idx === -1 ? idx + 2 : idx + 1, // After deleting all fields the index will be -1. Without increasing it on 2 at the beginning, we'll face issues with focus
      };
    }
    case ActionKind.RemoveContent: {
      const { idx } = action.payload;
      const newContent = content;
      newContent.splice(idx, 1);
      return {
        ...state,
        focusIndex: idx - 1,
        content: [...newContent],
      };
    }
    case ActionKind.SetTitle: {
      const { value } = action.payload;
      return { ...state, title: value };
    }
    default: {
      throw new Error(`We don't know this action type: ${action}`);
    }
  }
};
