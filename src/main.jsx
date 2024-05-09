import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Router from "../Router.jsx";
import Container from "./Container.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Container>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    </Provider>
  </React.StrictMode>
);
