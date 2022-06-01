import { ActionKind } from "./reducer";

export type Action =
  | { type: ActionKind.Focus }
  | { type: ActionKind.Blur }
  | { type: ActionKind.AddSpace; payload: { idx: number } }
  | {
      type: ActionKind.AddContent;
      payload: { tag: string; value: string; idx: number };
    }
  | { type: ActionKind.RemoveContent; payload: { idx: number } }
  | { type: ActionKind.SetTitle; payload: { value: string } };

const actionCreator = (dispatch: Function) => ({
  setFocus: () => dispatch({ type: ActionKind.Focus }),
  setBlur: () => dispatch({ type: ActionKind.Blur }),
  addSpace: (idx: number) =>
    dispatch({ type: ActionKind.AddSpace, payload: { idx } }),
  addContent: (tag: string, value: string, idx: number) =>
    dispatch({ type: ActionKind.AddContent, payload: { tag, value, idx } }),
  removeContent: (idx: number) =>
    dispatch({ type: ActionKind.RemoveContent, payload: { idx } }),
  setTitle: (value: string) =>
    dispatch({ type: ActionKind.SetTitle, payload: { value } }),
});

export default actionCreator;
