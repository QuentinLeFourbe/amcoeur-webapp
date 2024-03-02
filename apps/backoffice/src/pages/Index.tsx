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
    <h2>Comment fonctionne les pages</h2>
    <p>
      Les pages sont écrites au format Markdown. Ce format permet de créer une page sans se soucier de l&apos;aspect graphique de la page.
      Vous n&apos;avez pas la main sur le rendu graphique de la page, pour toute modification ou suggestion, merci de m&apos;envoyer un mail.
      Toutes les fonctionnalités ne sont pas encore présentes.
    </p>
  </div>;
}

export default Index;

const containerStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: "16px",
  margin: "0 10vw",

  "& h1": {
    fontSize: "2rem",
    fontWeight: "bold",
  }

})
