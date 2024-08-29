import jwt, { type JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const MICROSOFT_JWKS_URI =
  "https://login.microsoftonline.com/consumers/discovery/v2.0/keys";
const EXPECTED_AUDIENCE = process.env.MS_CLIENT_ID;

const getSigningKey = async (kid: string) => {
  const client = jwksClient({
    jwksUri: MICROSOFT_JWKS_URI,
  });

  const key = await client.getSigningKey(kid);
  return key.getPublicKey();
};

export const validateToken = async (
  token: string,
): Promise<JwtPayload | string> => {
  // Décoder le token sans le vérifier pour obtenir l'en-tête
  const decodedToken = jwt.decode(token, { complete: true });

  if (
    !decodedToken ||
    typeof decodedToken === "string" ||
    !decodedToken.header.kid
  ) {
    throw new Error("Token invalide");
  }

  const kid = decodedToken.header.kid;
  // Récupérer la clé publique à partir du JWKS
  const publicKey = await getSigningKey(kid);
  // Valider et vérifier le token
  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"], // S'assurer que l'algorithme est RS256
    audience: EXPECTED_AUDIENCE, // Vérifier le champ `aud`
  });
};
