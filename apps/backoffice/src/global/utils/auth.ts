import * as client from "openid-client";
import { redirect } from "react-router-dom";

const microsoftEndpoint = "https://login.microsoftonline.com/common/v2.0";

/**
 * Récupère la configuration OpenID Connect pour une URL de service et un client ID donnés.
 *
 * @param params - Les paramètres de configuration.
 * @param params.servUrl - L'URL du service pour la découverte OpenID Connect.
 * @param params.clientId - L'identifiant client de l'application.
 * @param params.clientSecret - (Optionnel) Le secret client de l'application.
 * @returns Une promesse qui résout la configuration OpenID Connect.
 */
const getConfig = async ({
  servUrl,
  clientId,
  clientSecret,
}: {
  servUrl: URL;
  clientId: string;
  clientSecret?: string | undefined;
}) => {
  return await client.discovery(servUrl, clientId, clientSecret);
};

/**
 * Récupère le code vérificateur depuis le stockage de session. Le code vérificateur est supprimé du stockage après sa récupération.
 *
 * @returns Le code vérificateur s'il est disponible, ou null s'il est introuvable.
 */
const getCodeVerifier = () => {
  const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
  sessionStorage.removeItem("pkce_code_verifier");
  return codeVerifier;
};

/**
 * Génère les paramètres PKCE, y compris un code vérificateur et un code challenge.
 * Stocke le code vérificateur dans le stockage de session pour une utilisation ultérieure.
 *
 * @param redirectUri - L'URI de redirection de l'application.
 * @returns Une promesse qui résout un objet contenant les paramètres PKCE nécessaires.
 */
const generateParameters = async (redirectUri: string) => {
  const codeVerifier = client.randomPKCECodeVerifier();
  sessionStorage.setItem("pkce_code_verifier", codeVerifier);
  const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);
  return {
    redirect_uri: redirectUri,
    scope: "openid profile email",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  };
};

/**
 * Construit l'URL de connexion Google avec les paramètres OpenID Connect et PKCE nécessaires.
 *
 * @param params - Les paramètres de la fonction.
 * @param params.redirectUri - L'URI de redirection de l'application.
 * @param params.clientId - L'identifiant client de l'application.
 * @returns Une promesse qui résout l'URL de connexion Google.
 */
export const getMicrosoftLoginUrl = async ({
  redirectUri,
  clientId,
}: {
  redirectUri: string;
  clientId: string;
}) => {
  const parameters = await generateParameters(redirectUri);
  const config = await getConfig({
    servUrl: new URL(microsoftEndpoint),
    clientId,
  });
  return client.buildAuthorizationUrl(config, parameters);
};

/**
 * Échange un code d'autorisation OpenID Connect contre un jeton d'identité (idToken).
 *
 * Cette méthode utilise le flux PKCE pour échanger un code d'autorisation fourni dans l'URL actuelle
 * contre un idToken, qui est ensuite stocké dans le sessionStorage pour une utilisation ultérieure.
 *
 * @param params - Les paramètres nécessaires pour l'échange.
 * @param params.currentUrl - L'URL actuelle contenant le code d'autorisation.
 * @param params.clientId - L'identifiant client enregistré pour l'application.
 * @param params.clientSecret - Le secret client associé (obligatoire pour les clients non publics).
 * @returns Une promesse résolvant le jeton d'identité (idToken).
 */
export const getAndStoreMicrosoftToken = async ({
  currentUrl,
  clientId,
}: {
  currentUrl: string;
  clientId: string;
}) => {
  const codeVerifier = getCodeVerifier() || "";

  const config = await getConfig({
    servUrl: new URL(microsoftEndpoint),
    clientId,
  });

  const tokenResponse = await client.authorizationCodeGrant(
    config,
    new URL(currentUrl),
    {
      pkceCodeVerifier: codeVerifier,
    },
  );

  const idToken = tokenResponse.id_token as string;
  sessionStorage.setItem("access_token", idToken);

  return idToken;
};

/**
 * Récupère le jeton d'accès stocké dans le sessionStorage.
 *
 * @returns Le jeton d'accès s'il est disponible, ou null s'il est introuvable.
 */
export const getTokenFromSessionStorage = () =>
  sessionStorage.getItem("access_token");

/**
 * Supprime le jeton d'accès stocké dans le sessionStorage.
 */
export const removeTokenFromSessionStorage = () =>
  sessionStorage.removeItem("access_token");

export const userNotAuthedLoader = async () => {
  const token = getTokenFromSessionStorage();
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const userAuthedLoader = async () => {
  const token = getTokenFromSessionStorage();
  if (token) {
    return redirect("/");
  }
  return null;
};
