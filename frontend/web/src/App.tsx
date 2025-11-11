import { Card } from "flowbite-react";
import Navbar from "./components/Navbar";
import OAuthCallback from "./screens/OAuthCallback.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login.tsx";
import Game from "./screens/Game.tsx";
import Home from "./screens/Home.tsx";
import UserName from "./screens/UserName.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import { useAuthStore } from "./store/authStore.ts";
import { useUserStore } from "./store/userStore.ts";
import { useEffect } from "react";
import Queue from "./screens/Queue.tsx";


export default function App({children}: {children?: React.ReactNode}) {
  const  token = useAuthStore(state=>state.token);
  const fetchUserInfo = useUserStore(state=>state.fetchUserInfo);
  useEffect(()=>{
     if (token) {
      fetchUserInfo();
    }
  },[token])
  return(
    <BrowserRouter>
        {/* <ThemeInit /> */}
         <Routes>
          <Route element={<MainLayout></MainLayout>}>
          {/* <Route path="/"  element={<App></App>}></Route> */}
          <Route path="/queue" element={<Queue></Queue>}></Route>
          <Route path="/home"  element={<Home></Home>}></Route>
          <Route path="/game/:gameId" element={<Game></Game>}></Route>
          <Route path="/login"  element={<Login></Login>}></Route>
          <Route path="/oauth-callback"  element={<OAuthCallback></OAuthCallback>}></Route>
          <Route path="/usernameSetup"  element={<UserName></UserName>}></Route>
          </Route>
        </Routes>
        </BrowserRouter>
  )
}
