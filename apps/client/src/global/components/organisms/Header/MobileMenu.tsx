import { useEffect, useState } from "react";
import { css, cx } from "../../../../../styled-system/css";
import Accordion from "../../atoms/Accordion/Accordion";
import Link from "../../atoms/Link/Link";
import { Link as HeaderLink, LinkGroup } from "../../../types/link";

type MobileMenuProps = {
  links: HeaderLink[];
  groupLinks: LinkGroup[];
  isOpen: boolean;
  onClose?: () => void;
};

function MobileMenu({ isOpen, links, groupLinks, onClose }: MobileMenuProps) {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(noScroll);
    } else {
      document.body.classList.remove(noScroll);
    }
    return () => {
      document.body.classList.remove(noScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  const closeMenu = () => {
    onClose && onClose();
  };

  let hideOpenClassName = "";
  if (isOpen) {
    hideOpenClassName = showPanel;
  } else if (!isOpen) {
    hideOpenClassName = cx(noPointerEvents, hasBeenOpened && hidePanel);
  }

  const accordionValues = groupLinks.map((menuItem, index) => {
    return {
      title: menuItem.name,
      content: menuItem.subLinks?.map((subLink) => (
        <Link
          to={subLink.href}
          key={index}
          variant="secondary"
          onClick={closeMenu}
        >
          {subLink.name}
        </Link>
      )),
    };
  });

  return (
    isOpen && (
      <div className={cx(centerMenu, hideOpenClassName)} hidden={!isOpen}>
        <div className={panelBaseStyle}>
          {links.map((link, index) => {
            return (
              <div key={index}>
                <Link
                  to={link.href || "/"}
                  variant="secondary"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
          <Accordion items={accordionValues} />
        </div>
      </div>
    )
  );
}

export default MobileMenu;

const centerMenu = css({
  position: "absolute",
  top: "100%",
  right: "0",
  left: "0",

  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: "1rem",

  background: "backgrounds.secondary.light",
  height: "80vh",
  overflow: "scroll",
});

const panelBaseStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "1rem",
  padding: "3rem 1rem",
  width: "250px",
  //   opacity: "0",
});

const noScroll = css({
  overflow: "hidden",
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
