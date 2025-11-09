import { useAuthStore } from "../store/authStore";


export default function Navbar(){
  const token = useAuthStore((state) => state.token);
  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-16">
        {token ? (
          <div className="flex justify-between items-center w-64 gap-12">
            <div className="text-xl font-bold">ChessMate</div>
            <div>Dashboard</div>
            <div>Play</div>
            <div>Games</div>
          </div>
        ) : (
          <span className="text-red-600 font-medium">Guest</span>
        )}
        <div> Profile</div>
    </nav>
  )
}