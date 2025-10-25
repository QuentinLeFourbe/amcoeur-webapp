import { css, cx } from "../../../../../styled-system/css";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label(props: LabelProps) {
  return <label {...props} className={cx(props.className, labelStyle)} />;
}

const labelStyle = css({});
