import { PageComponent } from "@amcoeur/types";
import Button from "../../atoms/Button/Button";
import { css } from "../../../../styled-system/css";
import FormTitleBannerComponent from "./FormTitleBanner";
import FormTextArea from "./FormTextArea";
import FormContentPanel from "./FormContentPanel";
import { FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

type ComponentsFieldsRendererProps = {
  value: PageComponent[];
  onChange?: (component: PageComponent[]) => void;
  onBlur?: (component: PageComponent[]) => void;
  moveComponent?: (index: number, direction: "up" | "down") => void;
  removeComponent?: (index: number) => void;
  errors?:Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<NonNullable<PageComponent>>> | undefined )[]>;
};

function ComponentsFieldsRenderer({
  value,
  onChange,
  onBlur,
  moveComponent,
  removeComponent,
  errors,
}: ComponentsFieldsRendererProps) {
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
            errors={errors && errors[index]}
          />
        );
      case "TextArea":
        return (
          <FormTextArea
            component={component}
            onBlur={getHandleBlur(index)}
            onChange={getHandleChange(index)}
          />
        );
      case "ContentPanel":
        return (
          <FormContentPanel
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
    <div key={index} className={container}>
      <div className={buttonsContainer}>
        {moveComponent && (
          <>
            {index !== 0 && (
              <Button
                type="button"
                onClick={() => moveComponent(index, "down")}
              >
                Déplacer vers le haut
              </Button>
            )}
            {index !== value.length - 1 && (
              <Button type="button" onClick={() => moveComponent(index, "up")}>
                Déplacer vers le bas
              </Button>
            )}
          </>
        )}
        {removeComponent && (
          <Button type="button" onClick={() => removeComponent(index)}>
            Supprimer
          </Button>
        )}
      </div>
      {getRenderedComponent(component, index)}
    </div>
  ));
}

export default ComponentsFieldsRenderer;

const container = css({
  borderTop: "1px solid white",
  borderBottom: "1px solid white",
  padding: "16px 0",
});

const buttonsContainer = css({
  display: "flex",
  gap: "16px",
});
