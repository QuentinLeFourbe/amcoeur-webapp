import { User, UserClientData,UserPermission, UserRole } from "@amcoeur/types";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import Table from "../../global/components/atoms/Table/Table";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";
import { checkUserPermissions } from "../../global/utils/user";
import { useActivateUser, useDeleteUser, useUpdateUser,useUsers } from "../hooks/useUsers";

const PERMISSIONS: { label: string; value: UserRole }[] = [
  { label: "Admin", value: UserRole.ADMIN },
  { label: "Éditeur Site", value: UserRole.WEBSITE_EDITOR },
  { label: "Gest. Adoptions", value: UserRole.ADOPTION_MANAGER },
  { label: "Gest. Contacts", value: UserRole.CONTACT_MANAGER },
  { label: "Gest. Emailing", value: UserRole.EMAILING_MANAGER },
];

function ManageUsers() {
  const {
    data: { data: users } = {},
    isSuccess,
    isLoading,
    isError,
  } = useUsers();

  const { mutate: deleteUser, isLoading: isDeleteLoading } = useDeleteUser();
  const { mutate: activateUser } = useActivateUser();
  const { mutate: updateUser } = useUpdateUser();

  const handleTogglePermission = (user: User, permission: UserPermission) => {
    const currentPermissions = user.permissions || [];
    let newPermissions: UserPermission[];

    if (currentPermissions.includes(permission)) {
      newPermissions = currentPermissions.filter((p) => p !== permission);
    } else {
      newPermissions = [...currentPermissions, permission];
    }

    updateUser({ ...user, permissions: newPermissions } as UserClientData);
  };

  const handleToggleActive = (user: User, currentActive: boolean) => {
    activateUser({
      user: user as UserClientData,
      active: !currentActive,
    });
  };

  return (
    <div className={containerStyle}>
      <h1 className={titleStyle}>Gestion des Utilisateurs</h1>

      {isError && <ErrorLabel>Erreur lors du chargement des utilisateurs</ErrorLabel>}

      {isLoading || isDeleteLoading ? (
        <div className={centerStyle}><Spinner /></div>
      ) : (
        isSuccess && (
          <Table>
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Permissions détaillées</th>
                <th>Statut</th>
                <th className={css({ textAlign: "right" })}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                const isActive = !checkUserPermissions(user, [UserRole.INACTIVE]);
                
                return (
                  <tr key={user._id}>
                    <td>
                      <div className={css({ fontWeight: "bold", color: "white" })}>{user.fullname}</div>
                      <div className={css({ fontSize: "xs", color: "amcoeurPale" })}>{user.email}</div>
                    </td>
                    <td>
                      <div className={permissionsGridStyle}>
                        {PERMISSIONS.map((perm) => (
                          <FormCheckbox
                            key={perm.value}
                            checked={user.permissions.includes(perm.value)}
                            onChange={() => handleTogglePermission(user, perm.value)}
                            className={css({ fontSize: "xs!" })}
                          >
                            {perm.label}
                          </FormCheckbox>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div 
                        className={isActive ? activeStatusStyle : inactiveStatusStyle}
                        onClick={() => handleToggleActive(user, isActive)}
                      >
                        {isActive ? "Actif" : "Inactif"}
                      </div>
                    </td>
                    <td>
                      <div className={css({ display: "flex", justifyContent: "flex-end", gap: "0.75rem" })}>
                        <Button 
                          color={isActive ? "secondary" : "success"} 
                          onClick={() => handleToggleActive(user, isActive)}
                        >
                          {isActive ? "Désactiver" : "Activer"}
                        </Button>
                        <Button 
                          color="danger" 
                          onClick={() => window.confirm(`Supprimer ${user.fullname} ?`) && deleteUser(user._id || "")}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )
      )}
    </div>
  );
}

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  maxWidth: "1400px",
  margin: "0 auto",
});

const titleStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "white",
});

const centerStyle = css({
  display: "flex",
  justifyContent: "center",
  padding: "4rem",
});

const permissionsGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "0.5rem",
  padding: "0.5rem 0",
});

const statusBaseStyle = {
  fontSize: "xs",
  fontWeight: "bold",
  padding: "4px 12px",
  borderRadius: "full",
  width: "fit-content",
  cursor: "pointer",
  transition: "all 0.2s",
};

const activeStatusStyle = css({
  ...statusBaseStyle,
  backgroundColor: "rgba(16, 185, 129, 0.1)",
  color: "#10b981",
  border: "1px solid rgba(16, 185, 129, 0.2)",
  "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.2)" }
});

const inactiveStatusStyle = css({
  ...statusBaseStyle,
  backgroundColor: "rgba(239, 68, 68, 0.1)",
  color: "#ef4444",
  border: "1px solid rgba(239, 68, 68, 0.2)",
  "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.2)" }
});

export default ManageUsers;
