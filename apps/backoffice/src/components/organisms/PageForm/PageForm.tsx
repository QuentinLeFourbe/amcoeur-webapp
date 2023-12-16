import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PageData } from "@amcoeur/types";
import Form from "../../atoms/Form/Form";
import FormInput from "../../molecules/Form/FormInput";
import { pageDataSchema } from "../../../schemas/page";
import FormTextArea from "../../molecules/Form/FormTextArea";
import Button from "../../atoms/Button/Button";

type PageFormProps = {
  data?: PageData;
  onSubmit?: (data: PageData) => void;
};

function PageForm({ data, onSubmit }: PageFormProps = {}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PageData>({
    resolver: yupResolver(pageDataSchema),
    defaultValues: data,
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
      <FormTextArea
        register={register("content")}
        errorMessage={errors?.content?.message?.toString()}
        width="medium"
      >
        Contenu:
      </FormTextArea>
      <Button type="submit">Enregistrer</Button>
    </Form>
  );
}

export default PageForm;
