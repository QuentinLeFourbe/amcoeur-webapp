import jwt, { type JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const MICROSOFT_JWKS_URI =
  "https://login.microsoftonline.com/consumers/discovery/v2.0/keys";
const MS_EXPECTED_AUDIENCE = process.env.MS_CLIENT_ID;

const GOOGLE_JWKS_URI = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_EXPECTED_AUDIENCE = process.env.GOOGLE_CLIENT_ID;

const getMicrosoftSigningKey = async (kid: string) => {
  const client = jwksClient({
    jwksUri: MICROSOFT_JWKS_URI,
  });

  const key = await client.getSigningKey(kid);
  return key.getPublicKey();
};

/**
 * Récupère la clé publique pour vérifier un JWT.
 * @param kid - ID de la clé dans le header du JWT
 */
const getGoogleSigningKey = async (kid: string) => {
  const client = jwksClient({
    jwksUri: GOOGLE_JWKS_URI,
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
  const iss = (decodedToken.payload as JwtPayload).iss;

  let publicKey = "";
  if (iss?.includes("google")) {
    publicKey = await getGoogleSigningKey(kid);
    return jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
      audience: GOOGLE_EXPECTED_AUDIENCE,
    });
  } else if (iss?.includes("microsoft")) {
    publicKey = await getMicrosoftSigningKey(kid);
    return jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
      audience: MS_EXPECTED_AUDIENCE,
    });
  }

  throw new Error("Issuer not valid for token validation");
};
