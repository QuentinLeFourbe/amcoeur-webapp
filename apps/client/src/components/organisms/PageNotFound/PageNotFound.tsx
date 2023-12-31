import TitlePanel from "../../molecules/TitlePanel/TitlePanel";
import ChatOmbre from "../assets/images/chat-ombre.webp";
import Button from "../../atoms/Button/Button";

const PageNotFound = () => {
  return (
    <TitlePanel src={ChatOmbre}>
      <h1>404</h1>
      <h2>Il semblerait que vous vous soyez égaré...</h2>
      <Button rounded href="/">
        Retourner à l&apos;accueil
      </Button>
    </TitlePanel>
  );
};

export default PageNotFound;
