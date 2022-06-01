export default function InputBlock({
  initialValue,
  placeholder,
  refName,
  name,
}: {
  initialValue: string;
  placeholder?: string;
  refName: any;
  name: string;
}) {
  return (
    <input
      type="text"
      defaultValue={initialValue}
      placeholder={placeholder}
      className="w-full focus:outline-none"
      ref={refName}
      name={name}
      autoComplete="off"
    />
  );
}
