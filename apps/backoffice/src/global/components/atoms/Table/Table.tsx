import { ComponentProps, } from "react"
import { css, cx } from "../../../../../styled-system/css"

type TableProps = ComponentProps<"table">

function Table(props: TableProps) {
  return (
    <table {...props} className={cx(style, props.className)}/>
  )
}

export default Table

const style = css({
  "& th": {
    padding: "1rem",
    textAlign: "left",
  backgroundColor: "rose.600",
  },

  "& td": {
    padding: "1rem 1rem",
    textAlign: "left",
    borderColor: "rose.100",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
  },

  "& tr:hover": {
    backgroundColor: "#444",
  },
})
