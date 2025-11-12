import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClients"


export default function StartGame() {
  const navigate = useNavigate();
  

  const handleStartGame = async () => {
    try{
    const res = await api.get("/matchmaking/join");
    console.log(res);
    if(res.status ==200){
      navigate('/queue');
    }
    else{
     
      console.log("server error");
    }
  }
  catch(error){
     alert("you are already in a match");
    console.error(error);
  }


  };

  return (
    <Card className="rounded-2xl shadow-md p-6 w-full max-w-md bg-white border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Start a New Game
      </h2>


      {/* Start Button */}
      <button
        onClick={handleStartGame}
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Play
      </button>
    </Card>
  );
}