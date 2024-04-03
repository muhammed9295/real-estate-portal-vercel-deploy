"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLocationPin, MdKingBed } from "react-icons/md";
import { FaShower, FaExpandArrowsAlt } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "@/url";

function Featured() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get(
        `${baseUrl}/api/properties/get-properties`
      );

      setProperties(response.data.data);
    };
    fetchProperties();
  }, []);

  return (
    <div className="p-10 md:p-20 flex flex-col gap-4">
      {/* Title - text */}
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">
          Featured Properties
        </h2>
        <p className="text-sm text-center md:text-base">
          Explore all the different types of properties so you can choose the
          best option for you.
        </p>
      </div>
      {/* Title - text */}
      <div className="flex flex-col items-center mt-5 ">
        {/* Filter buttons */}
        <div className="lg:w-2/5 flex flex-wrap justify-center gap-2 md:justify-between md:w-full md:gap-0">
          <Button className="px-5 drop-shadow-xl hover:bg-secondary hover:text-text">
            All
          </Button>
          <Button className="px-5 drop-shadow-xl hover:bg-secondary hover:text-text">
            Bungalow
          </Button>
          <Button className="px-5 drop-shadow-xl hover:bg-secondary hover:text-text">
            Apartments
          </Button>
          <Button className="px-5 drop-shadow-xl hover:bg-secondary hover:text-text">
            House
          </Button>
          <Button className="px-5 drop-shadow-xl hover:bg-secondary hover:text-text">
            Office
          </Button>
          <Button className="px-5 drop-shadow-xl hover:bg-secondary hover:text-text">
            Villa
          </Button>
        </div>
        {/* Filter buttons */}

        {/* Cards sections */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:px-36">
          {properties.map((property) => (
            <Card key={property._id}>
              <CardHeader>
                <Link href={`/all-properties/${property._id}`}>
                  <div className="group relative overflow-hidden rounded-lg mb-2 cursor-pointer">
                    <Image
                      src={property.propertyImages[0]}
                      width={400}
                      height={300}
                      className="transition-transform duration-500 group-hover:scale-110"
                      alt={property.title}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                </Link>
                <Link href={`/all-properties/${property._id}`}>
                  <CardTitle className="md:text-lg lg:text-xl">
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
                  <FaExpandArrowsAlt /> SqFt 1000
                </p>
              </CardContent>
              <div className="flex items-center justify-between px-4 mb-5">
                <Link
                  className="w-2/5"
                  href={`/all-properties/${property._id}`}
                >
                  <Button className="w-full text-text hover:bg-secondary hover:text-white">
                    Check
                  </Button>
                </Link>
                <p className="font-bold text-secondary">$ {property.price}</p>
              </div>
              <div className="flex items-center justify-center mb-2">
                <Separator />
              </div>
              <CardFooter className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={JSON.stringify(
                        property.agent_details.avatar
                      ).replaceAll('"', "")}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>
                    {JSON.stringify(
                      property.agent_details.firstName
                    ).replaceAll('"', "") +
                      " " +
                      JSON.stringify(
                        property.agent_details.lastName
                      ).replaceAll('"', "")}
                  </p>
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Cards sections */}
      </div>
    </div>
  );
}

export default Featured;
