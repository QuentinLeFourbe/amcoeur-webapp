import type { PageComponent, PageDataClient } from "@amcoeur/types";
import { pageDataClientSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { css } from "../../../../styled-system/css";
import { AddButton } from "../../../global/components/atoms/AddButton/AddButton";
import Button from "../../../global/components/atoms/Button/Button";
import Form from "../../../global/components/atoms/Form/Form";
import FormCheckbox from "../../../global/components/molecules/Form/FormCheckbox";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import { generateRouteFromName, getNewComponent } from "../../utils/page";
import ComponentsFieldsRenderer from "../FormPageComponents/ComponentsFieldsRenderer";

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
    resolver: zodResolver(pageDataClientSchema),
    defaultValues: data || defaultData,
  });

  const [isUsingCustomRoute, setIsUsingCustomRoute] = useState(
    (data?.route || "") !== generateRouteFromName(data?.name || ""),
  );

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
      <div className={css({ display: "flex", gap: "16px" })}>
        <Button color="danger" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button color="success" type="submit">
          Enregistrer
        </Button>
      </div>
      {!homePage && (
        <FormInput
          register={register("name", {
            onChange: (e) =>
              !isUsingCustomRoute &&
              setValue("route", generateRouteFromName(e.currentTarget.value)),
          })}
          errorMessage={errors?.name?.message?.toString()}
          width="medium"
        >
          Nom de la page
        </FormInput>
      )}
      {!homePage && (
        <>
          <FormInput
            register={register("route")}
            errorMessage={errors?.route?.message?.toString()}
            width="medium"
            isPath={true}
            disabled={!isUsingCustomRoute}
          >
            Chemin d&apos;accès
          </FormInput>
          <FormCheckbox
            checked={isUsingCustomRoute}
            onChange={(e) => {
              setIsUsingCustomRoute(e.currentTarget.checked);
              if (!e.currentTarget.checked)
                setValue("route", generateRouteFromName(getValues("name")));
            }}
          >
            Chemin d&apos;accès personnalisé
          </FormCheckbox>
        </>
      )}
      {homePage && (
        <AddButton
          onClick={() =>
            setValue("components", [
              getNewComponent("ContentPanel"),
              ...getValues("components"),
            ])
          }
        />
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
      <AddButton
        onClick={() =>
          setValue("components", [
            ...getValues("components"),
            getNewComponent(homePage ? "ContentPanel" : "Empty"),
          ])
        }
      />
      <Button color="success" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
}

export default PageForm;
