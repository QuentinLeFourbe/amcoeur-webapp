import { PageComponentType } from "@amcoeur/types";
import Select from "../../../global/components/atoms/Select/Select";
import { css } from "../../../../styled-system/css";

type FormEmptyComponentProps = {
  onChange: (type: PageComponentType) => void;
};
const options: { label: string; value: PageComponentType }[] = [
  { label: "Image", value: "Image" },
  { label: "Zone de texte", value: "TextArea" },
  { label: "Bannière titre", value: "TitleBanner" },
  { label: "Panneau", value: "ContentPanel" },
  { label: "Formulaire", value: "Form" },
];

function FormEmptyComponent({ onChange }: FormEmptyComponentProps) {
  return (
    <div className={container}>
      <Select
        options={options}
        onChange={(value) => onChange(value as PageComponentType)}
        className={selectStyle}
        placeholder="Type de composant..."
      />
    </div>
  );
}

export default FormEmptyComponent;

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
});

const selectStyle = css({
  width: "200px",
  zIndex: "10",
});
