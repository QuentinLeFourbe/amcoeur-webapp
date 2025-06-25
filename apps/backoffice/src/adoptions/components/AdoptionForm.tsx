import { AdoptionClientData, adoptionClientDataSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
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
  // Utilisation de useForm avec la validation par Zod
  const { register, handleSubmit } = useForm<AdoptionClientData>({
    resolver: zodResolver(adoptionClientDataSchema),
    defaultValues: initialData || {
      name: "",
      species: "CAT",
      gender: "MALE", // valeur par défaut pour gender
      visible: true,
      archived: false,
    },
  });

  const submitData = (data: AdoptionClientData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className={css({
        display: "flex",
        gap: "10px",
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

      <FormTextArea {...register("description")}>Description</FormTextArea>

      <FormInput {...register("imageUrl")}>URL de l'image</FormInput>

      <FormInput type="checkbox" {...register("visible")}>
        Visible à l'adoption
      </FormInput>

      <FormTextArea {...register("commentary")}>Commentaire</FormTextArea>

      <div className={css({ display: "flex", gap: "16px" })}>
        <Button color="red" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button color="green" type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
