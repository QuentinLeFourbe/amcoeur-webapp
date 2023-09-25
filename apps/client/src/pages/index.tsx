import ContentPanel from "../components/molecules/ContentPanel/ContentPanel";
import ContentButton from "../components/atoms/ContentButton/ContentButton";
import Banner from "../components/atoms/Banner/Banner";

const IndexPage = () => {
  return (
    <>
      <Banner>
        Bienvenue sur le site de Amcoeur, association dédiée à la protection des
        animaux.
      </Banner>
      <ContentPanel title="Super loto Amcoeur !">
        <p>
          Participez au loto de notre association dédiée à la protection des
          animaux, et offrez-leur une chance de vie meilleure. Chaque ticket que
          vous achetez contribue à financer nos actions pour sauver et améliorer
          la vie des animaux dans le besoin. Ensemble, faisons la différence et
          bâtissons un avenir plus doux pour nos amis à quatre pattes.
        </p>
        <ContentButton>En savoir plus</ContentButton>
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
        <ContentButton href="/famille-accueil">Ca m'intéresse</ContentButton>
      </ContentPanel>
    </>
  );
};

export default IndexPage;

