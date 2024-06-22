import Helper from "../Helper/Helper";

function MarkdownHelp() {
  return (
    <Helper label="Aide: formater le contenu">
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
        Vous pouvez aider les animaux en faisant un don à l&apos;association.
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
    </Helper>
  );
}

export default MarkdownHelp;
