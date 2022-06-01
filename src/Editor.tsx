import { useReducer, useRef, useEffect } from "react";
import ContentBlock from "./components/content-block";
import { reducer, initialState, ActionKind } from "./reducer";
import TextareaBlock from "./components/textarea-block/textarea-block";

export default function Editor() {
  const [{ onText, content, focusIndex, title }, dispatch] = useReducer(
    reducer,
    {
      ...initialState,
    }
  );
  const titleRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, content?.length);
  }, [content]);

  useEffect(() => {
    // console.log(focusIndex);
    setFocusOn(focusIndex + 1);
  }, [focusIndex]);

  function setFocusOn(idx: number) {
    if (!itemsRef.current[idx]) {
      return itemsRef.current[idx - 1]?.focus();
    }
    return itemsRef.current[idx]?.focus();
  }

  function setFocusOnLastContent() {
    itemsRef.current[content?.length - 1]?.focus();
  }

  function setFocusOnNextContent(idx: number) {
    itemsRef.current[idx + 1]?.focus();
  }

  function setFocusOnPreviousContent(idx: number) {
    if (itemsRef.current[idx - 1]) {
      itemsRef.current[idx - 1]?.focus();
    }
  }

  return (
    <section className="mx-auto mt-5 w-full max-w-3xl px-5">
      <section className="flex flex-col w-full	">
        <div className="max-w-full	bg-white relative h-[45px]"></div>
        <form
          className="grow-0	shrink-1 flex flex-col max-h-full w-[900px] mx-auto"
          style={{ height: "calc(100vh - 45px)" }}
        >
          <div className="mt-[100px]">
            <h1 className="whitespace-pre-wrap	text-4xl	font-bold	py-[3px]">
              <input
                type="text"
                ref={titleRef}
                placeholder="Untitled"
                className="w-full outline-0	"
              />
            </h1>
          </div>

          {content?.map(({ tag, value, id }: any, idx: number) => {
            return (
              <ContentBlock
                tag={tag}
                value={value}
                key={id}
                id={id}
                onRemove={() => {
                  dispatch({
                    type: ActionKind.RemoveContent,
                    payload: { idx },
                  });
                }}
                addSpace={() => {
                  dispatch({
                    type: ActionKind.AddSpace,
                    payload: { idx: focusIndex },
                  });
                }}
                addContent={(payload: any) =>
                  dispatch({ type: ActionKind.AddContent, payload })
                }
                refName={(el: any) => (itemsRef.current[idx] = el)}
                setFocusOnNextContent={() => setFocusOnNextContent(idx)}
                setFocusOnPreviousContent={() => setFocusOnPreviousContent(idx)}
              />
            );
          })}

          <div className="shrink-0 grow-1 items-start flex-column text-base pb-[30vh] pt-[5px]">
            <div
              className="h-[80vh] cursor-text"
              // style={{ height: "80vh", cursor: "text" }}
              onClick={() => {
                dispatch({ type: ActionKind.Focus });
              }}
              data-testid="main-textarea-trigger"
            >
              {onText && (
                <TextareaBlock
                  addContent={(payload: any) =>
                    dispatch({ type: ActionKind.AddContent, payload })
                  }
                  addSpace={() =>
                    dispatch({
                      type: ActionKind.AddSpace,
                      payload: { idx: focusIndex },
                    })
                  }
                  addBlur={() => {
                    dispatch({ type: ActionKind.Blur });
                  }}
                  setFocusOnLastContent={setFocusOnLastContent}
                />
              )}
            </div>
          </div>
          {/* ) : (
            <div
              style={{ height: "80vh", cursor: "text" }}
              onClick={() => {
                dispatch({ type: ActionKind.Focus });
              }}
              id="main-textarea-trigger"
            ></div>
          )} */}
        </form>
      </section>
    </section>
  );
}
