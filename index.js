import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

console.log("React App is Starting..."); // Debugging Log

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
