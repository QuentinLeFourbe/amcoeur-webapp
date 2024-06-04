import {
  FormAnswersClient,
  FormClientData,
  FormComponent,
} from "@amcoeur/types";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useGetDynamicForm,
  useSubmitAnswers,
} from "../../../hooks/useDynamicForms";
import FormInput from "../../molecules/Form/FormInput";
import Form from "../../atoms/Form/Form";
import FormTextArea from "../../molecules/Form/FormTextArea";
import Button from "../../atoms/Button/Button";
import { css } from "../../../../styled-system/css";
import FormSelect from "../../molecules/Form/FormSelect";
import {
  fieldMaxLength,
  fieldRequired,
  getOptionsFromChoices,
} from "../../../utils/form";
import FormMultipleSelect from "../../molecules/Form/FormMultipleSelect";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";

type DynamicFormRendererProps = {
  component: FormComponent;
};

function DynamicFormRenderer({ component }: DynamicFormRendererProps) {
  const {
    data: { data: formData } = {},
    isLoading,
    isError,
    isSuccess,
  } = useGetDynamicForm(component.formId || "");

  const {
    mutate,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
  } = useSubmitAnswers();

  return (
    <div>
      {isLoading && <p>Chargement du formulaire...</p>}
      {isError && <p>Erreur lors du chargement du formulaire</p>}
      {isSuccess && formData !== undefined && (
        <DynamicForm
          data={formData}
          onSubmit={mutate}
          isSubmitSuccess={isMutateSuccess}
          isSubmitError={isMutateError}
        />
      )}
    </div>
  );
}

export default DynamicFormRenderer;

type DynamicFormProps = {
  data: FormClientData;
  onSubmit: (data: FormAnswersClient) => void;
  isSubmitSuccess: boolean;
  isSubmitError: boolean;
};
const DynamicForm = ({
  data,
  onSubmit,
  isSubmitError,
  isSubmitSuccess,
}: DynamicFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FormAnswersClient>({
    defaultValues: {
      formId: data._id,
      answers: [],
    },
  });

  const submitData = (data: FormAnswersClient) => {
    console.log("submitdata !!!!", data);
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    data.fields.map((field, index) => {
      setValue(`answers.${index}.field`, field.content);
    });
  }, []);

  console.log("answers", watch());
  console.log("errors", errors);
  console.log("fieeelds", data.fields);
  return (
    <Form column onSubmit={handleSubmit(submitData)}>
      {data.fields.map((field, index) => {
        switch (field.type) {
          case "SHORT_TEXT":
            return (
              <FormInput
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                  maxLength: fieldMaxLength(200),
                })}
                errorMessage={errors?.answers?.[index]?.value?.message}
              >
                {field.content}
              </FormInput>
            );
          case "EMAIL":
            return (
              <FormInput
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                })}
                type="email"
                errorMessage={errors?.answers?.[index]?.value?.message}
              >
                {field.content}
              </FormInput>
            );
          case "PHONE":
            return (
              <FormInput
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                })}
                type="tel"
                numeric={true}
                errorMessage={errors?.answers?.[index]?.value?.message}
              >
                {field.content}
              </FormInput>
            );
          case "GENDER":
            return (
              <FormSelect
                options={getOptionsFromChoices(["Monsieur", "Madame"])}
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                })}
                errorMessage={errors?.answers?.[index]?.value?.message}
              >
                {field.content}
              </FormSelect>
            );
          case "NUMERIC":
            return (
              <FormInput
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                })}
                errorMessage={errors?.answers?.[index]?.value?.message}
                type="number"
              >
                {field.content}
              </FormInput>
            );
          case "TEXT_AREA":
            return (
              <FormTextArea
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                  maxLength: fieldMaxLength(1000),
                })}
                errorMessage={errors?.answers?.[index]?.value?.message}
              >
                {field.content}
              </FormTextArea>
            );
          case "UNIQUE_CHOICE":
            return (
              <FormSelect
                options={getOptionsFromChoices(field.choices || [])}
                {...register(`answers.${index}.value`, {
                  required: fieldRequired(!!field.isRequired),
                })}
                errorMessage={errors?.answers?.[index]?.value?.message}
              >
                {field.content}
              </FormSelect>
            );
          case "MULTIPLE_CHOICES":
            return (
              <Controller
                control={control}
                rules={{ required: fieldRequired(!!field.isRequired) }}
                render={({ field: controllerField }) => (
                  <FormMultipleSelect
                    {...controllerField}
                    value={controllerField.value as string[]}
                    options={field.choices || []}
                    errorMessage={errors?.answers?.[index]?.value?.message}
                  >
                    {field.content}
                  </FormMultipleSelect>
                )}
                name={`answers.${index}.value`}
              />
            );
        }
      })}
      {isSubmitSuccess && (
        <p
          className={css({
            color: "green",
            fontSize: "0.8rem",
          })}
        >
          Le formulaire a bien été envoyé
        </p>
      )}
      {isSubmitError && (
        <ErrorLabel>
          Une erreur s&apos;est produite lors de l&apos;envoie du formulaire
        </ErrorLabel>
      )}
      <Button className={css({ alignSelf: "flex-end" })} type="submit">
        Envoyer
      </Button>
    </Form>
  );
};
