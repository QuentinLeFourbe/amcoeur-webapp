import { PageComponent } from "@amcoeur/types";
import FormTitleBannerComponent from "./FormTitleBannerComponent";
import FormTextAreaComponent from "./FormTextAreaComponent";

type FormPageComponentsInputProps = {
  value: PageComponent[];
  onChange?: (component: PageComponent[]) => void;
  onBlur?: (component: PageComponent[]) => void;
};

function ComponentsFieldsRenderer({
  value,
  onChange,
  onBlur,
}: FormPageComponentsInputProps) {
  const getHandleChange = (index: number) => {
    const handleChange = (component: PageComponent) => {
      const newValue = [...value];
      newValue[index] = component;
      onChange?.(newValue);
    };
    return handleChange;
  };

  const getHandleBlur = (index: number) => {
    const handleBlur = (component: PageComponent) => {
      const newValue = [...value];
      newValue[index] = component;
      onBlur?.(newValue);
    };
    return handleBlur;
  };

  const getRenderedComponent = (component: PageComponent, index: number) => {
    switch (component.type) {
      case "TitleBanner":
        return (
          <FormTitleBannerComponent
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={getHandleChange(index)}
          />
        );
      case "TextArea":
        return (
          <FormTextAreaComponent
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={getHandleChange(index)}
          />
        );
      default:
        return null;
    }
  };

  return value?.map((component, index) => (
    <div key={index}>{getRenderedComponent(component, index)}</div>
  ));
}

export default ComponentsFieldsRenderer;
