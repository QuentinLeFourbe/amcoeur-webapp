import React from "react";

import { css, cx } from "../../../../../styled-system/css";
import CodeArea from "../../atoms/CodeArea/CodeArea";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";
import MarkdownHelp from "../../atoms/MarkdownHelp/MarkdownHelp";

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
    <div className={containerStyle}>
      <div className={headerStyle}>
        <Label>{children}</Label>
        <MarkdownHelp />
      </div>
      <div className={editorWrapperStyle}>
        <CodeArea
          height="400px"
          {...props}
          className={cx(areaStyle, props.className)}
        />
      </div>
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

const editorWrapperStyle = css({
  borderRadius: "12px",
  overflow: "hidden", // Crucial pour garder les coins arrondis avec CodeMirror
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  backgroundColor: "#282a36", // Correspond au thème Dracula par défaut

  "&:focus-within": {
    borderColor: "amcoeurRose",
    boxShadow: "0 0 0 1px rgba(225, 29, 72, 0.5)",
  }
});

const areaStyle = css({
  alignSelf: "stretch",
  "& .cm-editor": {
    fontSize: "14px",
  }
});
