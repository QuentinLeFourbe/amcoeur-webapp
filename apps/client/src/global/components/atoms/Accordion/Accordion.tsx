import type { ComponentProps } from "react";
import React, { useState } from "react";

import { css, cx } from "../../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

type AccordionItem = {
  title: React.ReactNode;
  onClick?: () => void;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion = ({ items }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={accordionStyle}>
      {items.map((item, index) => (
        <Item key={index}>
          {(activeIndex !== index || !item.content) && (
            <ItemTrigger
              onClick={() => {
                handleItemClick(index);
                if (item.onClick) item.onClick();
              }}
            >
              {item.title}
            </ItemTrigger>
          )}
          {activeIndex === index && item.content && (
            <ItemContent>{item.content}</ItemContent>
          )}
        </Item>
      ))}
    </div>
  );
};

const accordionStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

type ItemProps = ComponentProps<"div">;
const Item = ({ children, ...props }: ItemProps) => {
  return (
    <div {...props} className={cx(itemStyle, props.className)}>
      {children}
    </div>
  );
};

const itemStyle = css({});

type ItemTriggerProps = ComponentProps<typeof ClickablePrimitive>;
const ItemTrigger = (props: ItemTriggerProps) => {
  return (
    <ClickablePrimitive
      {...props}
      className={cx(itemTriggerStyle, props.className)}
    ></ClickablePrimitive>
  );
};

const itemTriggerStyle = css({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  paddingBottom: "1rem",
  fontWeight: "bold",
  fontFamily: "body",
  fontSize: "1.2rem",
  color: "pinkLight",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "pinkMedium",
  },
});

type ItemContentProps = ComponentProps<"div">;
const ItemContent = ({ children, ...props }: ItemContentProps) => {
  return (
    <div {...props} className={cx(itemContentStyle, props.className)}>
      {children}
    </div>
  );
};

const itemContentStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  paddingBottom: "1rem",
  paddingLeft: "0.5rem",
  opacity: "0",
  animation: "panelFadeIn 0.4s ease-in-out forwards",
});

export default Accordion;
