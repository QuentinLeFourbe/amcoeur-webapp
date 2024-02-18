export type User = {
  username: string;
  hash: string | null | undefined;
  salt: string | null | undefined;
};

export type UserMethods = {
  setPassword: (password: string) => void;
  validPassword: (password: string) => boolean;
};
