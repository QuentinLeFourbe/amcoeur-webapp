import { AdoptionClientData } from "@amcoeur/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Overlay from "../../global/components/atoms/Overlay/Overlay";
import AdoptionForm from "../components/AdoptionForm";
import { useDeleteAdoption, useGetAdoption } from "../hooks/useAdoptions";
import { useUpdateAdoption } from "../hooks/useAdoptions";

function AdoptionDetails() {
  const params = useParams(); // Récupère l'ID dans l'URL
  const navigate = useNavigate();
  const { t } = useTranslation();
  const id = params.id || "";
  const { data: adoptionData, isLoading, isError } = useGetAdoption(id);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deleteAdoption } = useDeleteAdoption({
    onSuccess: () => navigate("/adoptions"),
  });
  const {
    mutate: updateAdoption,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdateAdoption();

  const handleEdit = (updatedData: AdoptionClientData) => {
    updateAdoption(updatedData);
    setIsEditing(false);
  };

  const isAdopted = !!adoptionData?.data.adopted;
  const isVisible = !!adoptionData?.data.visible;

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
            <Button color="info" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
            <Button onClick={() => setIsDeleting(true)} color="danger">
              Supprimer
            </Button>
            <Button
              color={isAdopted ? "danger" : "success"}
              disabled={isUpdateLoading}
              onClick={() =>
                updateAdoption({
                  ...adoptionData?.data,
                  adopted: !adoptionData?.data.adopted,
                } as AdoptionClientData)
              }
            >
              Marquer comme {isAdopted ? "non" : ""} adopté
            </Button>
            <Button
              color={"info"}
              disabled={isUpdateLoading}
              onClick={() =>
                updateAdoption({
                  ...adoptionData?.data,
                  visible: !adoptionData?.data.visible,
                } as AdoptionClientData)
              }
            >
              Rendre {isVisible ? "non" : ""} visible à l'adoption
            </Button>
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
                <span>{t(`adoptions.${adoptionData.data.species}`)}</span>
              </div>
              <div>
                <label className={property}>Race :</label>
                <span>{adoptionData.data.race || "Non renseignée"}</span>
              </div>
              <div>
                <label className={property}>Genre :</label>
                <span>{t(`adoptions.${adoptionData.data.gender}`)}</span>
              </div>
              <div>
                <label className={property}>Photo :</label>
                <img
                  src={adoptionData.data.imageUrl}
                  className={css({ maxWidth: "200px", maxHeight: "200px" })}
                />
              </div>
              <div>
                <label className={property}>Visible :</label>
                <span>{adoptionData.data.visible ? "Oui" : "Non"}</span>
              </div>
              <div>
                <label className={property}>Adopté :</label>
                <span>{adoptionData.data.adopted ? "Oui" : "Non"}</span>
              </div>
              <div>
                <label className={property}>Urgence :</label>
                <span>{adoptionData.data.emergency ? "Oui" : "Non"}</span>
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

      <Overlay isVisible={isDeleting} onClose={() => setIsDeleting(false)}>
        <p>
          Vous êtes sur le point de supprimer l'adoption de{" "}
          {adoptionData?.data.name}, êtes vous sûr ?
        </p>
        <div className={css({ display: "flex", gap: "1rem" })}>
          <Button
            color="danger"
            onClick={() =>
              adoptionData?.data._id && deleteAdoption(adoptionData?.data._id)
            }
          >
            Supprimer
          </Button>
          <Button color="secondary" onClick={() => setIsDeleting(false)}>
            Annuler
          </Button>
        </div>
      </Overlay>
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
