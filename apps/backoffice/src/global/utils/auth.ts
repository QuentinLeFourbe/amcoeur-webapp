import * as client from "openid-client";
import { redirect } from "react-router-dom";

const microsoftEndpoint = "https://login.microsoftonline.com/common/v2.0";
const googleEndpoint = "https://accounts.google.com";

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

const getProvider = () => {
  const provider = sessionStorage.getItem("provider");
  sessionStorage.removeItem("provider");
  return provider as "google" | "microsoft" | null;
};

/**
 * Génère les paramètres PKCE, y compris un code vérificateur et un code challenge.
 * Stocke le code vérificateur dans le stockage de session pour une utilisation ultérieure.
 *
 * @param redirectUri - L'URI de redirection de l'application.
 * @returns Une promesse qui résout un objet contenant les paramètres PKCE nécessaires.
 */
const generateParameters = async (
  redirectUri: string,
  provider: "google" | "microsoft",
) => {
  const codeVerifier = client.randomPKCECodeVerifier();
  sessionStorage.setItem("provider", provider);
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

 * Construit l'URL de connexion Google avec les param├¿tres OpenID Connect et PKCE n├⌐cessaires.
 *
 * @param params - Les param├¿tres de la fonction.
 * @param params.redirectUri - L'URI de redirection de l'application.
 * @param params.clientId - L'identifiant client de l'application.

 * @returns Une promesse qui r├⌐sout l'URL de connexion Google.
 */

export const getGoogleLoginUrl = async ({
  redirectUri,
  clientId,
}: {
  redirectUri: string;
  clientId: string;
}) => {
  const parameters = await generateParameters(redirectUri, "google");
  const config = await getConfig({
    servUrl: new URL(googleEndpoint),
    clientId,
  });
  return client.buildAuthorizationUrl(config, parameters);
};

/**
 * Construit l'URL de connexion Microsoft avec les paramètres OpenID Connect et PKCE nécessaires.
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
  const parameters = await generateParameters(redirectUri, "microsoft");
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
export const getAndStoreToken = async ({
  currentUrl,
  microsoftClientId,
  googleClientId,
  googleClientSecret,
}: {
  currentUrl: string;
  microsoftClientId: string;
  googleClientId: string;
  googleClientSecret: string;
}) => {
  const codeVerifier = getCodeVerifier() || "";
  const provider = getProvider();

  let config;
  if (provider === "microsoft") {
    config = await getConfig({
      servUrl: new URL(microsoftEndpoint),
      clientId: microsoftClientId,
    });
  } else if (provider === "google") {
    config = await getConfig({
      servUrl: new URL(googleEndpoint),
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    });
  }

  if (!config) {
    throw new Error("No config found in session cookies");
  }

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

export const userMustBeAuthedLoader = async () => {
  const token = getTokenFromSessionStorage();
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const userMustNotBeAuthedLoader = async () => {
  const token = getTokenFromSessionStorage();
  if (token) {
    return redirect("/");
  }
  return null;
};
