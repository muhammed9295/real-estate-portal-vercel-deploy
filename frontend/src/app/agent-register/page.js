"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form Validation before submitting
  const validateForm = () => {
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all the fields");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };
  // Form Validation before submitting

  // Register agent
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/agents/register-agent",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(true);
      toast.success(response.data.message);
      router.push("/agent-login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Register agent

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
        <div className="p-10 bg-white border rounded-md flex flex-col items-center md:w-2/5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center w-full"
          >
            <h2 className="text-2xl font-bold">Register</h2>
            <Input
              placeholder="First Name"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <span className="flex flex-col gap-5 w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </span>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {loading ? (
              <Button disabled className="w-full hover:bg-secondary">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full hover:bg-secondary">Register</Button>
            )}
          </form>
          <span className="flex gap-2 justify-center items-center w-full my-3">
            <Separator className="w-1/2" />
            <p className="text-[12px] text-gray-400">or</p>
            <Separator className="w-1/2" />
          </span>
          <Link href="/agent-login" className="w-full">
            <Button className="w-full bg-secondary hover:bg-primary ">
              Login
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
