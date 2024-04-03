"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommunityAttraction from "../components/CommunityAttraction";
import Alert from "../components/Alert";
import RecommendedSearches from "../components/RecommendedSearches";
import TopSearches from "../components/TopSearches";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLocationPin, MdKingBed } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

function page() {
  const [userDetail, setUserDetail] = useState([]);
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://real-estate-portal.onrender.com/api/users/get-wishlist",
        { withCredentials: true }
      );
      setUserDetail(response.data.data[0]);
      setWishList(response.data.data[0].properties);
    };
    fetchData();
  }, []);

  console.log(wishlist);

  return (
    <div className="py-10 flex flex-col gap-5">
      <form className="px-10 flex flex-col gap-4 lg:flex-row lg:justify-center lg:px-72">
        <div className="flex gap-5 lg:w-2/5">
          <Input className="bg-white" placeholder="Location" />
          <Button className="text-text hover:bg-secondary hover:text-white lg:hidden">
            Find
          </Button>
        </div>
        <div className="flex gap-2 lg:w-3/5 lg:gap-5">
          {/* Property Types */}
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Property Types */}

          {/* Beds Type */}
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Beds Type */}

          {/* Price Range */}
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Price Range */}

          <Button className="hidden lg:flex w-[500px] text-text font-bold text-base hover:bg-secondary hover:text-white">
            Find
          </Button>
        </div>
      </form>
      <Separator />

      <div className="flex  w-full lg:px-20 lg:py-5">
        {/* Property listing section */}
        <div className=" w-full flex flex-col gap-5 px-10 lg:w-4/5">
          <h2 className="text-2xl font-bold md:text-4xl">All Properties</h2>

          <span className="flex justify-between items-center">
            <p className="text-sm lg:text-base">
              Total: {wishlist.length} Properties
            </p>
            <span>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Featured</SelectItem>
                  <SelectItem value="dark">Buy</SelectItem>
                  <SelectItem value="system">Rent</SelectItem>
                </SelectContent>
              </Select>
            </span>
          </span>

          {/* Cards sections */}
          <div className="grid gap-4 grid-cols-12 w-full">
            {wishlist.map((property) => {
              return (
                <Card key={property.title} className="w-full col-span-6 flex">
                  <CardHeader>
                    <Image
                      src="/property/property-1.png"
                      width={300}
                      height={300}
                      alt="property"
                    />
                  </CardHeader>

                  <div className="w-full py-3">
                    <CardContent className="flex flex-col gap-3">
                      <CardTitle>AED {property.price}</CardTitle>
                      <div className="flex gap-4 w-full">
                        <p>Apartment</p>
                        <Separator orientation="vertical" className="h-5" />
                        <div className="flex gap-3">
                          <span className="flex items-center gap-2 sm:text-[12px] lg:text-sm">
                            <MdKingBed />
                            <p>{property.bedrooms}</p>
                          </span>
                          <span className="flex items-center gap-2 sm:text-[12px] lg:text-sm">
                            <FaShower />
                            <p>{property.bathrooms}</p>
                          </span>
                        </div>
                        <Separator orientation="vertical" className="h-5" />
                        <p>City: {property.city}</p>
                      </div>
                      <p>{property.neighbourhood}</p>
                      <span className="flex gap-2 items-center sm:text-[12px] lg:text-sm">
                        <MdLocationPin /> <p>{property.address}</p>
                      </span>
                    </CardContent>

                    <Separator className="w-[95%] mx-auto" />

                    <CardFooter className="pt-3">
                      <span className="w-full flex justify-between items-center gap-2">
                        

                        <Button className="w-1/2 hover:bg-secondary">View</Button>

                        <Button className="w-1/2 bg-red-700 hover:bg-red-900 cursor-pointer">Remove</Button>
                      </span>
                    </CardFooter>
                  </div>
                </Card>
              );
            })}
          </div>
          {/* Cards sections */}
        </div>
        {/* Property listing section */}

        {/* Side bar */}
        <div className="hidden lg:flex lg:w-1/5 flex-col gap-5 items-center p-8 border-l-2 border-gray-100 h-[90%]">
          <CommunityAttraction />
          <Alert />
          <RecommendedSearches />
          <TopSearches />
          <div className="mt-5">
            <Image src="/ad-poster.jpg" width={500} height={500} />
          </div>
        </div>
        {/* Side bar */}
      </div>
    </div>
  );
}

export default page;
