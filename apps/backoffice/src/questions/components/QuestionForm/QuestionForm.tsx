import { QuestionClientData, QuestionClientDataSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../global/components/atoms/Button/Button";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import FormTextArea from "../../../global/components/molecules/Form/FormTextArea";
import FormSelect from "../../../global/components/molecules/Form/FormSelect";
import { css } from "../../../../styled-system/css";
import { getLabelFromValue } from "../../utils/questions";

type QuestionFormProps = {
  initialData?: QuestionClientData;
  onSubmit: (data: QuestionClientData) => void;
  onCancel?: () => void;
  update?: boolean;
};

const questionTypes = [
  { value: "EMAIL", label: getLabelFromValue("EMAIL") },
  { value: "PHONE", label: getLabelFromValue("PHONE") },
  { value: "GENDER", label: getLabelFromValue("GENDER") },
  { value: "NUMERIC", label: getLabelFromValue("NUMERIC") },
  { value: "TEXT_AREA", label: getLabelFromValue("TEXT_AREA") },
  { value: "SHORT_TEXT", label: getLabelFromValue("SHORT_TEXT") },
  { value: "UNIQUE_CHOICE", label: getLabelFromValue("UNIQUE_CHOICE") },
  { value: "MULTIPLE_CHOICES", label: getLabelFromValue("MULTIPLE_CHOICES") },
];

function QuestionForm({
  initialData,
  onSubmit,
  onCancel,
  update,
}: QuestionFormProps) {
  const { register, handleSubmit, control } = useForm<QuestionClientData>({
    resolver: zodResolver(QuestionClientDataSchema),
    defaultValues: initialData,
  });

  const onSubmitData = (data: QuestionClientData) => {
    onSubmit(data);
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
      <Button color="red" type="button" onClick={onCancel}>
        Annuler
      </Button>
      <FormInput register={register("name")}>Nom</FormInput>
      <FormTextArea
        register={register("content")}
        className={css({ width: "100%" })}
        fixedSize
      >
        Contenu
      </FormTextArea>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <FormSelect {...field} options={questionTypes}>
            Type de question
          </FormSelect>
        )}
      />
      {update ? (
        <Button color="blue" type="submit">
          Modifier
        </Button>
      ) : (
        <Button color="green" type="submit">
          Créer
        </Button>
      )}
    </form>
  );
}

export default QuestionForm;
