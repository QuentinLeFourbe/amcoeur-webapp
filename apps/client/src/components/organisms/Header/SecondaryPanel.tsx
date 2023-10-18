import { useEffect, useState } from "react";
import { css, cx } from "../../../../styled-system/css";
import Link from "../../atoms/Link/Link";
import SidePanel from "./SidePanel";

import useMediaQuery from "../../../hooks/useMediaQuery";
import { LinkGroup } from "../../../types/link";

type SecondaryPanelProps = {
  isOpen: boolean;
  links: LinkGroup[];
  onClose?: () => void;
};

function SecondaryPanel({
  isOpen = false,
  links,
  onClose,
}: SecondaryPanelProps) {
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const isMediumScreen = useMediaQuery({ breakpoint: "lg" });

  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  let hideOpenClassName = "";
  if (isOpen) {
    hideOpenClassName = showPanel;
  } else if (!isOpen) {
    hideOpenClassName = cx(noPointerEvents, hasBeenOpened && hidePanel);
  }

  return (
    <div
      className={cx(
        secondaryHeader,
        hideOpenClassName,
        isMediumScreen ? smallerScreen : largeScreen
      )}
    >
      <div className={secondaryLinksContainer}>
        {links.map((link, index) => (
          <Link
            key={index}
            type="button"
            variant="secondary"
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
        onClose={onClose}
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
});

const noPointerEvents = css({
  pointerEvents: "none",
});
