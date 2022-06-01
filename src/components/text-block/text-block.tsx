import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function TextBlock({
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

  useEffect(() => {
    refName.target?.current();
  }, []);

  useEffect(() => {
    if (refName.target) {
      refName.target.style.height = `${refName.target.scrollHeight}px`;
    }
  }, [refName, value]);

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
  }, [value, addContent]);

  return (
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
      className="w-full text-xl focus:outline-none resize-none"
      name={name}
      onFocus={(e) => {
        e.target.placeholder = `Type '/' for commands`;
        return e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        );
      }}
      onBlur={(e) => (e.target.placeholder = "")}
    />
  );
}
