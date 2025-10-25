import type { UserPermission, UserServerData } from "@amcoeur/types";

export const checkUserPermissions = (
  user: UserServerData | undefined,
  permissions: UserPermission[],
) => {
  if (!user) {
    return false;
  }
  const userHasPermissions = permissions.reduce((acc, currentPerm) => {
    if (acc === false) {
      return false;
    }
    return !!user.permissions.find((perm) => perm === currentPerm);
  }, true);
  return userHasPermissions;
};
