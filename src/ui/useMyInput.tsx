import React, { useCallback, useRef } from "react";
import { InputWrapper, InputWrapperProps } from "./Container";

export interface Usetextwe extends InputWrapperProps {
  className?: string;
  value: string | number;
  inputProps?: InputProps;
  onChange: () => void;
}

const useMyInput = () => {
  const ref = useRef<HTMLElement>(null);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, [ref]);

  const Componnent = useCallback(() => {
    const wrapperProps = { id, message };
    return (
      <InputWrapper {...wrapperProps}>
        <Input />
      </InputWrapper>
    );
  }, []);

  return { ref, focus, Componnent };
};

export default useMyInput;
