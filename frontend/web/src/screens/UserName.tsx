import Card from "../components/Card";
import king from "../assets/king (1).png"
import {SetStateAction, useState} from "react";
import { useAuthStore } from "../store/authStore";
import api from "../api/apiClients";
import axios from "axios";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

type Inputs = {
  username: string;
}
export default function UserName(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const tempToken = useAuthStore((state) => state.tempToken);
  const setToken = useAuthStore((state) => state.setToken);
  const setUserName = useAuthStore((state)=>state.setUserName)
  const fetchUser = useUserStore((state)=>state.fetchUserInfo);


  const[errors, setErrors] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(username.length < 3 || username.length > 20){
      setErrors("Username must be between 3 and 20 characters");
      return;
    }
    else{
      setErrors("");
    }

    try {
      console.log("Temp Token:", tempToken);
    const res = await api.post("/auth/register/complete", {
      username
    }, {
    headers: {
      Authorization: `Bearer ${tempToken}`,
    },
  });

    console.log("Response:", res.data);
    if(res.status === 201){
      console.log("Backend response data:", res.data);
      setToken(res.data.token);
      setUserName(username);
      await fetchUser();
      navigate("/home");
    }
    else{
      navigate("/login");
    }
    // e.g. res.data.token -> you can store it in Zustand or localStorage
  } catch (err) {
    console.error("Error completing registration:", err);
  }

  }
  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
    <Card>
     <div className="flex items-center justify-center"><img src={king} alt=" king logo " className="w-16 h-16 "></img></div>
    <div className="max-w-96 text-3xl font-bold mt-4 text-center ">Create Your ChessMate Username</div>
    <div className="mt-4 px-4 text-center">Choose a unique username to start your chess journey</div>
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="px-6">
        <label htmlFor="username" className="block text-md font-medium text-gray-700 mt-4">Username</label>
        <input 
          type="text"
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
        <div className="text-xs text-gray-400 mt-1">3-20 characters, letters and numbers only</div>
        {errors && <div className="text-red-500 text-sm mt-2">{errors}</div>}
        <button 
          type="submit"
            className="mt-4 w-full bg-blue-600 text-white font-semibold  px-4 rounded-md hover:bg-blue-700 transition py-4"
        >
          Continue
        </button>
        <div className="text-xs mt-4 ">By continuing, you agree to our Terms of Service and Privacy Policy</div>
      </form>
    </div>
    </Card>
    </div>
  )
}