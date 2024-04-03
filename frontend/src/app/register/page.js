"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { baseUrl } from "@/url";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form Validation before submitting
  const validateForm = () => {
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all the fields!!");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email!!");
      return false;
    }

    return true;
  };
  // Form Validation before submitting

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
        `${baseUrl}/api/users/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(true);
      // toast message
      toast.success("Registered Successfully!!");

      // Redirecting to Login Page
      router.push("/login");
    } catch (error) {
      // toast message
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-12 bg-white">
      <div className="hidden lg:grid lg:col-span-6 h-dvh bg-[url(/login-image.jpg)] bg-cover bg-center bg-no-repeat"></div>
      <div className="col-span-12 lg:col-span-6">
        <div className="flex justify-center h-dvh items-center p-10">
          <form
            className="w-full sm:w-1/2 p-10 sm:p-20 border flex flex-col gap-5 items-center rounded-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold">Register</h2>
            <div className=" w-full flex flex-col lg:flex-row gap-3">
              <span className="flex flex-col gap-2 ">
                <Label className="text-base">Firstname</Label>
                <Input
                  type="text"
                  className="h-11"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </span>
              <span className="flex flex-col gap-2">
                <Label className="text-base">Lastname</Label>
                <Input
                  type="text"
                  className="h-11"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </span>
            </div>
            <span className="w-full flex flex-col gap-2">
              <Label className="text-base">Email</Label>
              <Input
                type="text"
                className="h-11"
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>

            <span className="w-full flex flex-col gap-2">
              <Label className="text-base">Password</Label>
              <Input
                type="text"
                className="h-11"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            {loading ? (
              <Button
                disabled
                className="w-32 text-white text-lg font-semibold hover:bg-secondary hover:text-white"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-32 text-white text-lg font-semibold hover:bg-secondary hover:text-white"
              >
                Register
              </Button>
            )}

            <p className="text-sm">
              If you are not a user? 
              <Link href="/login">
                <em className="font-bold hover:text-secondary">Login</em>
              </Link>
            </p>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Register;
