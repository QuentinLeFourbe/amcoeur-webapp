import { AdoptionClientData, adoptionClientDataSchema } from "@amcoeur/types";
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
  onSubmit: (data: AdoptionClientData) => void;
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
  } = useForm<AdoptionClientData>({
    resolver: zodResolver(adoptionClientDataSchema),
    defaultValues: {
      ...initialData,
      name: initialData?.name ?? "",
      species: initialData?.species ?? "CAT",
      gender: initialData?.gender ?? "MALE",
      adopted: initialData?.adopted ?? false,
      visible: initialData?.visible ?? false,
      emergency: initialData?.visible ?? false,
    },
  });

  const submitData = (data: AdoptionClientData) => {
    onSubmit(data);
  };

  if (errors && Object.getOwnPropertyNames(errors).length)
    console.error({ errors });

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
      <FormInput {...register("name")}>Nom</FormInput>

      <FormSelect
        {...register("species")}
        options={[
          { value: "CAT", label: "Chat" },
          { value: "DOG", label: "Chien" },
          { value: "HORSE", label: "Cheval" },
          { value: "OTHER", label: "Autre" },
        ]}
      >
        Espèce
      </FormSelect>

      <FormInput {...register("race")}>Race</FormInput>

      <FormSelect
        {...register("gender")}
        options={[
          { value: "MALE", label: "Mâle" },
          { value: "FEMALE", label: "Femelle" },
        ]}
      >
        Genre
      </FormSelect>

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, ...fields } }) => (
          <FormInput
            {...fields}
            onChange={(e) => {
              onChange(e.target.files && e.target.files[0]);
            }}
            type="file"
            value={undefined}
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
        render={({ field: renderField }) => (
          <FormCodeArea {...renderField}>
            Description de l'adoption
          </FormCodeArea>
        )}
      />

      <Controller
        control={control}
        name={`commentary`}
        render={({ field: renderField }) => (
          <FormTextArea
            {...renderField}
            className={css({ width: "70vw", height: "300px" })}
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
