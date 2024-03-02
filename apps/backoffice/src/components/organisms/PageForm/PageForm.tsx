import { zodResolver} from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PageDataClientSchema} from "@amcoeur/types";
import type { PageDataClient } from "@amcoeur/types";
import Form from "../../atoms/Form/Form";
import FormInput from "../../molecules/Form/FormInput";
import Button from "../../atoms/Button/Button";
import ComponentsFieldsRenderer from "../../molecules/FormPageComponents/ComponentsFieldsRenderer";

type PageFormProps = {
  data?: PageDataClient;
  onSubmit?: (data: PageDataClient) => void;
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

function PageForm({ data, onSubmit }: PageFormProps = {}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<PageDataClient>({
    resolver: zodResolver(PageDataClientSchema),
    defaultValues: data || defaultData,
  });
  const onSubmitData = (data: PageDataClient) => {
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
    <Form onSubmit={handleSubmit(onSubmitData)} encType="multipart/form-data">
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
        isPath={true}
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
          <ComponentsFieldsRenderer {...field} errors={errors?.components} />
        )}
      />
      <Button type="submit">Enregistrer</Button>
    </Form>
  );
}

export default PageForm;
