import React from "react";
import { twMerge } from "tailwind-merge";

export type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = (props: InputType) => {
  return <input {...props} className={twMerge("input", props?.className)} />;
};

export type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export const Label = (props: LabelProps) => (
  <label {...props} className={twMerge("label", props?.className)} />
);
