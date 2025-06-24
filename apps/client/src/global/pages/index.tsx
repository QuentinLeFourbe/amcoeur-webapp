import { css } from "../../../styled-system/css";
import PageComponentsRenderer from "../../generated/components/PageComponentsRenderer/PageComponentsRenderer";
import { useGetHomePage } from "../../generated/hooks/useGetPage";
import Banner from "../components/atoms/Banner/Banner";
import Loader from "../components/atoms/Loader/Loader";

const IndexPage = () => {
  const { data: pageData, isLoading, isSuccess } = useGetHomePage();

  return (
    <>
      <Banner>Bienvenue à tous les protecteurs des animaux</Banner>
      {isSuccess && <PageComponentsRenderer components={pageData.components} />}
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
    </>
  );
};

export default IndexPage;
