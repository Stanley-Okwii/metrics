import React from "react";
import { Provider } from "react-redux";

import store from "./redux/store";
import RoutesApp from "./components/routes";

export const App = () => {
  return (
      <Provider store={store}>
        <RoutesApp />
      </Provider>
  );
};

export default App;
