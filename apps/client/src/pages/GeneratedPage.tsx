import { useLocation } from "react-router-dom";
import { useGetPageByRoute } from "../hooks/useGetPage";
import GeneratedPageRenderer from "../components/organisms/GeneratedPageRenderer/GeneratedPageRenderer";
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
      {isSuccess && <GeneratedPageRenderer components={pageDataComponents} />}
      {isLoading && <div>Chargement de la page...</div>}
      {isError && <PageNotFound />}
    </>
  );
}

export default GeneratedPage;
