import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import OAuthCallback from "./screens/OAuthCallback.tsx";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login.tsx";
import Game from "./screens/Game.tsx";
import Home from "./screens/Home.tsx";
import UserName from "./screens/UserName.tsx";
import Navbar from "./components/NavBar.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App/>
  // </StrictMode>,
);

initThemeMode();
