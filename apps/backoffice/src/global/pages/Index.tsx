import { css } from "../../../styled-system/css";
import { useCurrentUser } from "../hooks/useUser";
import { FileText, Mail, Info } from "lucide-react";

function Index() {
  const { data: { data: currentUser } = {} } = useCurrentUser();

  return (
    <div className={containerStyle}>
      {/* Hero Section */}
      <div className={heroStyle}>
        <h1 className={titleStyle}>
          Bienvenue dans l&apos;espace bénévole, <span className={highlightStyle}>{currentUser?.fullname?.split(" ")[0] || ""}</span>
        </h1>
        <p className={subtitleStyle}>
          Cet espace est dédié à la gestion du site et de son contenu.
        </p>
      </div>

      <div className={gridStyle}>
        {/* Card: Markdown Explanation */}
        <div className={cx(cardStyle, fullWidthCardStyle)}>
          <div className={iconWrapperStyle}><FileText size={24} /></div>
          <div>
            <h2 className={cardTitleStyle}>L'art de l'édition simplifiée</h2>
            <p className={cardTextStyle}>
              Vos idées prennent vie grâce au **Markdown**. C'est un langage magique et minimaliste qui vous permet de 
              sculpter vos contenus (titres percutants, listes claires, emphase) sans jamais vous soucier de la technique. 
              Concentrez-vous sur le message et l'émotion ; notre plateforme se charge de transformer vos mots en une 
              expérience visuelle élégante et cohérente pour tous nos visiteurs.
            </p>
          </div>
        </div>

        {/* Card: Support */}
        <div className={cardStyle}>
          <div className={iconWrapperStyle}><Mail size={24} /></div>
          <h2 className={cardTitleStyle}>Suggestions & Difficultés</h2>
          <p className={cardTextStyle}>
            Si vous rencontrez des difficultés, ou que vous avez des suggestions
            pour l&apos;améliorer, veuillez envoyer un mail à l'adresse ci-dessous.
          </p>
          <a href="mailto:quentingarcia40@gmail.com" className={linkButtonStyle}>
            quentingarcia40@gmail.com
          </a>
        </div>

        {/* Card: Status */}
        <div className={cardStyle}>
          <div className={iconWrapperStyle}><Info size={24} /></div>
          <h2 className={cardTitleStyle}>Évolutions</h2>
          <p className={cardTextStyle}>
            Toutes les fonctionnalités ne sont pas encore présentes. L'outil évolue
            régulièrement pour mieux répondre aux besoins de l'association Amcoeur.
          </p>
        </div>
      </div>
    </div>
  );
}

const cx = (...args: string[]) => args.filter(Boolean).join(" ");

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingBottom: "4rem",
});

const heroStyle = css({
  textAlign: "left",
  borderBottom: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.05)",
  paddingBottom: "2rem",
});

const titleStyle = css({
  fontSize: "2.5rem",
  fontWeight: "900",
  color: "white",
  marginBottom: "0.5rem",
  letterSpacing: "tight",
});

const highlightStyle = css({
  color: "amcoeurRose",
});

const subtitleStyle = css({
  fontSize: "lg",
  color: "amcoeurPale",
  maxWidth: "800px",
});

const gridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "2rem",
});

const cardStyle = css({
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  padding: "2.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-5px)",
    borderColor: "rgba(225, 29, 72, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
});

const fullWidthCardStyle = css({
  gridColumn: "1 / -1",
  flexDirection: "row!",
  alignItems: "flex-start",
  gap: "2rem",
});

const iconWrapperStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  backgroundColor: "rgba(225, 29, 72, 0.1)",
  color: "amcoeurRose",
  flexShrink: 0,
});

const cardTitleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
  marginBottom: "0.5rem",
});

const cardTextStyle = css({
  color: "rgba(255, 255, 255, 0.6)",
  fontSize: "md",
  lineHeight: "relaxed",
});

const linkButtonStyle = css({
  marginTop: "1rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "amcoeurPale",
  borderRadius: "10px",
  fontSize: "sm",
  fontWeight: "bold",
  textAlign: "center",
  textDecoration: "none",
  transition: "all 0.2s",
  width: "fit-content",
  border: "1px solid rgba(255, 255, 255, 0.1)",

  "&:hover": {
    backgroundColor: "amcoeurRose",
    color: "white",
    borderColor: "amcoeurRose",
  }
});

export default Index;
