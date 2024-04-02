"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Link from "next/link";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
        
      if (response.data.statusCode === 200){
        toast.success("Login success")
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        router.push("/")
      }else{
        toast.error("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login Error: ", error);
      toast.error("An error occurred while logging in. Please try again.")
    }
  };

  return (
    <div className="w-full grid grid-cols-12 bg-white">
      <div className="hidden lg:grid lg:col-span-6 h-dvh bg-[url(/login-image.jpg)] bg-cover bg-center bg-no-repeat"></div>
      <div className="col-span-12 lg:col-span-6">
        <div className="flex justify-center h-dvh items-center p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-1/2 p-10 sm:p-20 border flex flex-col gap-8 items-center rounded-md"
        >
          <h2 className="text-3xl font-bold">Login</h2>
          <span className="w-full flex flex-col gap-2">
            <Label className="font-bold text-base">Email</Label>
            <Input type="text" className="h-11" onChange={(e) => setEmail(e.target.value)} />
          </span>

          <span className="w-full flex flex-col gap-2">
            <Label className="font-bold text-base">Password</Label>
            <Input
              type="password"
              className="h-11"
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>

          <Button
            type="submit"
            className="w-32 text-white text-lg font-semibold hover:bg-secondary hover:text-white"
          >
            Login
          </Button>
          <Toaster />
          <p className="text-sm">
            If you are not a user? <Link href="/register"><em className="font-bold hover:text-secondary">Register</em></Link>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}

export default page;
