import { PageComponent } from "@amcoeur/types";
import TextArea from "../TextArea/TextArea";
import TitleBanner from "../TitleBanner/TitleBanner";
import ContentPanel from "../ContentPanel/ContentPanel";
import Image from "../../../global/components/molecules/Image/Image";

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
      return <Image component={component} />
      default:
        return null;
    }
  };

  return components?.map((component, index) => (
    <div key={index}>{getRenderedComponent(component)}</div>
  ));
}

export default PageComponentsRenderer;
