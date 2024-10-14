import { useParams } from "react-router-dom";
import { useAdoption } from "../hooks/useAdoptions";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Loader from "../../global/components/atoms/Loader/Loader";
import { css } from "../../../styled-system/css";
import ImageContainer from "../../global/components/atoms/ImageContainer/ImageContainer";
import Label from "../../global/components/atoms/Label/Label";
import Button from "../../global/components/atoms/Button/Button";

function AdoptionDetail() {
  const params = useParams();
  const id = params.id || "";
  const {
    data: { data: adoptionData } = {},
    isError,
    isSuccess,
    isLoading,
  } = useAdoption(id);

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        gap: "64px",
        margin: "5vh 20vw",
      })}
    >
      {isError && (
        <ErrorLabel>
          Une erreur s&apos;est produite lors du chargement
        </ErrorLabel>
      )}

      {isLoading && (
        <div className={css({ margin: "auto" })}>
          <Loader />
        </div>
      )}
      {isSuccess && (
        <>
          <div
            className={css({
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              width: "80%",
            })}
          >
            <h1 className={css({ fontSize: "64px", fontFamily: "dancing" })}>
              {adoptionData?.name}
            </h1>
            <ImageContainer size="small" src={adoptionData?.imageUrl || ""} />
          </div>
          <div className={css({ width: "300px" })}>
            <div className={dataStyle}>
              <Label>Nom: </Label>
              {adoptionData?.name}
            </div>
            <div className={dataStyle}>
              <Label>Sexe: </Label>
              {adoptionData?.gender}
            </div>
            <div className={dataStyle}>
              <Label>Espèce: </Label>
              {adoptionData?.species}
            </div>
            <div className={dataStyle}>
              <Label>Race: </Label>
              {adoptionData?.race}
            </div>
            <div className={dataStyle}>
              <Label>Date de naissance: </Label>
              {adoptionData?.birthday?.toLocaleDateString()}
            </div>
          </div>
          <div>{adoptionData?.description}</div>
          <Button>Nous contacter</Button>
        </>
      )}
    </div>
  );
}

export default AdoptionDetail;

const dataStyle = css({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  "& label": {
    fontWeight: "bold",
  },
});
