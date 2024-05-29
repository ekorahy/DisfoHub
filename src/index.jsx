import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import store from "./states";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>,
);
