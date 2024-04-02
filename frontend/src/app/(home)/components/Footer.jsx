import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FaPhoneVolume, FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-gray-900 p-10 md:p-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-0 justify-between px-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg text-white font-bold">Office Address</h2>
          <span>
            <h3 className="text-gray-400">Head Office</h3>
            <p className="font-semibold text-white">
              2118 Thornridge Cir. Syracuse, Connecticut 35624
            </p>
          </span>
          <span>
            <h3 className="text-gray-400 ">Head Office</h3>
            <p className="font-semibold text-white">
              2118 Thornridge Cir. Syracuse, Connecticut 35624
            </p>
          </span>
          <Separator className="bg-gray-800" />
          <p className="font-semibold text-white">
            3517 W. Gray St. Utica, Pennsylvania 57867
          </p>
        </div>

        <div className="">
          <h2 className="text-lg text-white font-bold">Contact Information</h2>
          <div className="">
            <div className="flex gap-5 items-center py-5 text-white">
              <FaPhoneVolume className="text-4xl" />
              <span>
                <p>Hotline:</p>
                <p className="font-bold">(201) 555-0124</p>
              </span>
            </div>

            <Separator className="bg-gray-800" />

            <div className="flex gap-5 items-center py-5 text-white">
              <FiMail className="text-4xl" />
              <span>
                <p>Email:</p>
                <p className="font-bold">Realestatecp@gmail.com</p>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-white">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <Link href="/buy">
            <li className="flex gap-1 items-center font-semibold hover:text-primary cursor-pointer">
              <IoMdArrowDropright className="text-primary" /> Property For Sale
            </li>
            </Link>
            <Link href="/rent">
            <li className="flex gap-1 items-center font-semibold hover:text-primary cursor-pointer">
              <IoMdArrowDropright className="text-primary"/> Property For Rent
            </li>
            </Link>
            <Link href="/about-us">
            <li className="flex gap-1 items-center font-semibold hover:text-primary cursor-pointer">
              <IoMdArrowDropright className="text-primary" /> About Us
            </li>
            </Link>
            <Link href="/agent-dashboard">
            <li className="flex gap-1 items-center font-semibold hover:text-primary cursor-pointer">
              <IoMdArrowDropright className="text-primary" /> Agents
            </li>
            </Link>
            <Link href="/career">
            <li className="flex gap-1 items-center font-semibold hover:text-primary cursor-pointer">
              <IoMdArrowDropright className="text-primary" /> Careers
            </li>
            </Link>
          </ul>
        </div>

        <div className="flex flex-col gap-3 ">
          <h2 className="text-lg font-bold text-white">Newsletter</h2>
          <p className="font-semibold text-white">Sign up to receive the latest article</p>
          <Input className="h-12 bg-white" placeholder="Your Email Address" />
          <Button className="py-5 text-text">Subscribe</Button>
        </div>
      </div>
      <Separator className="my-8 bg-gray-800" />
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <Image src="/logo-dark.png" width={200} height={200} alt="logo"/>
        <p className="text-white text-center">Copyright © 2024 Real estate CP. Designed & Developed by mdshk</p>
        <span className="flex gap-5 ">
        <FaFacebook className="text-white hover:text-primary cursor-pointer text-2xl"/>
        <FaInstagram className="text-white hover:text-primary cursor-pointer text-2xl"/>
        <FaXTwitter className="text-white hover:text-primary cursor-pointer text-2xl"/>
        <FaLinkedin className="text-white hover:text-primary cursor-pointer text-2xl"/>
        </span>
      </div>
    </div>
  );
}

export default Footer;
