import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Divider,
  Header,
  Button,
  Menu,
} from "semantic-ui-react";

import AddMetrics from "./addMetric";

const Dashboard = () => {

  return(
  <>
    <Menu secondary style={{ marginTop: "1em" }}>
      <Container>
        <Menu.Item name="home" />
        <AddMetrics />
        <Menu.Menu position="right">
        <Button>Log out</Button>
        </Menu.Menu>
      </Container>
    </Menu>
    <Divider/>

    <Container text style={{ marginTop: "3em" }}>
      <Header as="h1">Metrics Timeline</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
    </Container>
  </>
);
  };

export default Dashboard;
