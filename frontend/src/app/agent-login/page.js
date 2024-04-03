"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Login User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://real-estate-portal.onrender.com/api/agents/login-agent",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        localStorage.setItem("access_token", response.data.data.accessToken);
        localStorage.setItem("refresh_token", response.data.data.refreshToken);
        router.push("/agent-dashboard");
      } else {
        toast.error("Login failed. Please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };
  // Login User

  return (
    <div className="w-full h-dvh flex">
      <div className="hidden lg:flex w-1/3 bg-[url(/register-image.jpg)] bg-cover bg-center bg-no-repeat flex-col justify-between">
        <div className="p-5">
          <Image src="/logo-light.png" width={150} height={150} alt="logo" />
        </div>

        <h1 className="p-5 text-5xl font-extrabold text-black">
          Multipurpose tool to succeed your business
        </h1>
      </div>

      <div className="w-full p-10 flex flex-col items-center justify-between lg:w-2/3">
        <div className="hidden lg:flex"></div>
        <Image
          className="lg:hidden"
          src="/logo-light.png"
          width={150}
          height={150}
          alt="logo"
        />
        <div className="p-10 bg-white border rounded-md flex flex-col items-center md:w-1/2 lg:w-2/5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center w-full lg:gap-8"
          >
            <h2 className="text-2xl font-bold">Login</h2>
            <Input
              placeholder="Email"
              className="h-10"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              placeholder="Password"
              className="h-10"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" className="w-full hover:bg-secondary">Login</Button>
          </form>
          <span className="flex gap-2 justify-center items-center w-full my-3">
            <Separator className="w-1/2" />
            <p className="text-[12px] text-gray-400">or</p>
            <Separator className="w-1/2" />
          </span>
          <Link href="/agent-register" className="w-full">
            <Button className=" w-full bg-secondary hover:bg-primary ">
              Register
            </Button>
          </Link>
        </div>
        <p className="text-[10px] text-gray-600">
          Protected by reCAPTCHA and subject to the mdshk properties Privacy
          Policy and Terms of Service.
        </p>
        <Toaster />
      </div>
    </div>
  );
}

export default page;
