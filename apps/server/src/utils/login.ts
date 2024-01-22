const blockedUsers = new Map();

export const isUserBlocked = (username: string) => {
  if (blockedUsers.has(username)) {
    const { attempts, lastAttemptTime } = blockedUsers.get(username);
    const currentTime = Date.now();

    return attempts >= 3 && currentTime - lastAttemptTime < 180000;
  }
  return false;
};

export const addUserToBlockedUsers = (username: string) => {
  if (blockedUsers.has(username)) {
    const { attempts } = blockedUsers.get(username);
    blockedUsers.set(username, {
      attempts: attempts + 1,
      lastAttemptTime: Date.now(),
    });
  } else {
    blockedUsers.set(username, {
      attempts: 1,
      lastAttemptTime: Date.now(),
    });
  }
};
