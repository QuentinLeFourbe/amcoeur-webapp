import { UserClientData, UserPermission } from "@amcoeur/types";

/**
 * Checks if a user has at least one of the required permissions.
 */
export const checkUserPermissions = (
  user: UserClientData | undefined,
  permissions: UserPermission[],
) => {
  if (!user) {
    return false;
  }

  // If no specific permissions are required, user is authorized (unless checked elsewhere)
  if (permissions.length === 0) {
    return true;
  }

  // Return true if user has AT LEAST ONE of the requested permissions
  return permissions.some((requiredPerm) => 
    user.permissions.includes(requiredPerm)
  );
};
