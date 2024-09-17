import { useGetAdoptions } from "../hooks/useAdoptions";

function AdoptionsDashboard() {
  const { data } = useGetAdoptions();
  console.log("data", data);
  return <div>AdoptionsDashboard</div>;
}

export default AdoptionsDashboard;
