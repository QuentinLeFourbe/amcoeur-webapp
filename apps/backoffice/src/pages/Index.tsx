import { css } from "../../styled-system/css";

function Index() {
  return <div className={containerStyle}>
    <h1>
      Bienvenue dans l&apos;espace bénévole
    </h1>
    <p>
      Cet espace est dédié à la gestion du site et de son contenu.
    </p>
    <p>
      Si vous rencontrez des difficultés, ou que vous avez des suggestions pour l&apos;améliorer, veuillez envoyer un mail à: quentingarcia40@gmail.com
    </p>
  </div>;
}

export default Index;

const containerStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: "16px",

  "& h1": {
    fontSize: "2rem",
    fontWeight: "bold",
  }

})
