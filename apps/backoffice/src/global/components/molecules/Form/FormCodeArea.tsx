import React from "react";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import CodeArea from "../../atoms/CodeArea/CodeArea";
import MarkdownHelp from "../../atoms/MarkdownHelp/MarkdownHelp";
import { css, cx } from "../../../../../styled-system/css";

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
    <div className={container}>
      <Label>{children}</Label>
      <MarkdownHelp />
      <CodeArea
        height="600px"
        {...props}
        className={cx(areaStyle, props.className)}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormCodeArea;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "1rem",
  width: "100%",
});

const areaStyle = css({
  alignSelf: "stretch",
});
