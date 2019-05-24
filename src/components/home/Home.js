import React, { Component } from "react";
import Header from "../header/Header";

// ui-related
import { Grommet, Box } from "grommet";

class Home extends React.Component {
  render() {
    return (
      <Grommet full={true}>
        <Box direction="column" justify="stretch" flex={true}>
          <Header>Hello world</Header>
        </Box>
      </Grommet>
    );
  }
}
export default Home;
