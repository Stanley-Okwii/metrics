import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./dashboard";
import SignUp from "./signup";
import LoginForm from "./login";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const RoutesApp = () => (
    <Router>
        <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LoginForm />} />
        </Routes>
    </Router>
);

export default RoutesApp;
