import { generateCodeVerifier } from "./crypto";

export const storeCodeVerifier = () => {
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
