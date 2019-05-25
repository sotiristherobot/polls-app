import React from "react";
import { Heading } from "grommet";

/**
 * Uses component composition to wrap prop children around a <Heading/>
 * @param props
 */
export default function Header(props) {
  return <Heading margin="none">{props.children}</Heading>;
}
