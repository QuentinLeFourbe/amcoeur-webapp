import ContentPanel from "../components/molecules/ContentPanel/ContentPanel";
import Banner from "../components/atoms/Banner/Banner";
import donateImage from "../assets/images/chien-dons.webp";
import lotoImage from "../assets/images/chat-chien.webp";
import familleImage from "../assets/images/chat-doigt.webp";
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
          Soutenez Amcoeur et soyez le cœur qui bat pour nos amis à quatre
          pattes. Chaque don compte pour offrir une vie meilleure à ces
          compagnons fid&rsquo;les. Ensemble, battons-nous pour un monde où
          l&apos;amour et la protection règnent. 🐾❤️
        </p>
        <Button to="/don" rounded bold>
          En savoir plus
        </Button>
      </ContentPanel>
    </>
  );
};

export default IndexPage;
