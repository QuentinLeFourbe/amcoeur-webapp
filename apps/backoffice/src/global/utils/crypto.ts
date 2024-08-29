export const base64UrlEncode = (array: Uint8Array): string => {
  const base64String = btoa(String.fromCharCode(...array));
  return base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
};

// Calculer le code_challenge en utilisant SHA-256 sur le code_verifier
export const generateCodeChallenge = async (
  codeVerifier: string,
): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(hash));
};
