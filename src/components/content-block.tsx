import CodeBlock from "./code-block/code-block";
import StudyInput from "./input-block";
import InputImage from "./input-image";
import TextBlock from "./text-block/text-block";

function formatContent(
  tag: string,
  value: any,
  refName: any,
  setFocusOnPreviousContent: Function,
  setFocusOnNextContent: Function,
  addContent: Function,
  id: string
) {
  switch (tag) {
    case "h1":
      return (
        <h1 className="font-title text-3xl">
          <StudyInput
            initialValue={value}
            placeholder="Heading 1"
            name={"h1"}
            refName={refName}
          />
        </h1>
      );
    case "h2":
      return (
        <h2 className="font-title text-2xl">
          <StudyInput
            initialValue={value}
            placeholder="Heading 2"
            name={"h2"}
            refName={refName}
          />
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-title text-xl">
          <StudyInput
            initialValue={value}
            placeholder="Heading 3"
            name={"h3"}
            refName={refName}
          />
        </h3>
      );
    case "img":
      return <InputImage name={id} />;
    case "p":
      return (
        <p style={{ margin: 0 }}>
          <TextBlock
            initialValue={value}
            refName={refName}
            name={"p"}
            setFocusOnPreviousContent={setFocusOnPreviousContent}
            addContent={addContent}
            // setFocusOnNextContent={setFocusOnNextContent}
          />
        </p>
      );
    case "div":
      return (
        <TextBlock
          refName={refName}
          name={"div"}
          setFocusOnPreviousContent={setFocusOnPreviousContent}
          addContent={addContent}
          // setFocusOnNextContent={setFocusOnNextContent}
        />
      );
    case "code":
      return (
        <div>
          <CodeBlock
            initialValue={value}
            refName={refName}
            name={"code"}
            setFocusOnPreviousContent={setFocusOnPreviousContent}
            addContent={addContent}
            // setFocusOnNextContent={setFocusOnNextContent}
          />
        </div>
      );
    default:
      throw new Error(`Unkown tag name: ${tag}`);
  }
}

export default function ContentBlock({
  tag,
  value,
  refName,
  onRemove,
  addSpace,
  addContent,
  setFocusOnPreviousContent,
  setFocusOnNextContent,
  id,
}: {
  tag: string;
  value: string;
  refName: any;
  onRemove: Function;
  addSpace: Function;
  addContent: Function;
  setFocusOnPreviousContent: Function;
  setFocusOnNextContent: Function;
  id: string;
}) {
  return (
    <div
      onKeyDown={(evt) => {
        const target = evt.target as HTMLInputElement;
        if (evt.code === "Backspace" && target.value.length === 0) {
          onRemove();
        }
        if (evt.code === "Enter") {
          if (target.selectionStart !== target.value.length) {
            return;
          }
          if (tag === "code") {
            return;
          }
          evt?.preventDefault();
          return addSpace();
        }
      }}
      tabIndex={0}
      className="relative mb-3"
      data-testid="content-block"
    >
      {/* <input type="hidden" name="id" defaultValue={id} /> */}
      {formatContent(
        tag,
        value,
        refName,
        setFocusOnPreviousContent,
        setFocusOnNextContent,
        addContent,
        id
      )}
    </div>
  );
}
