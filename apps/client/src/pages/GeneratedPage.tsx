import { useLocation } from "react-router-dom";
import { useGetPageByRoute } from "../hooks/useGetPage";
import GeneratedPageRenderer from "../components/organisms/GeneratedPageRenderer/GeneratedPageRenderer";
import TitlePanel from "../components/molecules/TitlePanel/TitlePanel";
import Button from "../components/atoms/Button/Button";
import ChatOmbre from "../assets/images/chat-ombre.webp";

function GeneratedPage() {
  const { pathname } = useLocation();
  // get page by id or by route
  const {
    data: page,
    isLoading,
    isError,
    isSuccess,
  } = useGetPageByRoute(pathname);
  // const pageMdxContent = data?.data.content || "";
  const pageDataComponents = page?.components || [];
  return (
    <>
      {isSuccess && <GeneratedPageRenderer components={pageDataComponents} />}
      {isLoading && <div>Chargement en cours des données...</div>}
      {(isError || page === undefined) && (
        <TitlePanel src={ChatOmbre}>
          <h1>404</h1>
          <h2>Il semblerait que vous vous soyez égaré...</h2>
          <Button rounded href="/">
            Retourner à l&apos;accueil
          </Button>
        </TitlePanel>
      )}
    </>
  );
}

export default GeneratedPage;
