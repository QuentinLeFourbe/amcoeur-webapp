import { useParams } from "react-router-dom";
import { useGetPage } from "../hooks/useGetPage";
import PageComponentsRenderer from "../components/organisms/PageComponentsRenderer/PageComponentsRenderer";
import PageNotFound from "../components/organisms/PageNotFound/PageNotFound";

function Preview() {
  const params = useParams();
  const id = params.id || "";
  // get page by id or by route
  const { data: page, isLoading, isError, isSuccess } = useGetPage(id);
  // const pageMdxContent = data?.data.content || "";
  const pageDataComponents = page?.components || [];
  return (
    <>
      {isSuccess && <PageComponentsRenderer components={pageDataComponents} />}
      {isLoading && <div>Chargement en cours des données...</div>}
      {isError && <PageNotFound />}
    </>
  );
}

export default Preview;
