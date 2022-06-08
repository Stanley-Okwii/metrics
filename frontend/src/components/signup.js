import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

import { signup } from "../redux/actions/authentication";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Create an account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event?.target?.value)}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="e-mail"
              value={email}
              autoComplete="username"
              onChange={(event) => setEmail(event?.target?.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={(event) => setPassword(event?.target?.value)}
            />
            <Button
              color="teal"
              fluid
              size="large"
              onClick={() => {
                const data = {
                  email,
                  password,
                  username,
                };
                dispatch(signup(data));
              }}
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Have account already? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUpForm;
