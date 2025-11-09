import React, { useState } from "react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const timeControls = [
  { label: "Bullet", value: "BULLET", description: "1 + 0 or 2 + 1" },
  { label: "Blitz", value: "BLITZ", description: "3 + 2 or 5 + 0" },
  { label: "Rapid", value: "RAPID", description: "10 + 0 or 15 + 10" },
  { label: "Classical", value: "CLASSICAL", description: "30 + 20 or more" },
];

export default function StartGame() {
  const [selectedTime, setSelectedTime] = useState("BLITZ");
  const [selectedColor, setSelectedColor] = useState("RANDOM");
  const navigate = useNavigate();

  const handleStartGame = async () => {
    // TODO: connect to your backend / matchmaking service
    // e.g. await api.post("/game/start", { timeControl: selectedTime, color: selectedColor });
    console.log("Starting game with:", selectedTime, selectedColor);
    navigate("/play"); // redirect to board page
  };

  return (
    <Card className="rounded-2xl shadow-md p-6 w-full max-w-md bg-white border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Start a New Game
      </h2>

      {/* Time Control Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Choose Time Control
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {timeControls.map((t) => (
            <button
              key={t.value}
              onClick={() => setSelectedTime(t.value)}
              className={`p-3 border rounded-xl text-sm font-medium transition ${
                selectedTime === t.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div>{t.label}</div>
              <div className="text-xs text-gray-400">
                {selectedTime === t.value ? "" : t.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Choose Your Color
        </h3>
        <div className="flex gap-3">
          {["WHITE", "BLACK", "RANDOM"].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`flex-1 py-2 rounded-xl border text-sm font-medium transition ${
                selectedColor === color
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              {color === "WHITE"
                ? "White ♔"
                : color === "BLACK"
                ? "Black ♚"
                : "Random 🎲"}
            </button>
          ))}
        </div>
      </div>

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