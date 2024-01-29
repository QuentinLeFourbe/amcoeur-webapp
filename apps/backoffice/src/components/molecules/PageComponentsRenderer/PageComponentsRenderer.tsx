import { PageComponent } from "@amcoeur/types";
import TextAreaComponent from "../TextAreaComponent/TextAreaPageComponent";
import TitleBannerComponent from "../TitleBannerComponent.tsx/TitleBannerPageComponent";
import SectionPanelComponent from "../SectionPanelComponent/SectionPanelComponent";

type PageComponentsRendererProps = {
  components: PageComponent[];
};

function PageComponentsRenderer({ components }: PageComponentsRendererProps) {
  const getRenderedComponent = (component: PageComponent) => {
    switch (component.type) {
      case "TitleBanner":
        return <TitleBannerComponent component={component} />;
      case "TextArea":
        return <TextAreaComponent component={component} />;
      case "SectionPanel":
        return <SectionPanelComponent component={component} />;
      default:
        return null;
    }
  };

  return components?.map((component, index) => (
    <div key={index}>{getRenderedComponent(component)}</div>
  ));
}

export default PageComponentsRenderer;
