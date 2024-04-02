"use client";
import { VscSettings } from "react-icons/vsc";
import { BiSearchAlt2 } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";

function Hero() {
  const [formData, setFormData] = useState({
    neighbourhood: "",
    listingType: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValueChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   if (formData[key] !== null) {
    //     formDataToSend.append(key, formData[key]);
    //   }
    // });

    try {
      // await axios.post("", formDataToSend, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })

      const queryString = Object.entries(formData)
      .filter(([key, value])=> value)
      .map(([key, value])=> `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
      window.location.href = `/search?${queryString}`
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-10 py-10 md:py-16 md:px-20 lg:px-20">
      <div className="w-full bg-[url(/background-image.png)] bg-cover bg-center bg-no-repeat rounded-3xl drop-shadow-xl p-10 md:p-14 lg:p-20 flex flex-col gap-10 md:gap-14 lg:gap-14">
        {/* Text Container */}
        <div className="flex flex-col gap-5 md:w-5/6 lg:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            We'll help you find a place you'll love
          </h1>
          <p className="text-base md:text-lg lg:text-lg">
            With the most complete source of homes for sale & properties near
            you.
          </p>
        </div>
        {/* Text Container */}

        {/* Inputs area */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-full lg:w-[65%] flex flex-col gap-4"
        >
          <span className="flex gap-3">
            <Button className="bg-primary w-28 text-text text-base py-5 hover:bg-secondary hover:text-white">
              Buy
            </Button>
            <Button className="bg-primary w-28 text-text text-base py-5 hover:bg-secondary hover:text-white">
              Sale
            </Button>
          </span>
          <div className="bg-white w-full p-5 md:p-8 lg:p-10 rounded-xl drop-shadow-sm flex flex-col lg:flex-row gap-3 justify-center lg:items-end">
            <span className="w-full">
              <Label>Location</Label>
              <Input
                type="text"
                className="p-2 rounded-lg h-11"
                placeholder="Dubai Marina, Al Gadheer etc."
                name="neighbourhood"
                onChange={handleChange}
              />
            </span>
            <span className="w-full">
              <Label>Type</Label>
              <Select
                onValueChange={(value) =>
                  handleValueChange(value, "listingType")
                }
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Buy or Sale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </span>
            <span className="w-full">
              <Label>City</Label>
              <Input
                type="text"
                className="p-2 rounded-lg h-11"
                placeholder="Dubai, Abu Dhabi etc."
                name="city"
                onChange={handleChange}
              />
            </span>
            <div className="flex gap-5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="p-3 bg-primary rounded-md text-base text-text hover:bg-secondary hover:text-white">
                    <VscSettings />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="my-2">
                  <div className="grid gap-4 grid-cols-2">
                    <span className="grid gap-2">
                      <p className="font-semibold">Min. Price</p>
                      <Input name="minPrice" onChange={handleChange} />
                    </span>
                    <span className="grid gap-2">
                      <p className="font-semibold">Max. Price</p>
                      <Input name="maxPrice" onChange={handleChange} />
                    </span>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                type="submit"
                className="p-3 w-full md:w-32 lg:w-32 bg-primary text-text rounded-md text-base flex gap-3 items-center hover:bg-secondary hover:text-white"
              >
                Search <BiSearchAlt2 />
              </Button>
            </div>
          </div>
        </form>
        {/* Inputs area */}

        {/* Testimonial area */}
        <div className="hidden md:flex md:gap-5">
          <span>
            <h2 className="md:text-2xl lg:text-3xl font-bold text-center md:text-accent lg:text-black">
              1500+
            </h2>
            <p className="text-base">Property Ready</p>
          </span>
          <Separator orientation="vertical" />
          <span>
            <h2 className="md:text-2xl lg:text-3xl font-bold text-center md:text-accent lg:text-black">
              700+
            </h2>
            <p className="text-base">Happy Customers</p>
          </span>
          <Separator orientation="vertical" />
          <span>
            <h2 className="md:text-2xl lg:text-3xl font-bold text-center md:text-accent lg:text-black">
              50+
            </h2>
            <p className="text-base">Featured Agencies</p>
          </span>
        </div>
        {/* Testimonial area */}
      </div>
    </div>
  );
}

export default Hero;
