import { generateCodeChallenge, generateCodeVerifier } from "./crypto";

const storeCodeVerifier = () => {
  const codeVerifer = generateCodeVerifier();
  sessionStorage.setItem("pkce_code_verifier", codeVerifer);
  return codeVerifer;
};

/**
 * Get the code verifier from session storage, the code verifier is then deleted from the session storage
 **/
export const getCodeVerifier = () => {
  const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
  sessionStorage.removeItem("pkce_code_verifier");
  return codeVerifier;
};

export const microsoftLogin = async () => {
  try {
    const codeVerifier = storeCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const fullPath =
      window.location.pathname + window.location.search + window.location.hash;
    const encodedPath = encodeURIComponent(fullPath);
    const loginUrl =
      "//login.microsoftonline.com/consumers/oauth2/v2.0/authorize?" +
      `client_id=${import.meta.env.VITE_MS_CLIENT_ID}` +
      "&scope=openid" +
      "&response_type=code" +
      `&redirect_uri=${window.location.origin}/login/redirect
` +
      `&state=${encodedPath}` +
      `&code_challenge=${codeChallenge}` +
      "&code_challenge_method=S256";
    window.location.href = loginUrl;
  } catch (e) {
    console.error(e);
  }
};
