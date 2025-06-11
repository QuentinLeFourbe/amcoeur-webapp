import { useLocation } from "react-router-dom";

/**
 * Retourne l'URL compl├¿te actuelle
 */
const useCurrentUrl = () => {
  const location = useLocation();

  const protocol = window.location.protocol; // http: ou https:

  const host = window.location.host; // domaine + port

  // Construit l'URL compl├¿te

  const fullUrl = `${protocol}//${host}${location.pathname}${location.search}${location.hash}`;
  return fullUrl;
};

export default useCurrentUrl;
