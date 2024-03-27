import { useLocation } from "react-router-dom";
import { useGetPageByRoute } from "../hooks/useGetPage";
import PageComponentsRenderer from "../components/organisms/PageComponentsRenderer/PageComponentsRenderer";
import PageNotFound from "../components/organisms/PageNotFound/PageNotFound";

function GeneratedPage() {
  const { pathname } = useLocation();
  const formattedPathname = pathname.replace("/", "");
  // get page by id or by route
  const {
    data: page,
    isLoading,
    isError,
    isSuccess,
  } = useGetPageByRoute(formattedPathname);

  const pageDataComponents = page?.components || [];

  return (
    <>
      {isSuccess && <PageComponentsRenderer components={pageDataComponents} />}
      {isLoading && <div>Chargement de la page...</div>}
      {(isError || (isSuccess && pageDataComponents.length === 0)) && <PageNotFound />}
    </>
  );
}

export default GeneratedPage;
