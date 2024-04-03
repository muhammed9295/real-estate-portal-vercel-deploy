"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CommunityAttraction from "../../components/CommunityAttraction";
import Alert from "../../components/Alert";
import RecommendedSearches from "../../components/RecommendedSearches";
import TopSearches from "../../components/TopSearches";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdKingBed } from "react-icons/md";
import { FaShower, FaLock } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Toaster, toast } from "sonner";
import { baseUrl } from "@/url";

function SingleBuyPage({ params }) {
  const [property, setProperty] = useState("");
  const [agentDetails, setAgentDetails] = useState("");
  const [propertyImg, setPropertyImg] = useState([]);
  const [token, setToken] = useState("");
  const [wishList, setWishList] = useState("");

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/properties/get-singleProperty/${id}`
        );
        setProperty(response.data.data[0]);
        setAgentDetails(response.data.data[0].agent_details);
        setPropertyImg(response.data.data[0].propertyImages);
        setToken(localStorage.getItem("accessToken"));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Add wishlist item
  const addWishlist = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/users/add-wishlist/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Added wish list");
    } catch (error) {
      console.log(error);
    }
  };
  // Add wishlist item

  // Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Carousel

  return (
    <div className="grid w-4/5 sm:p-10 mx-auto py-10">
      <div className="">
        <div className="mb-6 sm:mb-8">
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {propertyImg.map((pic) => (
                  <div key={pic} className="embla__slide">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        
                        src={pic}
                        fill
                        alt="property-2"
                        className="rounded-lg"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>
            <span className="flex w-full gap-5 justify-end pt-5 mx-auto">
              <Button
                variant="ghost"
                className="embla__prev text-gray-500 hover:bg-secondary hover:text-white"
                onClick={scrollPrev}
              >
                <IoIosArrowBack /> Previous
              </Button>
              <Button
                variant="ghost"
                className="embla__next text-gray-500 hover:bg-secondary hover:text-white"
                onClick={scrollNext}
              >
                Next <IoIosArrowForward />
              </Button>
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-4 md:flex-row justify-between">
              <h2 className="text-4xl font-bold">
                <span className="text-xl">AED</span> {property.price}
              </h2>
              {token ? (
                <Button
                  onClick={addWishlist}
                  className="hover:bg-secondary hover:text-white"
                >
                  Add to wishlist
                </Button>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className=" flex gap-2 items-center hover:bg-secondary hover:text-white">
                        <FaLock className="text-lg" /> Add to wishlist
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Login to add wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <h2 className="text-lg font-semibold">{property.title}</h2>

            <div className="flex gap-4">
              <span className="flex gap-2 items-center">
                <MdKingBed className="text-lg" />
                <p> {property.bedrooms} Bed</p>
              </span>
              <span className="flex gap-2 items-center">
                <FaShower className="text-lg" />
                <p> {property.bathrooms} Bath</p>
              </span>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">
                Prime Location | 5 Years Payment Plan
              </h2>

              <p>{property.description}</p>

              <ul>
                <p className="font-semibold">APARTMENT DETAILS:</p>
                <li>- Master Bedroom</li>
                <li>- Master Bathroom</li>
                <li>- Built-in Wardrobes</li>
                <li>- Closed Kitchen</li>
                <li>- Living Area</li>
                <li>- Dining Area</li>
                <li>- Guest Toilet</li>
              </ul>

              <h2 className="text-xl font-semibold mt-5">
                Property Information
              </h2>
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="md:w-1/2 px-2">
                  <div className="flex justify-between">
                    <p className="text-lg">Type</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">
                        {property.propertyType}
                      </p>
                    </span>
                  </div>
                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <p className="text-lg">Purpose</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">
                        {property.listingType}
                      </p>
                    </span>
                  </div>
                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <p className="text-lg">Completion</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">Ready</p>
                    </span>
                  </div>
                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <p className="text-lg">Agent</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">
                        {agentDetails.firstName} {agentDetails.lastName}
                      </p>
                    </span>
                  </div>
                  <Separator className="my-2" />
                </div>

                <div className="md:w-1/2 px-2">
                  <div className="flex justify-between">
                    <p className="text-lg">Furnishing</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">Unfurnished</p>
                    </span>
                  </div>
                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <p className="text-lg">Average Rent</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">AED 60,375 Yearly</p>
                    </span>
                  </div>
                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <p className="text-lg">Added</p>
                    <span className="w-1/2">
                      <p className="text-lg font-semibold">8 December 2023</p>
                    </span>
                  </div>
                  <Separator className="my-2" />
                </div>
              </div>

              <h2 className="text-xl font-semibold">More info:</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                fugit corrupti rerum ducimus voluptatibus eveniet, in
                doloremque, expedita maxime eaque ad distinctio ut quia fuga qui
                molestias, et saepe pariatur. corrupti rerum ducimus
                voluptatibus eveniet, in doloremque, expedita maxime eaque ad
                distinctio ut quia fuga qui molestias, et saepe pariatur.
                corrupti rerum ducimus voluptatibus eveniet, in doloremque,
                expedita maxime eaque ad distinctio ut quia fuga qui molestias,
                et saepe pariatur.
              </p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 px-8">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border p-5">
              <div className="flex gap-5 items-center">
                <Image
                  src={agentDetails ? agentDetails.avatar : "/noavatar.png"}
                  className="rounded-full drop-shadow-sm"
                  width={80}
                  height={80}
                  alt="agent-profile"
                />
                <span className="w-full">
                  <h3 className="text-lg font-semibold">
                    {agentDetails.firstName} {agentDetails.lastName}{" "}
                  </h3>
                  <p className="mb-3">{agentDetails.companyName}</p>

                  {token ? (
                    <span className="flex justify-between gap-5 my-2">
                      <Button className="w-20 sm:w-28 hover:bg-secondary">Call</Button>
                      <Button className="w-20 sm:w-28 hover:bg-secondary">Email</Button>
                    </span>
                  ) : (
                    <span className="w-full">
                      <Button className="w-48 sm:w-full hover:bg-secondary flex gap-2">
                        <FaLock className="text-lg" /> Login to contact agent
                      </Button>
                    </span>
                  )}
                </span>
              </div>

              <Separator className="my-3" />
              <p>By: {agentDetails.companyName}</p>
            </div>
            <CommunityAttraction />
            <Alert />
            <RecommendedSearches />
            <TopSearches />
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBuyPage;