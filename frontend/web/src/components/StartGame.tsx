import React, { useState } from "react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";


export default function StartGame() {
  const [selectedTime, setSelectedTime] = useState("BLITZ");
  const navigate = useNavigate();

  const handleStartGame = async () => {
    // TODO: connect to your backend / matchmaking service
    // e.g. await api.post("/game/start", { timeControl: selectedTime, color: selectedColor });
    console.log("Starting game with:", selectedTime);

    

    navigate("/play"); // redirect to board page
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