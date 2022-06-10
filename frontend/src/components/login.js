import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

import { login } from "../redux/actions/authentication";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state?.auth?.login?.success)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(isLoggedIn){
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
              autoComplete="username"
              onChange={(event) => setEmail(event?.target?.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              value={password}
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
                };
                dispatch(login(data));
              }}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
