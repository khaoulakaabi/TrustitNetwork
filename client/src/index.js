import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
  <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById("root")
);