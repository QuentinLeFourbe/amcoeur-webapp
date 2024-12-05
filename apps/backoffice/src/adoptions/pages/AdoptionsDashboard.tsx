import Button from "../../global/components/atoms/Button/Button";
import { useGetAdoptions } from "../hooks/useAdoptions";
import Button from "../../global/components/atoms/Button/Button";

function AdoptionsDashboard() {
  const { data } = useGetAdoptions();
  console.log("data", data);
  return (
    <div>
      <Button to="/adoptions/creer">Crée une adoption</Button>
    </div>
  );
}

export default AdoptionsDashboard;
