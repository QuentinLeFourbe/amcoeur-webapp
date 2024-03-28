import { ComponentProps } from "react";
import Button from "../../atoms/Button/Button";
import { css, cx } from "../../../../../styled-system/css";

type NavigationBarProps = ComponentProps<"div"> & {
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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray.200",
          padding: "16px 32px",
          gap: "16px",
        }),
      )}
    >
      {links.map((link, index) => {
        return (
          <Button color="lightGray" onClick={link.onClick}  key={index} isActive={link.isActive}>
            {link.label}
          </Button>
        );
      })}
    </div>
  );
}

export default NavigationBar;
