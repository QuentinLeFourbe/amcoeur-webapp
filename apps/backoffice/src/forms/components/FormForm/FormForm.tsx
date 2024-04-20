import {
  FormClientData,
  FormClientDataSchema,
  QuestionClientData,
} from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import { css } from "../../../../styled-system/css";
import FormBlocks from "../FormBlocks/FormBlocks";
import Button from "../../../global/components/atoms/Button/Button";
import { removeEmptyQuestions } from "../../utils/form";

type FormFormProps = {
  initialData?: FormClientData;
  onSubmit: (data: FormClientData) => void;
  onCancel?: () => void;
  update?: boolean;
  questionsData: QuestionClientData[];
};

const defaultData: FormClientData = {
  name: "",
  blocks: [],
};

function FormForm({
  initialData,
  onSubmit,
  onCancel,
  update,
  questionsData,
}: FormFormProps) {
  const { register, control, handleSubmit } = useForm<FormClientData>({
    resolver: zodResolver(FormClientDataSchema),
    defaultValues: initialData || defaultData,
  });

  const onSubmitData = (data: FormClientData) => {
    const dataWithEmptyQuestionsRemoved = removeEmptyQuestions(data);
    onSubmit(dataWithEmptyQuestionsRemoved);
  };

  return (
    <form
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        gap: "16px",
      })}
      onSubmit={handleSubmit(onSubmitData)}
    >
      <div className={css({ display: "flex", gap: "16px" })}>
        <Button color="red" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button color={update ? "blue" : "green"} type="submit">
          {update ? "Modifier" : "Créer"}
        </Button>
      </div>
      <FormInput register={register("name")}>Nom</FormInput>
      <Controller
        control={control}
        name="blocks"
        render={({ field }) => (
          <FormBlocks {...field} questionsData={questionsData} />
        )}
      />
      <Button color={update ? "blue" : "green"} type="submit">
        {update ? "Modifier" : "Créer"}
      </Button>
    </form>
  );
}

export default FormForm;
