import { PageComponent } from "@amcoeur/types";
import Markdown from "markdown-to-jsx";
import TextPanel from "../../../global/components/molecules/TextPanel/TextPanel";
import ContentPanel from "../../../global/components/molecules/ContentPanel/ContentPanel";
import Image from "../../../global/components/molecules/Image/Image";
import TitlePanel from "../../../global/components/molecules/TitlePanel/TitlePanel";
import DynamicFormRenderer from "../DynamicFormRenderer/DynamicFormRenderer";

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
            <Markdown>{component.content || ""}</Markdown>
          </TitlePanel>
        );
      case "TextArea":
        return (
          <TextPanel key={index}>
            <Markdown>{component.content || ""}</Markdown>
          </TextPanel>
        );
      case "ContentPanel":
        isContentPanelReversed = !isContentPanelReversed;
        return (
          <ContentPanel
            key={index}
            title={component.title || ""}
            imageUrl={component.imageUrl || ""}
            link={component.link || ""}
            linkLabel={component.linkLabel || ""}
            revert={!isContentPanelReversed}
          >
            <Markdown>{component.content || ""}</Markdown>
          </ContentPanel>
        );
      case "Image":
        return (
          <Image
            key={index}
            imageUrl={component.imageUrl || ""}
            caption={component.caption}
          />
        );
      case "Form":
        return <DynamicFormRenderer component={component} />;
      default:
        return null;
    }
  });
}

export default PageComponentsRenderer;
