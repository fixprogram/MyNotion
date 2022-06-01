import { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function TextareaBlock({
  addContent,
  addSpace,
  setFocusOnLastContent,
  addBlur,
}: {
  addContent: Function;
  addSpace: Function;
  setFocusOnLastContent: Function;
  addBlur: Function;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (value.startsWith("# ")) {
      setValue("");
      addContent({ tag: "h1", value: "" });
    }

    if (value.startsWith("## ")) {
      setValue("");
      addContent({ tag: "h2", value: "" });
    }

    if (value.startsWith("### ")) {
      setValue("");
      addContent({ tag: "h3", value: "" });
    }

    if (value.startsWith("/img ")) {
      setValue("");
      addContent({ tag: "img", value: "" });
    }

    if (value.startsWith("/code ")) {
      setValue("");
      addContent({ tag: "code", value: "" });
    }
  }, [value, addContent]);

  return (
    <TextareaAutosize
      style={{ paddingLeft: 20, marginLeft: -20 }}
      ref={ref}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
      onKeyDown={(evt) => {
        const target = evt.target as HTMLInputElement;
        if (evt.code === "Backspace" && target.value.length === 0) {
          evt.preventDefault();
          setFocusOnLastContent();
        }
        if (evt.code === "Enter") {
          evt.preventDefault();
          if (value.length === 0) {
            addSpace();
          } else {
            addContent({ tag: "p", value: target.value, idx: null });
          }
          setValue("");
        }
      }}
      className="w-full resize-none text-xl focus:outline-none"
      onFocus={(e) => (e.target.placeholder = `Type '/' for commands`)}
      onBlur={(e) => {
        addBlur();
        return (e.target.placeholder = "");
      }}
    />
  );
}
