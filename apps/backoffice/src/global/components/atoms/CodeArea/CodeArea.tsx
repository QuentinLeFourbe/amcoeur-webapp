import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { ComponentProps } from "react";

type CodeAreaProps = ComponentProps<typeof CodeMirror>;

export default function CodeArea({ ...props }: CodeAreaProps = {}) {
  return (
    <CodeMirror
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ]}
      theme={dracula}
      {...props}
    />
  );
}
