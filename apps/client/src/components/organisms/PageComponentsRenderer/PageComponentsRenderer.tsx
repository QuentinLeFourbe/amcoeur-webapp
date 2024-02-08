import { PageComponent } from "@amcoeur/types";
import Markdown from "markdown-to-jsx";
import TitlePanel from "../../molecules/TitlePanel/TitlePanel";
import TextPanel from "../../molecules/TextPanel/TextPanel";
import ContentPanel from "../../molecules/ContentPanel/ContentPanel";

type PageComponentsRendererProps = {
  components: PageComponent[];
};

function PageComponentsRenderer({ components }: PageComponentsRendererProps) {
  let isContentPanelReversed = false;
  return components.map((component, index) => {
    switch (component.type) {
      case "TitleBanner":
        return (
          <TitlePanel key={index} src={component.imageUrl}>
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
      case "ContentPanel":
        isContentPanelReversed = !isContentPanelReversed;
        return (
          <ContentPanel
            key={index}
            title={component.title}
            imageUrl={component.imageUrl}
            link={component.link}
            linkLabel={component.linkLabel}
            revert={!isContentPanelReversed}
          >
            <Markdown>{component.content}</Markdown>
          </ContentPanel>
        );
      default:
        return null;
    }
  });
}

export default PageComponentsRenderer;
