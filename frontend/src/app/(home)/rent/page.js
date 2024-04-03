"use client";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLocationPin, MdKingBed } from "react-icons/md";
import { FaShower, FaExpandArrowsAlt } from "react-icons/fa";
import Image from "next/image";
import CommunityAttraction from "../components/CommunityAttraction";
import Alert from "../components/Alert";
import RecommendedSearches from "../components/RecommendedSearches";
import TopSearches from "../components/TopSearches";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "@/url";

function Rent() {
  const [rentProperties, setRentProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRentProperties = async () => {
      const response = await axios.get(
        `${baseUrl}/api/properties/get-rent-properties`
      );
      setLoading(false);
      setRentProperties(response.data.data);
    };
    fetchRentProperties();
  }, []);

  const truncateTitle = (title) => {
    return title.length > 29 ? title.substring(0, 29) : title;
  };
  return (
    <div className="py-10 flex flex-col gap-5">
      <div className="flex  w-full lg:px-20 lg:py-5">
        {/* Property listing section */}
        <div className=" w-full flex flex-col gap-5 px-10 lg:w-4/5">
          <h2 className="text-2xl font-bold md:text-4xl">Rent Properties</h2>

          <span className="flex justify-between items-center">
            <p className="text-sm lg:text-base">
              Total: {rentProperties.length} Properties
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

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {rentProperties.map((property) => (
              <Card key={property._id}>
                <CardHeader>
                  <Link href={`/rent/${property._id}`}>
                    <div className="group relative overflow-hidden rounded-lg mb-2 cursor-pointer">
                      <Image
                        src={property.propertyImages[0]}
                        width={300}
                        height={300}
                        className="transition-transform duration-500 group-hover:scale-110"
                        alt={property.title}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                  </Link>
                  <Link href={`/rent/${property._id}`}>
                    <CardTitle className="md:text-lg lg:text-xl">
                      {/* {truncateTitle(property.title)} */}
                      {property.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="flex items-center gap-1 md:text-[12px] lg:text-sm">
                    <MdLocationPin /> {property.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <p className="flex gap-2 items-center md:text-[12px] lg:text-sm">
                    <MdKingBed /> Beds {property.bedrooms}
                  </p>
                  <p className="flex gap-2 items-center md:text-[12px] lg:text-sm">
                    <FaShower /> Bath {property.bathrooms}
                  </p>
                  <p className="flex gap-2 items-center md:text-[12px] lg:text-sm">
                    <FaExpandArrowsAlt /> SqFt {property.area}
                  </p>
                </CardContent>
                <div className="flex items-center justify-between px-4 mb-5">
                  <Link className="w-2/5" href={`/rent/${property._id}`}>
                    <Button className="w-full text-text hover:bg-secondary hover:text-white">
                      Check
                    </Button>
                  </Link>
                  <p className="font-bold text-secondary">
                    AED {property.price}
                  </p>
                </div>
              </Card>
            ))}
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
            <Image src="/ad-poster.jpg" width={500} height={500} alt="ads" />
          </div>
        </div>
        {/* Side bar */}
      </div>
    </div>
  );
}

export default Rent;
