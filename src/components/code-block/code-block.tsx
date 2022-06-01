import { Fragment, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SyntaxHighlighter from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import { encode } from "html-entities";

export default function CodeBlock({
  initialValue = "",
  refName,
  name,
  setFocusOnPreviousContent,
  addContent,
}: {
  initialValue?: string;
  refName: any;
  name: string;
  setFocusOnPreviousContent: Function;
  addContent: Function;
}) {
  const [value, setValue] = useState(initialValue);
  const [decodedValue, setDecodedValue] = useState(initialValue);

  useEffect(() => {
    if (refName.target) {
      refName.target.style.height = `${refName.target.scrollHeight}px`;
    }
  }, [refName, value]);

  //   useEffect(() => {
  //     if (value.startsWith("# ")) {
  //       setValue("");
  //       addContent({ tag: "h1", value: "" });
  //     }

  //     if (value.startsWith("## ")) {
  //       setValue("");
  //       addContent({ tag: "h2", value: "" });
  //     }

  //     if (value.startsWith("### ")) {
  //       setValue("");
  //       addContent({ tag: "h3", value: "" });
  //     }
  //   }, [value, addContent]);

  return (
    // <Fragment>
    //   <TextareaAutosize
    //     minRows={1}
    //     ref={refName}
    //     value={value}
    //     onChange={(evt) => {
    //       const decodedValue = decode(evt.target.value);
    //       setDecodedValue(decodedValue);
    //       setValue(encode(decodedValue));
    //     }}
    //     onKeyDown={(evt) => {
    //       const target = evt.target as HTMLInputElement;
    //       if (evt.code === "Backspace" && target.value.length === 0) {
    //         evt.preventDefault();
    //         setFocusOnPreviousContent();
    //       }
    //     }}
    //     className="w-full resize-none text-xl focus:outline-none"
    //     name={name}
    //     onFocus={(e) => {
    //       return e.currentTarget.setSelectionRange(
    //         e.currentTarget.value.length,
    //         e.currentTarget.value.length
    //       );
    //     }}
    //     onBlur={(e) => (e.target.placeholder = "")}
    //   />
    //   <SyntaxHighlighter language="javascript" style={docco}>
    //     {decodedValue}
    //   </SyntaxHighlighter>
    // </Fragment>
    <Fragment>
      <input type="hidden" name={name} value={encode(value)} />
      <TextareaAutosize
        minRows={1}
        ref={refName}
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        onKeyDown={(evt) => {
          const target = evt.target as HTMLInputElement;
          if (evt.code === "Backspace" && target.value.length === 0) {
            evt.preventDefault();
            setFocusOnPreviousContent();
          }
        }}
        className="w-full resize-none text-xl focus:outline-none"
        onFocus={(e) => {
          return e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          );
        }}
        onBlur={(e) => (e.target.placeholder = "")}
      />
      <SyntaxHighlighter language="javascript" style={docco}>
        {value}
      </SyntaxHighlighter>
    </Fragment>
  );
}
