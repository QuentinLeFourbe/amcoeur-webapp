import { PageComponent } from "@amcoeur/types";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { getNewComponent } from "../../utils/page";
import DynamicContainer from "../../../global/components/organisms/DynamicContainer/DynamicContainer";
import FormTitleBannerComponent from "./FormTitleBanner";
import FormTextAreaComponent from "./FormTextAreaComponent";
import FormImage from "./FormImage";
import FormEmptyComponent from "./FormEmptyComponent";
import DynamicFormFields from "./DynamicFormFields";
import WrappedFormContentPanel from "./WrappedFormContentPanel";

type ComponentsFieldsRendererProps = {
  value: PageComponent[];
  onChange?: (components: PageComponent[]) => void;
  onBlur?: (components: PageComponent[]) => void;
  moveComponent?: (index: number, direction: "up" | "down") => void;
  removeComponent?: (index: number) => void;
  updateComponent?: (component: PageComponent, index: number) => void;
  errors?: Merge<
    FieldError,
    (
      | Merge<FieldError, FieldErrorsImpl<NonNullable<PageComponent>>>
      | undefined
    )[]
  >;
};

/**
 * Render the fields for a list of page components, used for page creation
 * **/
function ComponentsFieldsRenderer({
  value: components,
  onChange,
  onBlur,
  moveComponent,
  removeComponent,
  updateComponent,
  errors,
}: ComponentsFieldsRendererProps) {
  const handleChange = (component: PageComponent, index: number) => {
    const newValue = [...components];
    newValue[index] = component;
    onChange?.(newValue);
  };

  const getHandleBlur = (index: number) => {
    const handleBlur = (component: PageComponent) => {
      const newValue = [...components];
      newValue[index] = component;
      onBlur?.(newValue);
    };
    return handleBlur;
  };

  const getRenderedComponent = (component: PageComponent, index: number) => {
    switch (component.type) {
      case "Image":
        return (
          <FormImage
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={(component) => handleChange(component, index)}
            errors={errors?.[index]}
          />
        );
      case "TitleBanner":
        return (
          <FormTitleBannerComponent
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={(component) => handleChange(component, index)}
            errors={errors?.[index]}
          />
        );
      case "TextArea":
        return (
          <FormTextAreaComponent
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={(component) => handleChange(component, index)}
          />
        );
      case "ContentPanel":
        return (
          <WrappedFormContentPanel
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={(component) => handleChange(component, index)}
            errors={errors?.[index]}
          />
        );
      case "Form":
        return (
          <DynamicFormFields
            component={component}
            onChange={(component) => handleChange(component, index)}
          />
        );
      case "Empty":
        return (
          <FormEmptyComponent
            onChange={(type) => {
              updateComponent && updateComponent(getNewComponent(type), index);
            }}
          />
        );
      default:
        return null;
    }
  };

  return components?.map((component, index) => (
    <DynamicContainer
      key={component.id}
      onDelete={removeComponent && (() => removeComponent(index))}
      onMoveUp={
        index !== 0 && moveComponent
          ? () => moveComponent(index, "up")
          : undefined
      }
      onMoveDown={
        index !== components.length - 1 && moveComponent
          ? () => moveComponent(index, "down")
          : undefined
      }
    >
      {getRenderedComponent(component, index)}
    </DynamicContainer>
  ));
}

export default ComponentsFieldsRenderer;
