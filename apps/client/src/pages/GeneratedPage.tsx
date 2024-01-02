import { useLocation } from "react-router-dom";
import { useGetPageByRoute } from "../hooks/useGetPage";
import GeneratedPageRenderer from "../components/organisms/GeneratedPageRenderer/GeneratedPageRenderer";
import PageNotFound from "../components/organisms/PageNotFound/PageNotFound";

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
      {(isError || page === undefined) && <PageNotFound />}
    </>
  );
}

export default GeneratedPage;
