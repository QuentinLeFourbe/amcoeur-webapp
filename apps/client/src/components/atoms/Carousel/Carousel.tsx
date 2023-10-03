import { useState, useEffect } from "react";
import ArrowNext from "../../../assets/icons/arrow-next.svg?react";
import ArrowPrev from "../../../assets/icons/arrow-prev.svg?react";
import Minus from "../../../assets/icons/minus.svg?react";

import { css, cx } from "../../../../styled-system/css";
import { Link } from "react-router-dom";

type CarouselItem = {
  src: string;
  href?: string;
  text?: string;
};

type CarouselProps = {
  items: CarouselItem[];
  timerInSeconds?: number;
};

function Carousel({ items, timerInSeconds }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  //change index every 5 seconds
  useEffect(() => {
    if (!timerInSeconds) return;
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % items.length);
    }, timerInSeconds * 1000);
    return () => clearInterval(interval);
  }, [currentIndex, items.length, timerInSeconds]);

  const incrementIndex = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const decrementIndex = () => {
    if (currentIndex === 0) {
      setCurrentIndex(items.length - 1);
      return;
    }
    setCurrentIndex((currentIndex - 1) % items.length);
  };

  const selectIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={container}>
      {items.map((item, index) => (
        <div className={index === currentIndex ? imageVisible : imageInvisible}>
          <img
            src={item.src}
            key={index}
            className={cx(
              imageStyle,
              index === currentIndex ? imageVisible : imageInvisible
            )}
          />
          {item.text && (
            <Link to={item.href || "#"} className={textContainer}>
              {item.text} {item.href}
            </Link>
          )}
        </div>
      ))}

      <div className={indicatorsContainer}>
        {items.map((_, index) => (
          <button onClick={() => selectIndex(index)}>
            <Minus
              key={index}
              className={
                index === currentIndex
                  ? indicatorSelected
                  : indicatorNotSelected
              }
            />
          </button>
        ))}
      </div>
      <div className={arrowContainer}>
        <button onClick={decrementIndex}>
          <ArrowPrev />
        </button>
        <button onClick={incrementIndex}>
          <ArrowNext />
        </button>
      </div>
    </div>
  );
}

export default Carousel;

const container = css({
  position: "relative",
  height: "500px",
  width: "1000px",
});

const imageStyle = css({
  position: "absolute",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  transition: "opacity 3s ease",
  zIndex: -1,
});

const imageVisible = css({
  opacity: 1,
});

const imageInvisible = css({
  opacity: 0,
  pointerEvents: "none",
});

const arrowContainer = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "2%",
  right: "2%",

  "& button": {
    color: "rgba(255,255,255,0.3)",
    cursor: "pointer",
    width: "50px",
    height: "50px",
  },
});

const indicatorsContainer = css({
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  gap: "5px",
  top: "0%",
  left: "0",
  right: "0",

  "& svg": {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
});

const textContainer = css({
  cursor: "pointer",
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "white",
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  padding: "10px",
  textAlign: "center",
});

const indicatorSelected = css({
  color: "white",
});

const indicatorNotSelected = css({
  color: "lightgrey",
});
