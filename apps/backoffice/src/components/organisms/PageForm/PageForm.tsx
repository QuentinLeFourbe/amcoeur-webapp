import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PageDataClientSchema } from "@amcoeur/types";
import type { PageComponent, PageDataClient } from "@amcoeur/types";
import Form from "../../atoms/Form/Form";
import FormInput from "../../molecules/Form/FormInput";
import Button from "../../atoms/Button/Button";
import ComponentsFieldsRenderer from "../../molecules/FormPageComponents/ComponentsFieldsRenderer";
import { getNewComponent } from "../../../utils/page";
import PlusIcon from "../../../assets/icons/plus.svg?react";
import { css } from "../../../../styled-system/css";

type PageFormProps = {
  data?: PageDataClient;
  onSubmit?: (data: PageDataClient) => void;
  homePage?: boolean;
  onCancel?: () => void;
};

const defaultData: PageDataClient = {
  name: "",
  route: "",
  components: [
    {
      type: "TitleBanner",
      title: "",
      content: "",
      imageUrl: "",
      image: null,
    },
    {
      type: "TextArea",
      content: "",
    },
  ],
};

function PageForm({
  data,
  onSubmit,
  homePage = false,
  onCancel,
}: PageFormProps = {}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<PageDataClient>({
    resolver: zodResolver(PageDataClientSchema),
    defaultValues: data || defaultData,
  });

  const onSubmitData = (data: PageDataClient) => {
    try {
      const dataWithoutEmptyComponents = {
        ...data,
        components: data.components.filter(
          (component) => component.type !== "Empty",
        ),
      };
      onSubmit?.(dataWithoutEmptyComponents);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      reset();
    }
  };

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

  const handleUpdateComponent = (component: PageComponent, index: number) => {
    const components = getValues("components");
    components[index] = component;
    setValue("components", components);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitData)} encType="multipart/form-data">
      <div className={css({ display: "flex" , gap: "16px"})}>
        <Button color="red" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button color="green" type="submit">
          Enregistrer
        </Button>
      </div>
      {!homePage && (
        <FormInput
          register={register("name")}
          errorMessage={errors?.name?.message?.toString()}
          width="medium"
        >
          Nom de la page
        </FormInput>
      )}
      {!homePage && (
        <FormInput
          register={register("route")}
          errorMessage={errors?.route?.message?.toString()}
          width="medium"
          isPath={true}
        >
          Chemin d&apos;accès
        </FormInput>
      )}
      <Controller
        control={control}
        name="components"
        render={({ field }) => (
          <ComponentsFieldsRenderer
            {...field}
            moveComponent={handleMoveComponent}
            removeComponent={handleRemoveComponent}
            updateComponent={handleUpdateComponent}
            errors={errors?.components}
          />
        )}
      />
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Button
          type="button"
          onClick={() =>
            setValue("components", [
              ...getValues("components"),
              getNewComponent("Empty"),
            ])
          }
          className={css({
            alignSelf: "center",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            "&:hover": { "& svg": { color: "pink.400" } },
          })}
        >
          <PlusIcon
            className={css({ width: "50px", height: "50px", color: "white" })}
          />
        </Button>
      </div>
      <Button color="green" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
}

export default PageForm;
