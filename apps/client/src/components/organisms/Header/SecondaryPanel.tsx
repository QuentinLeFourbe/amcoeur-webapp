import { useEffect, useState } from "react";
import { css, cx } from "../../../../styled-system/css";
import Link from "../../atoms/Link/Link";
import SidePanel from "./SidePanel";
import ChienContent from "../../../assets/images/chien-content-alt.webp";
import ChatonMimi from "../../../assets/images/chaton-mimi-alt.webp";
import useMediaQuery from "../../../hooks/useMediaQuery";

const secondaryLinks = [
  {
    name: "Agir",
    href: "/qui-sommes-nous",
    src: ChienContent,
    subLinks: [
      {
        name: "Devenir famille d'accueil",
        href: "/famille",
      },
      {
        name: "Devenir bénévole",
        href: "/benevole",
      },
      {
        name: "Faire un don",
        href: "/donate",
      },
      {
        name: "Collecte de nourriture",
        href: "/collecte",
      },
    ],
  },
  {
    name: "Besoin d'aide",
    href: "/besoin-aide",
    src: ChatonMimi,
    subLinks: [
      {
        name: "Nos aides vétérinaires",
        href: "/adoption",
      },
      {
        name: "Aide alimentaire",
        href: "/sos",
      },
      {
        name: "Entre aide de proximité",
        href: "/maltraitance",
      },
      {
        name: "La mort de votre animal",
        href: "/mort",
      },
    ],
  },
];

type SubLink = {
  name: string;
  href: string;
};

type SecondaryLink = {
  name: string;
  href: string;
  src: string;
  subLinks?: SubLink[];
};

function SecondaryPanel({ isOpen = false }: { isOpen: boolean }) {
  const [selectedLink, setSelectedLink] = useState<SecondaryLink>(
    secondaryLinks[0]
  );
  const isMediumScreen = useMediaQuery({ breakpoint: "lg" });

  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  let panelShowClassName = "";
  if (isOpen) {
    panelShowClassName = showPanel;
  } else if (!isOpen && hasBeenOpened) {
    panelShowClassName = hidePanel;
  }

  return (
    <div
      className={cx(
        secondaryHeader,
        panelShowClassName,
        isMediumScreen ? smallerScreen : largeScreen
      )}
    >
      <div className={secondaryLinksContainer}>
        {secondaryLinks.map((link, index) => (
          <Link
            key={index}
            to={"/"}
            type="secondary"
            onMouseOver={() => setSelectedLink(link)}
            onClick={() => setSelectedLink(link)}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <SidePanel
        links={selectedLink.subLinks}
        backgroundSrc={selectedLink.src}
      />
    </div>
  );
}
export default SecondaryPanel;

const secondaryHeader = css({
  position: "absolute",
  top: "100%",
  right: "0",
  left: "0",
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  background: "backgrounds.secondary.light",
  opacity: "0",
});

const largeScreen = css({
  padding: "0px 15vw",
});

const smallerScreen = css({
  padding: "0px 5vw",
});

const secondaryLinksContainer = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "space-around",
  alignItems: "flex-end",
  padding: "1rem",
});

const showPanel = css({
  animation: "panelFadeIn 0.4s ease-in-out forwards",
});

const hidePanel = css({
  animation: "panelFadeOut 0.4s ease-in-out forwards",
  pointerEvents: "none",
});
