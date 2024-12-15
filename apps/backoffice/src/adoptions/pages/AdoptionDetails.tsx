import { useGetAdoption } from "../hooks/useAdoptions";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AdoptionForm from "../components/AdoptionForm";
import { useUpdateAdoption } from "../hooks/useAdoptions";

function AdoptionDetails() {
  const params = useParams(); // Récupère l'ID dans l'URL
  const navigate = useNavigate();
  const id = params.id || "";
  const { data: adoptionData, isLoading, isError } = useGetAdoption(id);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateAdoption, isError: isUpdateError } =
    useUpdateAdoption();

  const handleEdit = (updatedData: any) => {
    updateAdoption(updatedData);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className={editContainer}>
          <AdoptionForm
            initialData={adoptionData?.data}
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className={container}>
          <div className={buttonContainer}>
            <Button onClick={() => navigate("/adoptions")}>Retour</Button>
            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
          </div>

          {isUpdateError && (
            <ErrorLabel>
              Une erreur est survenue lors de la mise à jour de l'adoption.
            </ErrorLabel>
          )}

          {isLoading && <p>Chargement des données...</p>}
          {isError && (
            <ErrorLabel>
              Une erreur est survenue lors de la récupération des données.
            </ErrorLabel>
          )}

          {adoptionData && (
            <div className={detailsContainer}>
              <h2>Détails de l'adoption</h2>
              <div>
                <label className={property}>Nom :</label>
                <span>{adoptionData.data.name}</span>
              </div>
              <div>
                <label className={property}>Espèce :</label>
                <span>{adoptionData.data.species}</span>
              </div>
              <div>
                <label className={property}>Race :</label>
                <span>{adoptionData.data.race || "Non renseignée"}</span>
              </div>
              <div>
                <label className={property}>Genre :</label>
                <span>
                  {adoptionData.data.gender === "MALE" ? "Mâle" : "Femelle"}
                </span>
              </div>
              <div>
                <label className={property}>Lien de l'image :</label>
                <span>{adoptionData.data.imageUrl || "Non renseigné"}</span>
              </div>
              <div>
                <label className={property}>Visible :</label>
                <span>{adoptionData.data.visible ? "Oui" : "Non"}</span>
              </div>
              <div>
                <label className={property}>Description :</label>
                <p>
                  {adoptionData.data.description ||
                    "Aucune description disponible"}
                </p>
              </div>
              <div>
                <label className={property}>Commentaire :</label>
                <p>
                  {adoptionData.data.commentary ||
                    "Aucun commentaire disponible"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdoptionDetails;
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

const detailsContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
