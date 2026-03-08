import type { UserPermission, UserServerData } from "@amcoeur/types";

/**
 * Checks if a user has at least one of the required permissions.
 */
export const checkUserPermissions = (
  user: UserServerData | undefined,
  permissions: UserPermission[],
) => {
  if (!user) {
    return false;
  }

  if (permissions.length === 0) {
    return true;
  }

  return permissions.some((requiredPerm) => 
    user.permissions.includes(requiredPerm)
  );
};
