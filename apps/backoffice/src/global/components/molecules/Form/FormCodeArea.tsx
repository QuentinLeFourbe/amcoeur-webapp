import React from "react";

import { css, cx } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";
import MarkdownCodeArea from "../../atoms/MarkdownCodeArea/MarkdownCodeArea";
import MarkdownHelp from "../../atoms/MarkdownHelp/MarkdownHelp";

type FormCodeAreaProps = React.ComponentProps<typeof MarkdownCodeArea> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormCodeArea = ({
  children,
  errorMessage,
  ...props
}: FormCodeAreaProps) => {
  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <Label>{children}</Label>
        <MarkdownHelp />
      </div>
      <MarkdownCodeArea
        height="400px"
        {...props}
        className={cx(areaStyle, props.className)}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormCodeArea;

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  width: "100%",
});

const headerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const areaStyle = css({
  alignSelf: "stretch",
});
