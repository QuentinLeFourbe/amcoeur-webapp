import { ComponentProps } from "react";

import { css, cx } from "../../../../../styled-system/css";

function ContentTemplate(props: ComponentProps<"section">) {
  return (
    <section
      {...props}
      className={cx(
        props.className,
        css({
          margin: "5vh 20vw",
        }),
      )}
    />
  );
}

export default ContentTemplate;
