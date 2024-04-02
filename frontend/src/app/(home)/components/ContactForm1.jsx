import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoMapOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

function ContactForm1() {
  return (
    <div className="flex flex-col justify-center gap-8 lg:gap-14 lg:w-3/4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center">
          We provide the most suitable and quality properties.
        </h2>
        <p className="text-sm text-center md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
          tristique metus proin id lorem odio
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-8 py-5">
        <div className="flex flex-col gap-3 items-center lg:flex-row lg:gap-8">
          <IoMapOutline className="text-4xl lg:text-5xl" />
          <div className="flex flex-col items-center lg:items-start lg:w-3/4 lg:gap-2">
          <p className="font-bold">Office address</p>
          <p className="font-semibold text-center lg:text-left">2715 Ash Dr. San Jose, South Dakota 83475</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:gap-8 items-center">
          <FaPhoneVolume className="text-4xl lg:text-5xl" />
          <div className="flex flex-col items-center lg:items-start lg:w-3/4 lg:gap-2">
          <p className="font-bold">Office address</p>
          <p className="font-semibold text-center lg:text-left">2715 Ash Dr. San Jose, South Dakota 83475</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center lg:flex-row lg:gap-8">
          <FiMail className="text-4xl lg:text-5xl" />
          <div className="flex flex-col items-center lg:items-start lg:w-3/4 lg:gap-2">
          <p className="font-bold">Office address</p>
          <p className="font-semibold text-center lg:text-left">2715 Ash Dr. San Jose, South Dakota 83475</p>
          </div>
        </div>
      </div>

      <div className="bg-white px-5 py-10 drop-shadow-lg rounded-lg lg:px-10">
        <form className="flex flex-col md:items-center lg:items-start gap-5">
          <div className="flex flex-col gap-4 md:w-full lg:flex-row">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <Input placeholder="Your Phone" />
          </div>
          <Textarea placeholder="Your Message" />
          <Button className="text-text font-semibold  hover:bg-secondary hover:text-white md:w-32">Send Request</Button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm1;
