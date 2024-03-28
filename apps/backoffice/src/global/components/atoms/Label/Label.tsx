import { css } from "../../../../../styled-system/css";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label(props: LabelProps) {
  return <label className={labelStyle} {...props} />;
}

const labelStyle = css({
  fontWeight: "bold",
});
