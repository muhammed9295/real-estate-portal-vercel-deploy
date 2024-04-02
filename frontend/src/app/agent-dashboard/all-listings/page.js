"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function page() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all the properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties/get-agentProperties",
          { withCredentials: true }
        );
        setProperties(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, []);
  // Fetch all the properties

  // Delete property
  const deleteProperty = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/properties/delete-singleProperty/${id}`,
        { withCredentials: true }
      );
      const updatedProperties = properties.filter(
        (property) => property._id !== id
      );
      setProperties(updatedProperties);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete property

  // Pagination logic

  // calculate total pages
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Slice data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination logic

  return (
    <div className="bg-white flex flex-col items-center p-5 rounded-lg drop-shadow-md">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-bold">All Properties</h2>
        <form className="flex gap-3">
          <Input placeholder="Search" />
          <Button>Search</Button>
        </form>
      </div>

      {/* Table */}
      <div className="w-full mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Title</TableHead>
              <TableHead className="w-1/5">Property Type</TableHead>
              <TableHead className="w-full">Neighbourhood</TableHead>
              <TableHead className="">Bedroom</TableHead>
              <TableHead className="">Bathroom</TableHead>
              <TableHead className="">Listing Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProperties.map((property) => {
              return (
                <TableRow key={property._id}>
                  <TableCell className="font-medium">
                    {property.title}
                  </TableCell>
                  <TableCell>{property.propertyType}</TableCell>
                  <TableCell>{property.neighbourhood}</TableCell>
                  <TableCell className="text-right w-full">
                    {property.bedrooms}
                  </TableCell>
                  <TableCell className="text-right w-full">
                    {property.bathrooms}
                  </TableCell>
                  <TableCell className="text-right w-full">
                    {property.listingType}
                  </TableCell>
                  <TableCell className="text-right w-full font-bold">
                    {property.price}
                  </TableCell>
                  <TableCell className="text-right w-full font-bold">
                    <Button
                      onClick={() => deleteProperty(property._id)}
                      className="hover:bg-secondary hover:text-white"
                    >
                      <MdDelete className="text-2xl " />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="w-full flex justify-between p-5">
          <Button
            variant="ghost"
            className="text-gray-500 hover:bg-secondary hover:text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack /> Previous
          </Button>
          <Button
            variant="ghost"
            className="text-gray-500 hover:bg-secondary hover:text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <IoIosArrowForward />{" "}
          </Button>
        </div>
      </div>
      {/* Table */}
    </div>
  );
}

export default page;
