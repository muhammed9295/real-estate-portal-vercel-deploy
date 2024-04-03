"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiLogOutCircle } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  // Logout user
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://real-estate-portal.onrender.com/api/agents/logout-agent",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/agent-login");
    } catch (error) {
      console.log(error);
    }
  };
  // Logout user

  return (
    <div className="bg-white w-screen min-h-[60px] drop-shadow-md px-8 grid gap-4 grid-cols-2">
      <div className=" flex items-center">
        <Link href="/agent-dashboard">
          <Image src="/logo-light.png" width={120} height={50} alt="logo" />
        </Link>
      </div>
      <div className=" flex gap-5 items-center justify-end pr-5">
        <IoNotifications className="text-2xl" />

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarImage src="/noavatar.png" alt="profile-pic" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/agent-dashboard/profile/:id">
              <DropdownMenuItem className="text-base cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/wishlist">
              <DropdownMenuItem className="text-base cursor-pointer">
                My Wishlists
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-base cursor-pointer">
              Team
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base cursor-pointer">
              Subscription
            </DropdownMenuItem>
            <Button
              onClick={handleLogout}
              className="my-3 w-full font-normal text-lg hover:bg-secondary hover:text-white"
            >
              <BiLogOutCircle className=" mr-2" /> Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
