import { PageComponent } from "@amcoeur/types";
import Markdown from "markdown-to-jsx";
import TitlePanel from "../../molecules/TitlePanel/TitlePanel";
import TextPanel from "../../molecules/TextPanel/TextPanel";

type GeneratedPageRendererProps = {
  components: PageComponent[];
};

function GeneratedPageRenderer({ components }: GeneratedPageRendererProps) {
  return components.map((component, index) => {
    switch (component.type) {
      case "TitleBanner":
        return (
          <TitlePanel key={index}>
            <h1>{component.title}</h1>
            <Markdown>{component.content}</Markdown>
          </TitlePanel>
        );
      case "TextArea":
        return (
          <TextPanel key={index}>
            <Markdown>{component.content}</Markdown>
          </TextPanel>
        );
      default:
        return null;
    }
  });
}

export default GeneratedPageRenderer;
