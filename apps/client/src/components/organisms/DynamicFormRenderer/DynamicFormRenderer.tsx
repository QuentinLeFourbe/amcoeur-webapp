import {
  FormAnswersClient,
  FormClientData,
  FormComponent,
} from "@amcoeur/types";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Markdown from "markdown-to-jsx";
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
import Captcha from "../../atoms/Captcha/Captcha";
import TextContainer from "../../atoms/TextContainer/TextContainer";

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

type DynamicFormWithCaptcha = FormAnswersClient & {
  token: string;
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
    control,
    formState: { errors },
    reset,
  } = useForm<DynamicFormWithCaptcha>({
    defaultValues: {
      formId: data._id,
      answers: [],
    },
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const submitData = (data: FormAnswersClient) => {
    onSubmit(data);
    reset();
    recaptchaRef?.current?.reset();
    fillFieldsValues();
  };

  const fillFieldsValues = () => {
    data.fields.map((field, index) => {
      if (field.type !== "DISPLAY_TEXT") {
        setValue(`answers.${index}.field`, field.content);
      }
    });
  };

  useEffect(() => {
    fillFieldsValues();
  }, []);

  useEffect(() => {
    register("token", {
      required: {
        value: true,
        message: "Vous devez cocher cette case pour continuer",
      },
    });
  }, [register]);

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
                key={index}
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
                key={index}
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
                key={index}
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
                key={index}
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
                key={index}
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
                key={index}
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
                key={index}
              >
                {field.content}
              </FormSelect>
            );
          case "MULTIPLE_CHOICES":
            return (
              <Controller
                key={index}
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
          case "DISPLAY_TEXT":
            return (
              <TextContainer key={index}>
                <Markdown>{field.content}</Markdown>
              </TextContainer>
            );
        }
      })}

      <Captcha
        ref={recaptchaRef}
        setFormValue={(value: string): void => setValue("token", value)}
        errorMessage={errors?.token?.message?.toString()}
      />
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
