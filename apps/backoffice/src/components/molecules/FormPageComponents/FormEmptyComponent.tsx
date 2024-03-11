import { PageComponentType } from "@amcoeur/types";
import Select from "../../atoms/Select/Select";
import { css } from "../../../../styled-system/css";

type FormEmptyComponentProps = {
  onChange: (type: PageComponentType) => void;
};
const options = [
  { label: "Image", value: "Image" },
  { label: "Zone de texte", value: "TextArea" },
  { label: "Bannière titre", value: "TitleBanner" },
  { label: "Panneau", value: "ContentPanel" },
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
