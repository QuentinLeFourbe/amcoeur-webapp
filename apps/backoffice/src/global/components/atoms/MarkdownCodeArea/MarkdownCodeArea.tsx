import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { 
  Bold, 
  Heading1, 
  Heading2, 
  Italic, 
  Link as LinkIcon, 
  List, 
  ListOrdered,
  Quote
} from "lucide-react";
import { useCallback, useRef } from "react";

import { css } from "../../../../../styled-system/css";

type MarkdownCodeAreaProps = React.ComponentProps<typeof CodeMirror>;

export default function MarkdownCodeArea(props: MarkdownCodeAreaProps) {
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  const insertMarkdown = useCallback((prefix: string, suffix: string = "", type: "wrap" | "line" = "wrap") => {
    const view = editorRef.current?.view;
    if (!view) return;

    const { state } = view;
    const { from, to } = state.selection.main;
    let targetFrom = from;
    let targetTo = to;

    if (type === "wrap") {
      // 1. Détection du mot ou de la zone formatée si aucune sélection
      if (from === to) {
        const line = state.doc.lineAt(from);
        const text = line.text;
        const posInLine = from - line.from;

        let start = posInLine;
        while (start > 0 && /\w/.test(text[start - 1])) start--;
        let end = posInLine;
        while (end < text.length && /\w/.test(text[end])) end++;

        targetFrom = line.from + start;
        targetTo = line.from + end;
      }

      // 2. Vérifier si le formatage est déjà présent AUTOUR de la zone cible
      const hasPrefixBefore = state.sliceDoc(targetFrom - prefix.length, targetFrom) === prefix;
      const hasSuffixAfter = state.sliceDoc(targetTo, targetTo + suffix.length) === suffix;
      
      // Vérifier aussi si le formatage est À L'INTÉRIEUR de la zone cible (ex: si on a sélectionné **mot**)
      const textInRange = state.sliceDoc(targetFrom, targetTo);
      const isFormattedInside = textInRange.startsWith(prefix) && textInRange.endsWith(suffix);

      if (hasPrefixBefore && hasSuffixAfter) {
        // Toggle OFF : Retirer ce qui est autour
        view.dispatch({
          changes: { from: targetFrom - prefix.length, to: targetTo + suffix.length, insert: textInRange },
          selection: { anchor: targetFrom - prefix.length, head: targetFrom - prefix.length + textInRange.length }
        });
      } else if (isFormattedInside) {
        // Toggle OFF : Retirer ce qui est dedans
        const unformatted = textInRange.slice(prefix.length, textInRange.length - suffix.length);
        view.dispatch({
          changes: { from: targetFrom, to: targetTo, insert: unformatted },
          selection: { anchor: targetFrom, head: targetFrom + unformatted.length }
        });
      } else {
        // Toggle ON : Ajouter le formatage
        view.dispatch({
          changes: { from: targetFrom, to: targetTo, insert: `${prefix}${textInRange}${suffix}` },
          selection: { anchor: targetFrom + prefix.length, head: targetTo + prefix.length }
        });
      }
    } else if (type === "line") {
      const line = state.doc.lineAt(from);
      const isAlreadyFormatted = line.text.startsWith(prefix);

      if (isAlreadyFormatted) {
        view.dispatch({
          changes: { from: line.from, to: line.from + prefix.length, insert: "" },
        });
      } else {
        view.dispatch({
          changes: { from: line.from, insert: prefix },
        });
      }
    }
    
    view.focus();
  }, []);

  return (
    <div className={containerStyle}>
      <div className={toolbarStyle}>
        <ToolbarButton onClick={() => insertMarkdown("**", "**")} title="Gras">
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("*", "*")} title="Italique">
          <Italic size={16} />
        </ToolbarButton>
        <div className={dividerStyle} />
        <ToolbarButton onClick={() => insertMarkdown("# ", "", "line")} title="Titre 1">
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("## ", "", "line")} title="Titre 2">
          <Heading2 size={16} />
        </ToolbarButton>
        <div className={dividerStyle} />
        <ToolbarButton onClick={() => insertMarkdown("- ", "", "line")} title="Liste à puces">
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("1. ", "", "line")} title="Liste ordonnée">
          <ListOrdered size={16} />
        </ToolbarButton>
        <div className={dividerStyle} />
        <ToolbarButton onClick={() => insertMarkdown("[", "](url)")} title="Lien">
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertMarkdown("> ", "", "line")} title="Citation">
          <Quote size={16} />
        </ToolbarButton>
      </div>

      <div className={editorWrapperStyle}>
        <CodeMirror
          ref={editorRef}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          theme={dracula}
          {...props}
        />
      </div>
    </div>
  );
}

const ToolbarButton = ({ children, onClick, title }: { children: React.ReactNode, onClick: () => void, title: string }) => (
  <button 
    type="button" 
    onClick={onClick} 
    className={toolbarButtonStyle} 
    title={title}
  >
    {children}
  </button>
);

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.1)",
  backgroundColor: "#282a36",
});

const toolbarStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "6px",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  borderBottom: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.05)",
});

const toolbarButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "6px",
  color: "rgba(255, 255, 255, 0.6)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "amcoeurRose",
  },
});

const dividerStyle = css({
  width: "1px",
  height: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  margin: "0 4px",
});

const editorWrapperStyle = css({
  "& .cm-editor": {
    fontSize: "14px",
    outline: "none!",
  },
  "& .cm-scroller": {
    fontFamily: "monospace",
  }
});
