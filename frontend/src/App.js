import React from "react";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";

import store from "./redux/store";
import AppRoutes from "./components/routes";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  return (
      <Provider store={store}>
        <AppRoutes />
        <ToastContainer />
      </Provider>
  );
};

export default App;
