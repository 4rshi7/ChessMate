import React from "react";
import { useUserStore } from "../store/userStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function RecentGames() {
  
  const { user, loading } = useUserStore();
  console.log(user)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <p className="text-gray-500">Loading recent games...</p>
      </div>
    );
  }

  if (!user?.gameHistory?.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <p className="text-gray-500">No recent games found.</p>
      </div>
    );
  }

  const games = user.gameHistory.slice(0, 5); // show latest 5 games

  const resultColor = {
    WIN: "bg-green-100 text-green-700",
    LOSS: "bg-red-100 text-red-700",
    DRAW: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Games</h2>
        <button className="text-indigo-600 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Games List */}
      <div className="space-y-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl p-4"
          >
            {/* Left: Opponent Info */}
            <div className="flex items-center gap-3">
              {/* Placeholder avatar */}
              <img
                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${game.opponentUsername}`}
                alt={game.opponentUsername}
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <div>
                <div className="text-gray-800 font-medium">
                  {game.opponentUsername}
                </div>
                <div className="text-xs text-gray-500">
                  Rating: {game.opponentRating}
                </div>
              </div>
            </div>

            {/* Middle: Result + Game Type */}
            <div className="flex flex-col items-center justify-center">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${resultColor[game.result]}`}
              >
                {game.result === "WIN"
                  ? "Won"
                  : game.result === "LOSS"
                  ? "Lost"
                  : "Draw"}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {game.timeControl}
              </span>
            </div>

            {/* Right: Time + Analyze */}
            <div className="text-right">
              <div className="text-xs text-gray-500">
                {dayjs(game.playedAt).fromNow()}
              </div>
              <button className="text-indigo-600 text-xs font-medium hover:underline">
                Analyze
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
