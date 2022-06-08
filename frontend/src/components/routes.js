import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./dashboard";
import SignUp from "./signup";
import LoginForm from "./login";

export const AppRoutes = () => (
    <Router>
        <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LoginForm />} />
        </Routes>
    </Router>
);

export default AppRoutes;
