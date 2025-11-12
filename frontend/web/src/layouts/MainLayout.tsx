import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always visible */}
      <Navbar />
      {/* Page content goes here */}
      <main className="flex-1 p-4 bg-gray-200">
        <Outlet />
      </main>
    </div>
  );
}
