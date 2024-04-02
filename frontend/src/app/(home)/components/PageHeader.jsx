import { GrAchievement } from "react-icons/gr";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function PageHeader() {
  return (
    <div className="w-full bg-[url(/header-image.jpg)] bg-cover bg-center bg-no-repeat p-10 flex flex-col items-center gap-8 md:py-20 lg:py-28">
        <GrAchievement className="text-white text-7xl" />

        <div className="text-white flex flex-col gap-3 items-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center">We’re looking for amazing talent</h2>
            <p className="text-lg text-center md:text-base">We currently have 50 job openings across our 7 office locations in 6 countries</p>
        </div>

        <form className="w-full flex flex-col gap-4 md:px-24 lg:flex-row lg:items-center lg:w-1/2">
        <Select>
            <SelectTrigger className="bg-white py-6 font-bold">
              <SelectValue placeholder="Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem selected value="all">All Department</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="it">IT Ops</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-white py-6 font-bold">
              <SelectValue placeholder="Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem selected value="all">All Locations</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="saudi">Saudi Arabia</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
            </SelectContent>
          </Select>

          <Button className="py-5 text-text text-base hover:bg-secondary hover:text-white lg:py-6">Search Jobs</Button>
        </form>
        
    </div>
  )
}

export default PageHeader