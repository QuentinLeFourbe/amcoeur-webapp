import TitlePanel from "../components/molecules/TitlePanel/TitlePanel";
import ContentButton from "../components/atoms/ContentButton/ContentButton";
import ChatOmbre from "../assets/images/chat-ombre.webp";

const NotFoundPage = () => {
  return (
    <TitlePanel src={ChatOmbre}>
      <h1>404</h1>
      <h2>Il semblerait que vous vous soyez égaré...</h2>
      <ContentButton href="/">Retourner à l'accueil</ContentButton>
    </TitlePanel>
  );
};

export default NotFoundPage;
