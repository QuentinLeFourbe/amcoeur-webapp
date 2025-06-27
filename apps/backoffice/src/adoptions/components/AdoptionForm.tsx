import { AdoptionClientData, adoptionClientDataSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import FormCodeArea from "../../global/components/molecules/Form/FormCodeArea";
import FormInput from "../../global/components/molecules/Form/FormInput";
import FormSelect from "../../global/components/molecules/Form/FormSelect";

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
    defaultValues: initialData || {
      name: "",
      species: "CAT",
      gender: "MALE",
      visible: true,
      archived: false,
    },
  });

  const submitData = (data: AdoptionClientData) => {
    onSubmit(data);
  };

  console.log({ errors });

  return (
    <form
      onSubmit={handleSubmit(submitData)}
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
        name={`commentary`}
        render={({ field: renderField }) => (
          <FormCodeArea {...renderField}>
            Description de l'adoption
          </FormCodeArea>
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
