import ContentPanel from "../components/molecules/ContentPanel/ContentPanel";
import Banner from "../components/atoms/Banner/Banner";
import donateImage from "../assets/images/chien-dons.webp";
import lotoImage from "../assets/images/chat-chien.webp";
import Button from "../components/atoms/Button/Button";
import noelImage from "../assets/images/noel_non.jpg";

const IndexPage = () => {
  return (
    <>
      <Banner>Bienvenue à tous les protecteurs des animaux</Banner>
      <ContentPanel title="Site en construction" imageSrc={lotoImage}>
        <p>
          Le nouveau site www.amcoeur.org est en cours de reconstruction toutes
          les rubriques ne sont pas encore fonctionnelles. Nous vous remercions
          de votre compréhension.
        </p>
      </ContentPanel>
      <ContentPanel
        title="Noël: pas de cadeaux d'animaux !"
        imageSrc={noelImage}
        revert
      >
        <p>
          Bien trop de chiens, chats, NAC se retrouvent abandonnés suite à un
          cadeau fait par des parents qui n&apos;ont pas su juger des
          obligations qui en découleront pendant peut-être 20 ans ou plus.
        </p>
        <p>
          Un animal vivant n&apos;est pas un objet et ne peut être offert comme
          une poupée, un jeu ou autre jouet.
        </p>
        <Button to="/noel-cadeaux-animaux" rounded bold>
          En savoir plus
        </Button>
      </ContentPanel>
      <ContentPanel title="Appel aux dons" imageSrc={donateImage}>
        <p>
          Votre don est notre bouée de sauvetage pour les animaux vulnérables.
          Chaque contribution nous permet de leur offrir soins, abri et amour.
          Ensemble, changeons leur destin grâce à votre générosité.
        </p>
        <Button to="/don" rounded bold>
          En savoir plus
        </Button>
      </ContentPanel>
    </>
  );
};

export default IndexPage;
