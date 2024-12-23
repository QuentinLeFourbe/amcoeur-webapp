import { css } from "../../../../styled-system/css";
import Link from "../../atoms/Link/Link";

type SidePanelProps = {
  backgroundSrc: string;
  links:
    | {
        name: string;
        href: string;
      }[]
    | undefined;
  onClose?: () => void;
};

function SidePanel({ links, backgroundSrc, onClose }: SidePanelProps) {
  const closeMenu = () => {
    onClose && onClose();
  };

  return (
    <div className={secondarySidePanel}>
      <img className={backgroundImage} src={backgroundSrc} />
      {links && (
        <div className={linksContainer}>
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                to={link.href}
                variant="tertiary"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SidePanel;

const secondarySidePanel = css({
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
});

const backgroundImage = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const linksContainer = css({
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "flex-end",
  justifyContent: "space-around",
  zIndex: "1",
  padding: "1rem",
  gap: "1rem",
});
