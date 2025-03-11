import { twMerge } from "tailwind-merge";
import { TextInput } from ".";

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Col = (props: DivProps) => {
  return <div {...props} className={twMerge("divcol", props?.className)}></div>;
};
export const Row = (props: DivProps) => {
  return <div {...props} className={twMerge("div", props?.className)}></div>;
};

export interface InputWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  message?: string | null;
}

export const InputWrapper = ({
  children,
  id,
  title,
  message,
}: InputWrapperProps) => {
  return (
    <Col className="i-wrap">
      <TextInput.Label htmlFor={id}>{title}</TextInput.Label>
      {children}
      {message && <TextInput />}
    </Col>
  );
};
