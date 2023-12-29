import React from "react";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import CodeArea from "../../atoms/CodeArea/CodeArea";

type FormCodeAreaProps = React.ComponentProps<typeof CodeArea> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormCodeArea = ({
  children,
  errorMessage,
  ...props
}: FormCodeAreaProps) => {
  return (
    <div>
      <Label>{children}</Label>
      <CodeArea height="600px" {...props} />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormCodeArea;
