export type JWTToken = {
  oid: string;
  sub: string;
  iss: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  nbf: number;
};
