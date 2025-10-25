import { PageComponent } from "@amcoeur/types";

import Image from "../../../global/components/molecules/Image/Image";
import ContentPanel from "../ContentPanel/ContentPanel";
import PageFormRenderer from "../PageFormRenderer/PageFormRenderer";
import TextArea from "../TextArea/TextArea";
import TitleBanner from "../TitleBanner/TitleBanner";

type PageComponentsRendererProps = {
  components: PageComponent[];
};

function PageComponentsRenderer({ components }: PageComponentsRendererProps) {
  const getRenderedComponent = (component: PageComponent) => {
    switch (component.type) {
      case "TitleBanner":
        return <TitleBanner component={component} />;
      case "TextArea":
        return <TextArea component={component} />;
      case "ContentPanel":
        return <ContentPanel component={component} />;
      case "Image":
        return <Image component={component} />;
      case "Form":
        return <PageFormRenderer component={component} />;
      default:
        return null;
    }
  };

  return components?.map((component, index) => (
    <div key={index}>{getRenderedComponent(component)}</div>
  ));
}

export default PageComponentsRenderer;
