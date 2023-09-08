import React from "react";
import PageContainer from "../components/organisms/PageContainer/PageContainer";
import ContentPanel from "../components/organisms/ContentPanel/ContentPanel";
import DonationPanel from "../components/organisms/DonatePanel/DonatePanel";

function Donate() {
  return (
    <>
      <ContentPanel
        title="Faire un don"
        imageSrc="https://wamiz.com/media/cache/resolve/upload_original-size/article/images/17127142_2244568545769182_7436378995601440768_n(1)-9798.jpg"
        large
      >
        <p>
          Votre don est notre bouée de sauvetage pour les animaux vulnérables.
          Chaque contribution nous permet de leur offrir soins, abri et amour.
          Ensemble, changeons leur destin grâce à votre générosité.
        </p>
        <p>
          La première mission d'amcoeur c'est d'employer toute son énergie tous
          les jours pour accompagner dans les étapes importantes et souvent
          difficiles de la vie les animaux dans la souffrance, les personnes
          seules et âgées en maisons de retraite ainsi que les enfants
          hospitalisés.
        </p>
        <p>
          Vous avez fait un don : vous recevrez un reçu fiscal en début d'année
          qui suit votre don du montant total de votre versement de façon à
          déduire de vos impôts sur le revenu 66% de votre don dans la limite de
          20 % de votre revenu imposable.
          <br />
          Exemple : Un don de 30 € ne vous revient en réalité qu'à 10,20 €
        </p>
      </ContentPanel>
      <DonationPanel />
    </>
  );
}

export default Donate;
