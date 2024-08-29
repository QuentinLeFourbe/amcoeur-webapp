import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";
import { checkUserPermissions } from "../../global/utils/user";
import { useActivateUser, useDeleteUser, useUsers } from "../hooks/useUsers";

function ManageUsers() {
  const {
    data: { data: users } = {},
    isSuccess,
    isLoading,
    isError,
  } = useUsers();

  const {
    mutate: deleteUser,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteUser();

  const { mutate: activateUser, isError: isActivateError } = useActivateUser();

  return (
    <div>
      {isError && (
        <ErrorLabel>Erreur lors du chargement des utilisateurs</ErrorLabel>
      )}
      {isLoading && <p>Chargement...</p>}
      {isDeleteSuccess && <p>Utilisateur supprimé avec succès</p>}
      {isDeleteLoading && <p>Suppression en cours...</p>}
      {isDeleteError && <ErrorLabel>Erreur lors de la suppression</ErrorLabel>}
      {isActivateError && (
        <ErrorLabel>
          Erreur lors du changement d&apos;activation de l&apos;utilisateur
        </ErrorLabel>
      )}
      {isSuccess && (
        <div
          className={css({
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            gap: "32px",
          })}
        >
          {users?.map((user, index) => (
            <div
              key={index}
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                minWidth: "500px",
                width: "60vw",
              })}
            >
              <p>{user.fullname}</p>
              <p>{user.email}</p>
              <FormCheckbox
                onClick={(e) =>
                  activateUser({
                    user,
                    active: e.currentTarget.checked,
                  })
                }
                checked={!checkUserPermissions(user, ["inactive"])}
              >
                Actif
              </FormCheckbox>
              <Button onClick={() => deleteUser(user._id || "")}>
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
