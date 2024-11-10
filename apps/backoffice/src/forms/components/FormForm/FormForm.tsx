import {
  FormClientData,
  formClientDataSchema,
  FormFieldType,
} from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import { css } from "../../../../styled-system/css";
import Button from "../../../global/components/atoms/Button/Button";
import { getLabelFromValue, getNewField } from "../../utils/form";
import DynamicContainer from "../../../global/components/organisms/DynamicContainer/DynamicContainer";
import { AddButton } from "../../../global/components/atoms/AddButton/AddButton";
import FormSelect from "../../../global/components/molecules/Form/FormSelect";
import ListInput from "../../../global/components/molecules/ListInput/ListInput";
import FormCodeArea from "../../../global/components/molecules/Form/FormCodeArea";

type FormFormProps = {
  initialData?: FormClientData;
  onSubmit: (data: FormClientData) => void;
  onCancel?: () => void;
  update?: boolean;
};

const defaultData: FormClientData = {
  name: "",
  fields: [],
};

const fieldTypeOptions = [
  { value: "EMAIL", label: getLabelFromValue("EMAIL") },
  { value: "NUMERIC", label: getLabelFromValue("NUMERIC") },
  { value: "SHORT_TEXT", label: getLabelFromValue("SHORT_TEXT") },
  { value: "TEXT_AREA", label: getLabelFromValue("TEXT_AREA") },
  { value: "MULTIPLE_CHOICES", label: getLabelFromValue("MULTIPLE_CHOICES") },
  { value: "UNIQUE_CHOICE", label: getLabelFromValue("UNIQUE_CHOICE") },
  { value: "PHONE", label: getLabelFromValue("PHONE") },
  { value: "GENDER", label: getLabelFromValue("GENDER") },
  { value: "DISPLAY_TEXT", label: getLabelFromValue("DISPLAY_TEXT") },
].sort((a, b) => a.label.localeCompare(b.label)) as {
  value: FormFieldType;
  label: string;
}[];

function FormForm({ initialData, onSubmit, onCancel, update }: FormFormProps) {
  const { register, control, handleSubmit, watch } = useForm<FormClientData>({
    resolver: zodResolver(formClientDataSchema),
    defaultValues: initialData || defaultData,
  });
  const { fields, append, prepend, move, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const onSubmitData = (data: FormClientData) => {
    const clearedFields = data.fields.filter(
      (field) => field.content.length > 0,
    );
    const clearedChoices = clearedFields.map((field) => {
      const clearedField = { ...field };
      if (field.type !== "UNIQUE_CHOICE" && field.type !== "MULTIPLE_CHOICES") {
        clearedField.choices = undefined;
      } else {
        clearedField.choices = clearedField.choices?.filter(
          (choice) => choice.length !== 0,
        );
      }
      return clearedField;
    });

    onSubmit({ ...data, fields: clearedChoices });
  };

  const watchFields = watch("fields");

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

      {fields.length !== 0 && (
        <AddButton onClick={() => prepend(getNewField())} />
      )}
      {fields.map((field, index) => (
        <DynamicContainer
          key={field.id}
          onDelete={() => remove(index)}
          onMoveUp={index !== 0 ? () => move(index, index - 1) : undefined}
          onMoveDown={
            index !== fields.length - 1
              ? () => move(index, index + 1)
              : undefined
          }
        >
          <FormSelect
            {...register(`fields.${index}.type`)}
            options={fieldTypeOptions}
            inputSize="small"
          >
            Type
          </FormSelect>
          {watchFields[index].type === "DISPLAY_TEXT" ? (
            <Controller
              control={control}
              name={`fields.${index}.content`}
              render={({ field: renderField }) => (
                <FormCodeArea {...renderField}>Texte à afficher</FormCodeArea>
              )}
            />
          ) : (
            <FormInput register={register(`fields.${index}.content`)}>
              Champ
            </FormInput>
          )}
          {(watchFields[index].type === "UNIQUE_CHOICE" ||
            watchFields[index].type === "MULTIPLE_CHOICES") && (
            <Controller
              control={control}
              name={`fields.${index}.choices`}
              render={({ field: renderField }) => (
                <ListInput {...renderField} label={"Réponses possibles"} />
              )}
            />
          )}
          {watchFields[index].type !== "DISPLAY_TEXT" && (
            <FormInput
              type="checkbox"
              register={register(`fields.${index}.isRequired`)}
            >
              Requis
            </FormInput>
          )}
        </DynamicContainer>
      ))}
      <AddButton onClick={() => append(getNewField())} />

      <Button color={update ? "blue" : "green"} type="submit">
        {update ? "Modifier" : "Créer"}
      </Button>
    </form>
  );
}

export default FormForm;
