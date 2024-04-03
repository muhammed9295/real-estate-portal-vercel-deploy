"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function ProfilePage() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const router = useRouter();

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        "https://real-estate-portal.onrender.com/api/users/current-user",
        { withCredentials: true }
      );
      setUser(response.data.data);
    };

    fetchUserData();
  }, []);
  // Fetch current user data

  // Update user data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userDataToSend = new FormData();
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== null) {
        userDataToSend.append(key, userData[key]);
      }
    });

    try {
      const response = await axios.patch("https://real-estate-portal.onrender.com/api/users/update-profile", userDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Profile Updated Successfully");
      setUserData(response.data.data);
      router.push("/");
    } catch (error) {
      toast.error("Failed to update. Please try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update user data

  return (
    <div className="p-10 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center"
      >
        <Image
          src={user ? user.avatar : "/noavatar.png"}
          alt="profile-pic"
          width={300}
          height={300}
          className="rounded-full drop-shadow-lg"
        />
        <div className="bg-primary relative px-2 py-3 w-32 rounded-md hover:bg-secondary hover:text-white cursor-pointer">
          <p className="text-sm text-center font-bold">Change Avatar</p>
          <input
            type="file"
            className="appearance-none opacity-0 absolute px-2 py-3 top-0 left-0 w-32 cursor-pointer"
            accept="image/*"
            name="avatar"
            onChange={handleFileChange}
          />
        </div>
        <span className="flex flex-col items-center gap-1">
          <h3 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm">{user.email}</p>
        </span>

        <div className="flex flex-col items-center gap-5 w-full md:px-28 lg:px-80">
          <span className="md:w-full lg:w-3/4">
            <Label className="text-base">Firstname</Label>
            <Input
              className="lg:h-12 bg-white my-2"
              type="text"
              placeholder={user.firstName}
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </span>
          <span className="md:w-full lg:w-3/4">
            <Label className="text-base">Lastname</Label>
            <Input
              className="lg:h-12 bg-white my-2"
              type="text"
              placeholder={user.lastName}
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </span>
        </div>

        <div className="flex flex-col items-center gap-5 w-full md:px-28 lg:px-80">
          <span className="md:w-full lg:w-3/4">
            <Label className="text-base">Email</Label>
            <Input
              className="lg:h-12 bg-white my-2"
              type="text"
              placeholder={user.email}
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </span>
          <span className="md:w-full lg:w-3/4">
            <Label className="text-base">Phone</Label>
            <Input
              className="lg:h-12 bg-white my-2"
              type="text"
              placeholder={user.phone}
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </span>
        </div>
        {loading ? (
          <Button
            disabled
            className="w-28 text-text font-bold hover:bg-secondary hover:text-white my-3"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-28 text-text font-bold hover:bg-secondary hover:text-white my-3"
          >
            Update
          </Button>
        )}

        <Toaster />
      </form>
    </div>
  );
}

export default ProfilePage;
