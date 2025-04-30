import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/Auth.css";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);