import FormInput from "../../global/components/molecules/Form/FormInput";
import FormTextArea from "../../global/components/molecules/Form/FormTextArea";
import FormSelect from "../../global/components/molecules/Form/FormSelect";
import { css } from "../../../styled-system/css";
export default function AdoptionForm() {
  return (
    <form
      className={css({
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      })}
    >
      <FormInput width="medium">Nom</FormInput>
      <FormSelect
        options={[
          { value: "CAT", label: "Chat" },
          { value: "DOG", label: "Chien" },
          { value: "HORSE", label: "Cheval" },
        ]}
      >
        Espèce
      </FormSelect>
      <FormInput width="medium">Race</FormInput>
      <FormSelect
        options={[
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Femelle" },
        ]}
      >
        Sexe
      </FormSelect>
      <FormTextArea>Description</FormTextArea>
      <FormInput width="medium">Url de l'image</FormInput>
      <FormInput width="medium" type="checkbox">
        Visible a l'adoption
      </FormInput>
      <FormTextArea>Commentaire</FormTextArea>
    </form>
    //useForm<AdoptionClientdata> => mettre les register via react hook form en m'inspirant de form form
    // utiliser usecreate adoption dans ma page create adoptions afin de récupéré la méthode mutate que je passerais en param de mon formulaire et cette méthode doit être récolté par les donné du formulaire dès qu'il est submit.
    // si ça marche => ça logeras en data.data mon get.
  );
}
