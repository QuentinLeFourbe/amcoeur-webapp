import { AdoptionClientData, CreateAdoptionDto,createAdoptionSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import FormCodeArea from "../../global/components/molecules/Form/FormCodeArea";
import FormInput from "../../global/components/molecules/Form/FormInput";
import FormSelect from "../../global/components/molecules/Form/FormSelect";
import FormTextArea from "../../global/components/molecules/Form/FormTextArea";

type AdoptionFormProps = {
  initialData?: AdoptionClientData;
  onSubmit: (data: CreateAdoptionDto) => void;
  onCancel?: () => void;
};

export default function AdoptionForm({
  initialData,
  onSubmit,
  onCancel,
}: AdoptionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAdoptionDto>({
    resolver: zodResolver(createAdoptionSchema),
    defaultValues: {
      ...initialData,
      name: initialData?.name ?? "",
      species: initialData?.species ?? "CAT",
      gender: initialData?.gender ?? "MALE",
      adopted: initialData?.adopted ?? false,
      visible: initialData?.visible ?? false,
      emergency: initialData?.emergency ?? false,
    },
  });

  const submitData = (data: CreateAdoptionDto) => {
    onSubmit(data);
  };



  return (
    <form
      onSubmit={handleSubmit(submitData)}
      encType="multipart/form-data"
      className={css({
        display: "flex",
        gap: "32px",
        flexDirection: "column",
      })}
    >
      <FormInput {...register("name")} errorMessage={errors.name?.message}>Nom</FormInput>

      <Controller
        control={control}
        name="species"
        render={({ field: { onChange, value, onBlur } }) => (
          <FormSelect
            options={[
              { value: "CAT", label: "Chat" },
              { value: "DOG", label: "Chien" },
              { value: "HORSE", label: "Cheval" },
              { value: "OTHER", label: "Autre" },
            ]}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            errorMessage={errors.species?.message}
          >
            Espèce
          </FormSelect>
        )}
      />

      <FormInput {...register("race")} errorMessage={errors.race?.message}>Race</FormInput>

      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value, onBlur } }) => (
          <FormSelect
            options={[
              { value: "MALE", label: "Mâle" },
              { value: "FEMALE", label: "Femelle" },
            ]}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            errorMessage={errors.gender?.message}
          >
            Genre
          </FormSelect>
        )}
      />

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, ...fields }, fieldState: { error } }) => (
          <FormInput
            {...fields}
            onChange={(e) => {
              onChange(e.target.files && e.target.files[0]);
            }}
            type="file"
            value={undefined}
            errorMessage={error?.message}
          >
            Photo
          </FormInput>
        )}
      />

      <FormInput type="checkbox" {...register("visible")}>
        Visible à l'adoption
      </FormInput>

      <FormInput type="checkbox" {...register("emergency")}>
        Adoption urgente
      </FormInput>

      <Controller
        control={control}
        name={`description`}
        render={({ field: renderField, fieldState: { error } }) => (
          <FormCodeArea {...renderField} errorMessage={error?.message}>
            Description de l'adoption
          </FormCodeArea>
        )}
      />

      <Controller
        control={control}
        name={`commentary`}
        render={({ field: renderField, fieldState: { error } }) => (
          <FormTextArea
            {...renderField}
            className={css({ width: "100%", maxWidth: "1200px", height: "300px" })}
            errorMessage={error?.message}
          >
            Commentaire
          </FormTextArea>
        )}
      />
      <div className={css({ display: "flex", gap: "16px" })}>
        <Button color="danger" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button color="success" type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
