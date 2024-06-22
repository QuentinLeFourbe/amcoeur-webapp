import { useContext } from "react";
import { UserContext } from "../../global/contexts/user";

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser doit être utilisé dans un composant englobé par UserProvider",
    );
  }
  return context;
};

export default useUser;
