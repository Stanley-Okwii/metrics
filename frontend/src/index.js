import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import * as serviceWorker from "./serviceWorker";


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App/>);

serviceWorker.unregister();
