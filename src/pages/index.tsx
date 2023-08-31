import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Header from "../components/organisms/Header/Header";
import ContentPanel from "../components/organisms/ContentPanel/ContentPanel";
import ContentButton from "../components/atoms/ContentButton/ContentButton";
import Footer from "../components/organisms/Footer/Footer";
import PageContainer from "../components/organisms/PageContainer/PageContainer";
import Banner from "../components/atoms/Banner.tsx/Banner";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <PageContainer>
      <Banner>
        Bienvenue sur le site de Amcoeur, association dédiée à la protection des
        animaux.
      </Banner>
      <ContentPanel title="Adopter un animal ?">
        <p>
          Rejoignez notre famille en sauvant une vie et en trouvant un compagnon
          fidèle ! Notre association dévouée à la protection des animaux propose
          des adoptions responsables pour vous offrir une chance unique de
          donner un foyer aimant à un adorable ami à quatre pattes. Ensemble,
          faisons la différence pour nos amis à fourrure !
        </p>
        <ContentButton>Je souhaite adopter</ContentButton>
      </ContentPanel>
      <ContentPanel
        revert
        title="Abandon, cruauté, maltraitance"
        imageSrc="https://www.canidia.be/wp-content/uploads/2016/06/chien-triste-bloblog-1300x650.jpg"
      >
        <p>
          Ensemble contre l'abandon et la maltraitance animale ! Nous sommes une
          voix pour les sans-voix, luttant contre l'injustice envers nos
          compagnons vulnérables. Rejoignez notre mouvement pour sensibiliser,
          dénoncer et mettre fin à ces actes cruels. Chaque action compte pour
          créer un monde où chaque être vivant est traité avec respect et amour.
        </p>
        <ContentButton>En savoir plus</ContentButton>
      </ContentPanel>
      <ContentPanel
        title="Devenir famille d'accueil"
        imageSrc="https://www.zooplus.fr/magazine/wp-content/uploads/2019/04/chat-se-fait-caliner-1024x683.jpg"
      >
        <p>
          Devenez un refuge de chaleur et de réconfort pour les animaux dans le
          besoin ! En tant que famille d'accueil au grand cœur, vous offrez une
          deuxième chance à des vies en détresse, en les entourant d'amour et de
          soins temporaires. Joignez-vous à notre réseau dévoué pour devenir le
          lien vital entre le passé difficile et un avenir radieux pour ces
          compagnons en transition.
        </p>
        <ContentButton>Ca m'intéresse</ContentButton>
      </ContentPanel>
    </PageContainer>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Amcoeur</title>;
