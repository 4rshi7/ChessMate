import { useAuthStore } from "../store/authStore";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { GiKing } from "react-icons/gi";
import  king from "../assets/queen.png"
export default function NavBar(){
  const token = useAuthStore((state) => state.token);
  return (
    <Navbar fluid rounded>
      <NavbarBrand >
        <img src={king} className="mr-2 h-6 sm:h-10" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold ">ChessMate</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {/* implement log in/out here */}
        <Button>Log Out</Button> 
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/home">Dashboard</NavbarLink>
        <NavbarLink href="/queue">Play</NavbarLink>
        <NavbarLink  href="/games">Games</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

{/* <Navbar className="w-full h-16 bg-white shadow-md flex items-center justify-between px-16">
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
    </Navbar> */}