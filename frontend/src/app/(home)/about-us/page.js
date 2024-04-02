import Image from "next/image";
import { VscKey } from "react-icons/vsc";
import { PiWarehouse, PiHandshake } from "react-icons/pi";
import Brands from "../components/Brands";
import ContactForm1 from "../components/ContactForm1";

function About() {
  return (
    <div className="p-10 lg:p-20">
      {/* About Us - Intro */}
      <div className="flex flex-col lg:flex-row justify-around w-full lg:px-72">
        <div className="flex flex-col gap-4 lg:pr-24">
          <h2 className="text-3xl lg:text-5xl font-extrabold">Better lives with better homes</h2>

          <p className="mt-2 lg:text-base lg:font-bold lg:mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas vitae auctor in gravida tellus vestibulum faucibus in ut. Dolor bibendum suspendisse vestibulum ullamcorper morbi morbi vulputate.</p>

          <p className="lg:text-sm lg:font-normal">Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum. Fusce at dui tincidunt nulla semper venenatis at et magna. Mauris turpis lorem, ultricies vel justo sed, ultrices auctor nisi.</p>

          <span className="pl-8 border-l-4 border-l-primary italic font-semibold">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor, mi euismod dignissim scelerisque, eros augue vehicula lectus, quis vestibulum enim augue ut est</p>
          </span>

          <p className="pl-5 mt-5">CEO & Co-Founder</p>
          <p className="pl-5 font-bold">Mdshk</p>
        </div>
        <Image className="rounded-2xl mt-5 lg:mt-0" src="/about/about-us-cover.jpg" width={500} height={500} alt="about-us-image" />
      </div>
      {/* About Us - Intro */}

      {/* Our Services */}
      <div className="lg:px-64">
      <div className="my-20 border bg-secondary py-8 md:py-20 px-10 flex flex-col items-center gap-2 lg:gap-5 rounded-2xl">
        <h2 className="text-3xl lg:text-5xl font-extrabold">Our Services</h2>
        <p className="text-center">We provide residential, commercial and rural property solutions for buyers & sellers.</p>

        <div className="flex flex-col items-center lg:flex-row gap-10 lg:gap-8 mt-6">
          <div className="w-[280px] md:w-[350px] bg-white p-8 flex flex-col gap-3 rounded-lg">
          <VscKey className="text-6xl text-primary" />
            <h3 className="text-lg lg:text-xl font-semibold mt-4">Property Management</h3>
            <p>condimentum id. Nulla congue nunc vitae odio dictum, euismod mattis eros dapibus</p>
            </div>
          <div className="w-[280px] md:w-[350px] bg-white p-8 flex flex-col gap-3 rounded-lg">
          <PiWarehouse className="text-6xl text-primary" />            
            <h3 className="text-lg lg:text-xl font-semibold mt-4">Consulting Service</h3>
            <p>condimentum id. Nulla congue nunc vitae odio dictum, euismod mattis eros dapibus</p>
            </div>
          <div className="w-[280px] md:w-[350px] bg-white p-8 flex flex-col gap-3 rounded-lg">
          <PiHandshake className="text-6xl text-primary" />
            <h3 className="text-lg lg:text-xl font-semibold mt-4">Buy and sell real estate</h3>
            <p>condimentum id. Nulla congue nunc vitae odio dictum, euismod mattis eros dapibus</p>
            </div>
        </div>
      </div>
      </div>
      {/* Our Services */}

      {/* Trusted brands */}
      <Brands />
      {/* Trusted brands */}

      {/* Contact Form */}
      <div className="flex justify-center lg:py-20">
      <ContactForm1 />
      </div>
      {/* Contact Form */}
    </div>
  );
}

export default About;
