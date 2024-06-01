import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Provider } from "react-redux";
import store from "./states";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
