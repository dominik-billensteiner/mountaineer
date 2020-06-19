import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Mountaineer from "./components/Mountaineer/Mountaineer";
import * as serviceWorker from "./serviceWorker";

const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Mountaineer />
    </React.StrictMode>,
    document.getElementById("root")
  );
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register();
};

if (window.cordova) {
  // for iOS / Android
  document.addEventListener("deviceready", startApp, false);
} else {
  // for Web
  startApp();
}
