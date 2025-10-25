import { useLocation } from "react-router-dom";

import { css } from "../../../styled-system/css";
import Loader from "../../global/components/atoms/Loader/Loader";
import PageNotFound from "../../global/components/organisms/PageNotFound/PageNotFound";
import PageComponentsRenderer from "../components/PageComponentsRenderer/PageComponentsRenderer";
import { useGetPageByRoute } from "../hooks/useGetPage";

function GeneratedPage() {
  const { pathname } = useLocation();
  const formattedPathname = pathname.replace("/", "");

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
      {isLoading && (
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          })}
        >
          <Loader />
        </div>
      )}
      {(isError || (isSuccess && pageDataComponents.length === 0)) && (
        <PageNotFound />
      )}
    </>
  );
}

export default GeneratedPage;
