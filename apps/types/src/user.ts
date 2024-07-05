export type User = {
  fullname: string;
  facebookId: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
};

export type UserClientData = Pick<User, "isAdmin" | "isActive" | "fullname">;

export type UserMethods = {
  setPassword: (password: string) => void;
  validPassword: (password: string) => boolean;
};
