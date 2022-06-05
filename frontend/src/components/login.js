import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log in
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              color="teal"
              fluid
              size="large"
              onClick={() => {
                const data = {
                  email,
                  password,
                };
                console.log("login data ", data);
              }}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
