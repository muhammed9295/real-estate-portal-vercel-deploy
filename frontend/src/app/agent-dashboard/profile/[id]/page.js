"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";
import { baseUrl } from "@/url";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState("");
  const [updateAgent, setUpdateAgent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phone: "",
    avatar: null,
  });
  const router = useRouter();

  // Fetch current agent data
  useEffect(() => {
    const fetchAgentData = async () => {
      const response = await axios.get(
        `${baseUrl}/api/agents/get-agent`,
        { withCredentials: true }
      );
      setAgent(response.data.data);
    };
    fetchAgentData();
  }, []);
  // Fetch current agent data

  // Update current agent data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateAgent({ ...updateAgent, [name]: value });
  };

  const handleFileChange = (e) => {
    setUpdateAgent({ ...updateAgent, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const agentDataToSend = new FormData();
    Object.keys(updateAgent).forEach((key) => {
      if (updateAgent[key] !== null) {
        agentDataToSend.append(key, updateAgent[key]);
      }
    });

    try {
      const response = await axios.patch(
        `${baseUrl}/api/agents/update-agent`,
        agentDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setUpdateAgent(response.data.data);
      router.push("/agent-dashboard");
    } catch (error) {
      toast.error("Failed to update. Please try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Update current agent data

  return (
    <div className="bg-white grid gap-5 p-10 rounded-lg drop-shadow-md">
      <h2 className="text-xl font-bold w-full">Profile</h2>

      <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-12">
        <div className="sm:col-span-2">
          <Image
            src={agent? agent.avatar : "/noavatar.png"}
            width={300}
            height={300}
            className="rounded-full"
            alt="profile-pic"
          />
        </div>
        <div className=" sm:col-span-10 p-5">
          <div className="flex flex-col lg:flex-row gap-8 py-2">
            <span className="w-full flex flex-col gap-2">
              <Label className="font-semibold text-base">First Name</Label>
              <Input
                className="h-11"
                placeholder={agent.firstName}
                type="text"
                name="firstName"
                value={updateAgent.firstName}
                onChange={handleChange}
              />
            </span>

            <span className="w-full flex flex-col gap-2">
              <Label className="font-semibold text-base">Last Name</Label>
              <Input
                className="h-11"
                placeholder={agent.lastName}
                type="text"
                name="lastName"
                value={updateAgent.lastName}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 py-2">
            <span className="w-full flex flex-col gap-2">
              <Label className="font-semibold text-base">Email</Label>
              <Input
                className="h-11"
                placeholder={agent.email}
                type="email"
                name="email"
                value={updateAgent.email}
                onChange={handleChange}
              />
            </span>

            <span className="w-full flex flex-col gap-2">
              <Label className="font-semibold text-base">Phone Number</Label>
              <Input
                className="h-11"
                placeholder={agent.phone}
                type="text"
                name="phone"
                value={updateAgent.phone}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 py-2">
            <span className="w-full flex flex-col gap-3">
              <Label className="font-semibold text-base">Company</Label>
              <Input
                className="h-11"
                placeholder={agent.companyName}
                type="text"
                name="companyName"
                value={updateAgent.companyName}
                onChange={handleChange}
              />
            </span>

            <span className="w-full flex flex-col gap-3">
              <Label className="font-semibold text-base">Profile Picture</Label>
              <Input className="h-11" type="file" onChange={handleFileChange} />
            </span>
          </div>

          <div className="flex sm:justify-center lg:justify-end mt-10">
            {loading ? (
              <Button
                disabled
                className="w-40 text-text font-semibold  hover:bg-secondary hover:text-white "
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-40 text-text font-semibold  hover:bg-secondary hover:text-white "
              >
                Update
              </Button>
            )}
          </div>
        </div>
        <Toaster />
      </form>
    </div>
  );
}

export default Profile;
