import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import Card from "../components/Card";

export default function OAuthCallback(){
  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  const setUserName = useAuthStore(state=>state.setUserName);
  const setTempToken = useAuthStore(state => state.setTempToken);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const temp = params.get("tempToken");
    const status = params.get("status");
    const username = params.get("username");
    if (status === "success" && token) {
      console.log(params);
      // ✅ Normal login flow
      setToken(token);
      if(username) setUserName(username);
      navigate("/home", { replace: true });
    }

    else if (status === "pending_registration" && temp) {
      setTempToken(temp);
      navigate("/usernameSetup", { replace: true });
    }
  }, []);
  return (
    <Card>
      <div className="flex items-center content-center"></div>OAuth Callback Screen
    </Card>
  )
}