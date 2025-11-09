import { Rating } from "flowbite-react";
import Card from "../components/Card";
import Profile from "../components/Profile";
import RatingProgress from "../components/StartGame";
import QuickStats from "../components/QuickStats";
import RecentGames from "../components/RecentGames";
import StartGame from "../components/StartGame";

export default function Home(){
  return (
    <div className="px-12">
      <h1 className="text-4xl font-bold mt-4">Your Dashboard</h1>
      <h2 className="text-lg font-medium mt-2">Welcome back! Here's your chess progress overview.</h2>
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
  {/* Left side */}
  <div className="lg:col-span-1 space-y-6">
    <Profile></Profile>
    <QuickStats></QuickStats>
  </div>

  {/* Right side */}
  <div className="lg:col-span-3 space-y-6">
        <StartGame></StartGame>
        <RecentGames></RecentGames>
  </div>
</div>
    </div>
  )
}
