import TitlePanel from "../components/molecules/TitlePanel/TitlePanel";
import ContentButton from "../components/atoms/ContentButton/ContentButton";

const NotFoundPage = () => {
  return (
    <TitlePanel
      src={
        "https://static.fundacion-affinity.org/cdn/farfuture/sIq5ExX9Wg4rB_vQQ9jLfI7tfWuJ-ICq3cMI0HxBikE/mtime:1559728757/sites/default/files/chien-perdu-ou-abandonne.jpg"
      }
    >
      <h1>404</h1>
      <h2>Il semblerait que vous vous soyez égaré...</h2>
      <ContentButton href="/">Retourner à l'accueil</ContentButton>
    </TitlePanel>
  );
};

export default NotFoundPage;
