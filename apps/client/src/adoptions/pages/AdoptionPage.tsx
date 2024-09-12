import { useAdoptions } from "../hooks/useAdoptions";

function AdoptionPage() {
  const { data: {data: adoptionsData} = {}, isLoading, isSuccess, isError } = useAdoptions();

  return <div>AdoptionPage</div>;
}

export default AdoptionPage;
