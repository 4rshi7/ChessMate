import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import Card from "./Card";
import { useAuthStore } from "../store/authStore";
import defaultAvatar from "../assets/bishop.png"

export default function Profile(){
   const { user, loading } = useUserStore();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white shadow rounded-xl">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 bg-white shadow rounded-xl">
        <p className="text-gray-500">No user data available.</p>
      </div>
    );
  }

  // Safely destructure with fallback values
  const {
    username,
    displayName,
    photoUrl,
    dateJoined,
    ratings,
  } = user;

  const rating = ratings?.blitz ?? 1200; // show blitz rating or fallback
  const joinDate = new Date(dateJoined).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100 w-full max-w-sm">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 mb-4">
        <img
          src={photoUrl || defaultAvatar}
          alt={displayName || username}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Username */}
      <h2 className="text-lg font-semibold text-gray-900">{username}</h2>

      {/* Rating */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="text-yellow-500 text-lg">🏆</span>
        <span className="text-2xl font-bold text-indigo-600">{rating}</span>
      </div>

      {/* Joined Date */}
      <p className="text-sm text-gray-500 mt-1">Joined {joinDate}</p>

      {/* Divider */}
      <div className="w-full border-t border-gray-200 my-4" />

      {/* Rank & Goal */}
      <div className="flex flex-col gap-2 w-full text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Current Rank</span>
          <span className="font-medium text-gray-900">
            {rating >= 1800
              ? "Expert"
              : rating >= 1500
              ? "Intermediate"
              : "Beginner"}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Next Goal</span>
          <span className="font-medium text-indigo-600">
            {rating + 100} Rating
          </span>
        </div>
      </div>
    </div>
  );
}