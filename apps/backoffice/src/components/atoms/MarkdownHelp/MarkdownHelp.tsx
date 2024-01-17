import { useState } from "react";
import { css } from "../../../../styled-system/css";

function MarkdownHelp() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={container}>
        <button
          className={buttonStyle}
          type="button"
          onClick={() => setShowDetails(!showDetails)}
        >
          Aide: formater le contenu
        </button>
        {showDetails && (
          <div className={textContainer}>
            Pour formater le texte, il faut utiliser la syntaxe markdown.
            <ul>
              <li>Il faut sauter 2 lignes pour revenir à la ligne.</li>
              <li>Titre: ## Mon titre</li>
              <li>Sous-titre: ### Mon sous-titre</li>
              <li>Gras: **mon texte en gras**</li>
              <li>Italique: *mon texte en italique*</li>
              <li>Liste à puces: - mon objet de liste</li>
              <li>Liste numérotée: 1. mon objet de liste</li>
              <li>Lien: [texte du lien](url du lien)</li>
            </ul>
            <p>Exemple de page:</p>
            <p>
              ## Aidez les animaux
              <br />
              Vous pouvez aider les animaux en faisant un don à l'association.
              Devenez acteur de la protection animale !
              <br />
              ### Mon sous-titre
              <br />
              **Ce texte très important est en gras !**
              <br />
              *Ce texte là est en italique*
              <br />
              <br />
              ### Les listes
              <br />
              Ceci est une liste:
              <br />
              - mon premier objet de liste
              <br />
              - mon second objet de liste
              <br />
              - mon troisième objet de liste
              <br />
              <br />
              Ceci est une liste numérotée:
              <br />
              1. mon premier objet de liste
              <br />
              2. mon second objet de liste
              <br />
              3. mon troisième objet de liste
              <br />
              <br />
              Voici un lien:
              <br />
              [Lien vers Google](http://www.google.fr)
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default MarkdownHelp;

const container = css({
  backgroundColor: "blue.900",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const textContainer = css({
  color: "white",
  padding: "0rem 1rem",
  fontSize: "0.9rem",
  "& p": {
    margin: "0.5rem 0",
  },

  "& ul": {
    listStyle: "square",
    marginLeft: "1rem",
  },
});

const buttonStyle = css({
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "white",
  backgroundColor: "blue.900",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  padding: "1rem",

  "&:hover": {
    backgroundColor: "blue.800",
  },
});
