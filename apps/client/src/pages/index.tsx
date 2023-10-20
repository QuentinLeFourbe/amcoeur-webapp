import ContentPanel from "../components/molecules/ContentPanel/ContentPanel";
import Banner from "../components/atoms/Banner/Banner";
import donateImage from "../assets/images/chien-dons.webp";
import lotoImage from "../assets/images/chat-chien.webp";
import Button from "../components/atoms/Button/Button";

const IndexPage = () => {
  return (
    <>
      <Banner>Protéger. Aimer. Secourir. Agir. </Banner>
      <ContentPanel title="Loto Amcoeur !" imageSrc={lotoImage}>
        <p>
          Participez au loto de notre association dédiée à la protection des
          animaux, et offrez-leur une chance de vie meilleure. Chaque ticket que
          vous achetez contribue à financer nos actions pour sauver et améliorer
          la vie des animaux dans le besoin. Ensemble, faisons la différence et
          bâtissons un avenir plus doux pour nos amis à quatre pattes.
        </p>
        <Button to="/" rounded bold>
          En savoir plus
        </Button>
      </ContentPanel>
      <ContentPanel revert title="Appel aux dons" imageSrc={donateImage}>
        <p>
          Soutenez Amcoeur et soyez le cœur qui bat pour nos amis à quatre
          pattes. Chaque don compte pour offrir une vie meilleure à ces
          compagnons fidèles. Ensemble, battons-nous pour un monde où l'amour et
          la protection règnent. 🐾❤️
        </p>
        <Button to="/don" rounded bold>
          En savoir plus
        </Button>
      </ContentPanel>
      {/* <ContentPanel
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
      </ContentPanel> */}
    </>
  );
};

export default IndexPage;
