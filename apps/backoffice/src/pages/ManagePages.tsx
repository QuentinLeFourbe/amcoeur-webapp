import { css } from "../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import { useGetPages } from "../hooks/pagesQueries";

function ManagePages() {
  const { data, isLoading, isError } = useGetPages();

  return (
    <div className={container}>
      {data?.data.map((page) => {
        return (
          <div key={page.id} className={row}>
            <h2>{page.title}</h2>
            <p>{page.route}</p>
            <Button>Afficher</Button>
            <Button>Modifier</Button>
            <Button>Supprimer</Button>
          </div>
        );
      })}
    </div>
  );
}

export default ManagePages;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const row = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px",
  marginBottom: "1rem",
});
