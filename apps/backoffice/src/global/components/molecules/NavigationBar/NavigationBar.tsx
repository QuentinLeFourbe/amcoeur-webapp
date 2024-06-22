import { ComponentProps } from "react";
import { css, cx } from "../../../../../styled-system/css";
import Link from "../../atoms/Link/Link";

type NavigationBarProps = Omit<ComponentProps<"div">, "children"> & {
  links: { label: string; onClick: () => void; isActive: boolean }[];
};

function NavigationBar({ links, ...props }: NavigationBarProps) {
  return (
    <div
      {...props}
      className={cx(
        props.className,
        css({
          display: "flex",
          alignItems: "center",
          padding: "16px 32px",
          gap: "32px",
        }),
      )}
    >
      {links.map((link, index) => {
        return (
          <Link variant="secondary" onClick={link.onClick}  key={index} isActive={link.isActive}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

export default NavigationBar;
