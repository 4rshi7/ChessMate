import React from 'react'
import Card from './Card'
import { useUserStore } from '../store/userStore';

const QuickStats = () => {
  const { user, loading } = useUserStore();
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <p className="text-gray-500">Loading stats...</p>
      </div>
    );
  }

  if (!user || !user.statistics) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <p className="text-gray-500">No stats available.</p>
      </div>
    );
  }

  const { statistics, ratings } = user;
  const favoriteControl =
    Object.entries(ratings || {}).reduce(
      (best, [key, value]) =>
        value > (ratings?.[best as keyof typeof ratings] || 0)
          ? key
          : best,
      "blitz"
    ) || "blitz";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 w-full max-w-sm">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Stats
      </h2>

      {/* Stats List */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-lg">🎮</span>
            <span>Games Played</span>
          </div>
          <span className="font-semibold text-gray-900">
            {statistics.totalGames}
          </span>
        </div>

        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-lg">🏆</span>
            <span>Wins</span>
          </div>
          <span className="font-semibold text-green-600">
            {statistics.wins}
          </span>
        </div>

        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-lg">❌</span>
            <span>Losses</span>
          </div>
          <span className="font-semibold text-red-500">
            {statistics.losses}
          </span>
        </div>

        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">🤝</span>
            <span>Draws</span>
          </div>
          <span className="font-semibold text-yellow-500">
            {statistics.draws}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-200 my-4" />

      {/* Favorite Control */}
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span>Favorite Control</span>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
          {favoriteControl}
        </span>
      </div>
    </div>
  );
}

export default QuickStats