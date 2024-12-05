import { css } from "../../../../../styled-system/css";

function Loader() {
  return <div className={loader} />;
}

export default Loader;

// const loader = css({
//   width: "calc(6 * 30px)",
//   height: "50px",
//   display: "flex",
//   color: "#8d7958",
//   filter:
//     "drop-shadow(30px 25px 0 currentColor) drop-shadow(60px 0 0 currentColor) drop-shadow(120px 0 0 currentColor)",
//   clipPath: "inset(0 100% 0 0)",
//   animation: "l12 2s infinite steps(7)",
//
//   "&::before": {
//     content: '""',
//     width: "30px",
//     height: "25px",
//     "--c":
//       "no-repeat radial-gradient(farthest-side, currentColor 92%, transparent)",
//     background: `
//       var(--c) left / 70% 70%,
//       var(--c) right / 20% 20%,
//       var(--c) top 0 right 15% / 20% 20%,
//       var(--c) bottom 0 right 15% / 20% 20%
//     `,
//   },
// });

const loader = css({
  width: "50px",
  height: "50px",
  aspectRatio: "1",
  borderRadius: "50%",
  background: `
    radial-gradient(farthest-side, #FFC0CB 94%, transparent) top/8px 8px no-repeat,
    conic-gradient(transparent 30%, #FFC0CB)
  `,
  WebkitMask:
    "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
  animation: "rotate 1s infinite linear",
});
