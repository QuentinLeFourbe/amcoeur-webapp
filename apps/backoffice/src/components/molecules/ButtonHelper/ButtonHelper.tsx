import { ComponentProps } from "react";
import Helper from "../../atoms/Helper/Helper";

type NavButtonHelperProps = ComponentProps<typeof Helper>

function NavButtonHelper(props: NavButtonHelperProps) {
  return (
    <Helper {...props} label="Aide">
      Le lien de navigation correspond à la page sur lequel l&apos;utilisateur
      sera amené lorsqu&apos;il cliquera sur le bouton.
      <p>
        Pour rediriger vers une page du site, il faut renseigner le chemin
        d&apos;accès de la page. Par exemple pour rediriger vers la page de don,
        le chemin d&apos;accès est &quot;/don&quot;. Il faut alors renseigner
        &quot;/don&quot; pour le lien de navigation.
      </p>
      <p>
        Pour rediriger vers une page extérieur au site, il faut renseigner le
        lien de la page extérieur. Par exemple, pour rediriger vers Google, il
        faudrait renseigner &quot;https://www.google.com/&quot;.
      </p>
    </Helper>
  );
}

export default NavButtonHelper;
