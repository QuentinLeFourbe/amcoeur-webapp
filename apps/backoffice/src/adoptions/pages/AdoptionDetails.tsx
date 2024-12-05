import { useGetAdoption } from "../hooks/useAdoptions";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import { useNavigate, useParams } from "react-router-dom";

function AdoptionDetails() {
  const params = useParams(); // Récupère l'ID dans l'URL
  const navigate = useNavigate();
  const id = params.id || "";
  const { data: adoptionData, isLoading, isError } = useGetAdoption(id);

  return (
    <div className={container}>
      <div className={buttonContainer}>
        <Button onClick={() => navigate("/adoptions")}>Retour</Button>
      </div>
      {isLoading && <p>Chargemnent des données...</p>}
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors de la récupération des données
        </ErrorLabel>
      )}
      {adoptionData && (
        <div>
          <h2>Détails de l'adoption</h2>
          <div>
            <label className={property}>Nom</label>
            <span>{adoptionData.data.name}</span>
          </div>
          <div>
            <label className={property}>Espece</label>
            <span>{adoptionData.data.species}</span>
          </div>
          <div>
            <label className={property}>Race</label>
            <span>{adoptionData.data.race}</span>
          </div>
          <div>
            <label className={property}>Genre</label>
            <span>{adoptionData.data.gender}</span>
          </div>
          <div>
            <label className={property}>Lien image</label>
            <span>{adoptionData.data.imageUrl}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});

const buttonContainer = css({
  display: "flex",
  gap: "32px",
});

const property = css({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginRight: "1rem",
});

const editContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  margin: "0 15vw 100px 15vw",
});

export default AdoptionDetails;
