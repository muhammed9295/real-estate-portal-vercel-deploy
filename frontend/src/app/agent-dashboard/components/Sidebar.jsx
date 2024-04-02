"use client";
import { Separator } from "@/components/ui/separator";
import {
  FaBuilding,
  FaPlus,
  FaArrowTrendUp,
  FaUser,
  FaVectorSquare,
  FaTeamspeak,
} from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-white h-[calc(100dvh-60px)] p-5">
      <ul className="hidden lg:flex flex-col gap-1 mt-5">
        <Link href="/agent-dashboard/all-listings">
          <li
            className={
              pathname === "/agent-dashboard/all-listings"
                ? "bg-secondary flex items-center gap-2 text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg text-white"
                : "hover:bg-secondary hover:text-white text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg flex items-center gap-2"
            }
          >
            <FaBuilding className="text-2xl" /> All Listings
          </li>
        </Link>

        <Separator />

        <Link href="/agent-dashboard/create-listing">
          <li className={ pathname === "/agent-dashboard/create-listing"
                ? "bg-secondary flex items-center gap-2 text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg text-white"
                : "hover:bg-secondary hover:text-white text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg flex items-center gap-2"}>
            <FaPlus className="text-2xl" /> Create New
          </li>
        </Link>

        <Separator />

        <Link href="/agent-dashboard/profile/:id">
          <li className={ pathname === "/agent-dashboard/profile/:id"
                ? "bg-secondary flex items-center gap-2 text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg text-white"
                : "hover:bg-secondary hover:text-white text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg flex items-center gap-2"}>
            <FaUser className="text-2xl" /> Profile
          </li>
        </Link>

        <Separator />

        <Link href="#">
          <li className="hover:bg-secondary hover:text-white text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg flex items-center gap-2">
            <FaArrowTrendUp className="text-2xl" /> Analytics
          </li>
        </Link>

        <Separator />

        <Link href="#">
          <li className="hover:bg-secondary hover:text-white text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg flex items-center gap-2">
            <FaVectorSquare className="text-2xl" /> Advertisement
          </li>
        </Link>

        <Separator />

        <Link href="#">
          <li className="hover:bg-secondary hover:text-white text-lg font-semibold cursor-pointer py-3 px-2 rounded-lg flex items-center gap-2">
            <FaTeamspeak className="text-2xl" /> Get in touch
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
