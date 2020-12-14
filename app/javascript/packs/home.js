import App from "../components/App";
import React from "react";
import ReactDOM from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  const $app = document.querySelector("#app");

  ReactDOM.render(<App songs={JSON.parse($app.dataset.songs)} />, $app);
});
