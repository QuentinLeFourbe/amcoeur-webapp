import { Controller, useForm } from "react-hook-form";
import { ContentPanelComponent, PageData } from "@amcoeur/types";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import ComponentsFieldsRenderer from "../../molecules/FormPageComponents/ComponentsFieldsRenderer";

type HomePageFormProps = {
  data?: PageData;
  onSubmit?: (data: PageData) => void;
};

const emptySection: ContentPanelComponent = {
  type: "ContentPanel",
  title: "",
  content: "",
  imageUrl: "",
  image: undefined,
  link: "",
  linkLabel: "",
};

function HomePageForm({ data, onSubmit }: HomePageFormProps = {}) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    getValues,
    watch,
  } = useForm<PageData>({
    // resolver: yupResolver(pageDataSchema),
    defaultValues: data,
  });
  console.log({ errors });
  const onSubmitData = (data: PageData) => {
    try {
      onSubmit?.(data);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      reset();
    }
  };

  const components = watch("components");

  const handleMoveComponent = (index: number, direction: "up" | "down") => {
    const components = getValues("components");
    const component = components[index];
    components.splice(index, 1);
    components.splice(direction === "up" ? index - 1 : index + 1, 0, component);
    setValue("components", components);
  };

  const handleRemoveComponent = (index: number) => {
    const components = getValues("components");
    components.splice(index, 1);
    setValue("components", components);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitData)} encType="multipart/form-data">
      {components && !!components.length && (
        <Button
          type="button"
          onClick={() =>
            setValue("components", [emptySection, ...getValues("components")])
          }
        >
          Ajouter section
        </Button>
      )}
      <Controller
        control={control}
        name="components"
        render={({ field }) => (
          //  <FormCodeArea
          //       {...field}
          //       errorMessage={errors?.content?.message?.toString()}
          //       width="medium"
          //     >
          //       Contenu:
          //     </FormCodeArea>
          <ComponentsFieldsRenderer
            {...field}
            moveComponent={handleMoveComponent}
            removeComponent={handleRemoveComponent}
          />
        )}
      />
      <Button
        type="button"
        onClick={() =>
          setValue("components", [...getValues("components"), emptySection])
        }
      >
        Ajouter section
      </Button>

      <Button type="submit">Enregistrer</Button>
    </Form>
  );
}

export default HomePageForm;
