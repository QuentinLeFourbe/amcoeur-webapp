import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { PageData } from "@amcoeur/types";
import Form from "../../atoms/Form/Form";
import FormInput from "../../molecules/Form/FormInput";
import { pageDataSchema } from "../../../schemas/page";
import Button from "../../atoms/Button/Button";
import FormPageComponentsInput from "../../molecules/FormPageComponents/FormPageComponentsInput";

type PageFormProps = {
  data?: PageData;
  onSubmit?: (data: PageData) => void;
};

const defaultData: PageData = {
  name: "",
  route: "",
  components: [
    {
      type: "TitleBanner",
      content: "",
      imageUrl: "",
    },
    {
      type: "TextArea",
      content: "",
    },
  ],
};

function PageForm({ data, onSubmit }: PageFormProps = {}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<PageData>({
    resolver: yupResolver(pageDataSchema),
    defaultValues: data || defaultData,
  });

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

  return (
    <Form onSubmit={handleSubmit(onSubmitData)}>
      <FormInput
        register={register("name")}
        errorMessage={errors?.name?.message?.toString()}
        width="medium"
      >
        Nom de la page
      </FormInput>
      <FormInput
        register={register("route")}
        errorMessage={errors?.route?.message?.toString()}
        width="medium"
      >
        Chemin d&apos;accès
      </FormInput>
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
          <FormPageComponentsInput {...field} />
        )}
      />

      <Button type="submit">Enregistrer</Button>
    </Form>
  );
}

export default PageForm;