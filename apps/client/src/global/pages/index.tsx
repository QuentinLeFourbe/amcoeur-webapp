import PageComponentsRenderer from "../../generated/components/PageComponentsRenderer/PageComponentsRenderer";
import { useGetHomePage } from "../../generated/hooks/useGetPage";
import Banner from "../components/atoms/Banner/Banner";

const IndexPage = () => {
  const { data: pageData, isLoading, isSuccess } = useGetHomePage();

  return (
    <>
      <Banner>Bienvenue à tous les protecteurs des animaux</Banner>
      {isSuccess && <PageComponentsRenderer components={pageData.components} />}
      {isLoading && <div>Chargement de la page...</div>}
    </>
  );
};

export default IndexPage;
