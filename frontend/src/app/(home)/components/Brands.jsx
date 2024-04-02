import Image from "next/image";

function Brands() {
  return <div className="py-10 px-20 flex flex-col gap-10 items-center">
    <h3 className="text-lg text-center md:text-xl font-bold">Trusted by over 150+ major companies</h3>
    <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-0 justify-around items-center md:w-2/3">
        <Image src="/brand-1.png" width={150} height={150} className="opacity-50 hover:opacity-100 cursor-pointer md:m-3" alt="brand-logo" />
        <Image src="/brand-2.png" width={150} height={150} className="opacity-50 hover:opacity-100 cursor-pointer md:m-3" alt="brand-logo"/>
        <Image src="/brand-3.png" width={150} height={150} className="opacity-50 hover:opacity-100 cursor-pointer md:m-3" alt="brand-logo"/>
        <Image src="/brand-4.png" width={150} height={150} className="opacity-50 hover:opacity-100 cursor-pointer md:m-3" alt="brand-logo"/>
        <Image src="/brand-5.png" width={150} height={150} className="opacity-50 hover:opacity-100 cursor-pointer md:m-3" alt="brand-logo"/>
    </div>
  </div>;
}

export default Brands;
