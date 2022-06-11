import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Divider,
  Header,
  Button,
  Menu,
  Loader,
} from "semantic-ui-react";

import AddMetrics from "./addMetric";
import TimeLine from "./timeline";

import { logout } from "../redux/actions/authentication";
import { fetchMetrics } from "../redux/actions/metrics";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutSuccess = useSelector(state => state?.auth?.logoutSuccess);
  const isLoading = useSelector(state => state.metrics?.metrics?.loading);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      dispatch(fetchMetrics());
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token && logoutSuccess){
      navigate("/login");
    }
  }, [logoutSuccess, navigate]);

  return(
  <>
    <Menu secondary style={{ marginTop: "1em" }}>
      <Container>
        <Menu.Item name="home" />
        <AddMetrics />
        <Menu.Menu position="right">
        <Button onClick={() => dispatch(logout())}>Log out</Button>
        </Menu.Menu>
      </Container>
    </Menu>
    <Divider/>

    <Container text style={{ marginTop: "3em" }}>
      <Header as="h1">Metrics Timeline</Header>
      <p>A timeline of temperature(C) over time.</p>
      <div style={{ width: "100%", height: "400px", marginLeft: "-10%" }}>
      {!isLoading && <TimeLine />}
      {isLoading && <Loader active size='huge' />}
      </div>
    </Container>
  </>
);
  };

export default Dashboard;
