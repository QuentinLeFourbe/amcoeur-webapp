import { ReactNode } from "react";

import { css, cx } from "../../../../../styled-system/css";

type CardProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: ReactNode;
  accentColor?: string;
  paddingLeft?: string | number;
  className?: string;
};

const Card = ({ 
  children, 
  title, 
  description, 
  icon, 
  accentColor, 
  paddingLeft,
  className 
}: CardProps) => {
  return (
    <div className={cx(
      cardBaseStyle, 
      accentColor ? css({ borderLeft: "4px solid", borderLeftColor: accentColor }) : null,
      paddingLeft ? css({ paddingLeft: `${paddingLeft}!` }) : null,
      className
    )}>
      {(title || icon || description) && (
        <div className={cardHeaderStyle}>
          {icon && <div className={iconWrapperStyle}>{icon}</div>}
          <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
            {title && <h2 className={cardTitleStyle}>{title}</h2>}
            {description && <p className={cardDescStyle}>{description}</p>}
          </div>
        </div>
      )}
      <div className={css({ display: "flex", flexDirection: "column", gap: "1.5rem" })}>
        {children}
      </div>
    </div>
  );
};

export default Card;

const cardBaseStyle = css({
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  padding: "2rem",
  borderRadius: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const cardHeaderStyle = css({
  display: "flex",
  gap: "1rem",
  alignItems: "flex-start",
});

const iconWrapperStyle = css({
  backgroundColor: "rgba(225, 29, 72, 0.1)",
  padding: "0.75rem",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const cardTitleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
});

const cardDescStyle = css({
  color: "rgba(255,255,255,0.4)",
  fontSize: "sm",
  lineHeight: "relaxed",
});
