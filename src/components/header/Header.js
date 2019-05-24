import React from "react";
import { Box, Heading } from "grommet";

/**
 * Uses component composition to wrap prop children around a <Heading/>
 * @param props
 */
export default function Header(props) {
  return (
    <Box>
      <Heading margin="none">{props.children}</Heading>
    </Box>
  );
}
