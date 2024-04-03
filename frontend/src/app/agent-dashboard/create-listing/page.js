"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function page() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    listingType: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    propertyImages: [],
    address: "",
    neighbourhood: "",
    city: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValueChange = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const filesList = Array.from(e.target.files);
    // const names = [...images];
    // for (let i = 0; i < files.length; i++) {
    //   names.push(files[i].name);
    // }
    // setImages(names);
    for (let index = 0; index < filesList.length; index++) {
      const file = filesList[index];

      setFormData((prevState) => ({
        ...prevState,
        propertyImages: [...prevState.propertyImages, file],
      }));
    }
  };

  // Create properties
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "propertyImages") {
        formData[key].forEach((image) => {
          formDataToSend.append("propertyImages", image);
        });
      } else if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "https://real-estate-portal.onrender.com/api/properties/add-properties",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Add new property");

      // Reset form data after submission
      setFormData({
        title: "",
        propertyType: "",
        listingType: "",
        bedrooms: "",
        bathrooms: "",
        amenities: "",
        propertyImages: "",
        address: "",
        neighbourhood: "",
        city: "",
        description: "",
        price: "",
      });
      setImages([]);
      router.push("/agent-dashboard/all-listings");
    } catch (error) {
      toast.error("Failed to add properties. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Create properties

  return (
    <div className="bg-white grid gap-5 p-10 rounded-lg drop-shadow-md">
      <span className="w-full">
        <h2 className="text-xl font-bold">Create Listing</h2>
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Property Name <span className="text-red-700">*</span>
            </Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="h-11"
              placeholder=""
            />
          </span>
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Property Type <span className="text-red-700">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                handleValueChange(value, "propertyType")
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Shop">Shop</SelectItem>
                <SelectItem value="Other">Other Commercial</SelectItem>
              </SelectContent>
            </Select>
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Listing Type <span className="text-red-700">*</span>
            </Label>
            <Select
              onValueChange={(value) => handleValueChange(value, "listingType")}
              // name="listingType"
              // value={formData.listingType}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Listing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Buy">For Buy</SelectItem>
                <SelectItem value="Rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Bedrooms <span className="text-red-700">*</span>
            </Label>
            <Select
              onValueChange={(value) => handleValueChange(value, "bedrooms")}
              // name="bedrooms"
              // value={formData.bedrooms}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Bathrooms <span className="text-red-700">*</span>
            </Label>
            <Select
              onValueChange={(value) => handleValueChange(value, "bathrooms")}
              // name="bathrooms"
              // value={formData.bathrooms}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">Amenities</Label>
            <Input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="h-11"
            />
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">Photos</Label>
            <Input
              type="file"
              multiple
              className="h-11"
              onChange={handleImageChange}
            />
            <span className="flex gap-3">
              {images.map((image, index) => (
                <p
                  className="bg-secondary text-white rounded-2xl p-2 text-[12px]"
                  key={index}
                >
                  {image}
                </p>
              ))}
            </span>
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">Address</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="h-11"
            />
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Neighborhood <span className="text-red-700">*</span>
            </Label>
            <Input
              type="text"
              name="neighbourhood"
              value={formData.neighbourhood}
              onChange={handleChange}
              className="h-11"
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">City</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="h-11"
            />
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">Description</Label>
            <Textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-semibold text-base">
              Price <span className="text-red-700">*</span>
            </Label>
            <Input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="h-11"
            />
          </span>
        </div>

        <div className="flex sm:justify-center lg:justify-end ">
          {loading ? (
            <Button
              type="submit"
              className="w-36 text-text font-semibold  hover:bg-secondary hover:text-white"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-36 text-text font-semibold  hover:bg-secondary hover:text-white"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default page;
