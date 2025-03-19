import { useRef, Ref, useImperativeHandle, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface TextInputProps {
  value: string | number;
  onChangeText: (value: string) => void;
  id: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  ref: Ref<TextInputRef>;
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export interface TextInputRef {
  focus: () => void;
  message: "code 0" | null;
}

const TextInput = ({
  id,
  label,
  onChangeText,
  ref,
  value,
  placeholder,
  type,
  props,
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Safely handle undefined or null values for value
  const message = useMemo<"code 0" | null>(() => {
    const valueStr = value != null ? value.toString() : ""; // Ensure value is not undefined or null
    if (valueStr.length === 0) {
      return "code 0";
    }
    return null;
  }, [value]);

  // Expose focus method and message to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      focus: () => setTimeout(() => inputRef.current?.focus(), 100),
      message,
    }),
    [message]
  );

  return (
    <div className="ti-con">
      {label && (
        <label htmlFor={id} className="ti-l">
          {label}
        </label>
      )}
      <input
        {...props}
        className={twMerge("ti-i", props?.className)}
        type={type ?? "text"}
        id={id}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        ref={inputRef}
      />
    </div>
  );
};

export default TextInput;
