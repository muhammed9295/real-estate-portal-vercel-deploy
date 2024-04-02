import Image from "next/image"

function ExplorePlaces() {
  return (
    <div className="p-10 md:p-20">
        <div className="flex items-center flex-col gap-3">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black">Explore places</h2>
            <p className="text-sm md:text-base text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam necessitatibus nisi dolores officiis maxime doloribus temporibus, earum.</p>
        </div>

        <div className="flex flex-col lg:flex-row md:items-center lg:justify-around gap-8 p-5 md:py-8 lg:px-36 lg:py-10">
            <div className="py-5">
            <Image src="/uae/dubai.jpg" width={350} height={220} className="rounded-3xl cursor-pointer transition-transform duration-500 hover:scale-105" alt="riyadh"/>
            <h3 className="font-bold text-xl mt-5 ml-3">Dubai</h3>
            </div>
            <div className="py-5">
            <Image src="/uae/sharjah.jpg" width={350} height={220} className="rounded-3xl cursor-pointer transition-transform duration-500 hover:scale-105" alt="jeddah"/>
            <h3 className="font-bold text-xl mt-5 ml-3">Sharjah</h3>
            </div>
            <div className="py-5">
            <Image src="/uae/abudhabi.jpg" width={350} height={220} className="rounded-3xl cursor-pointer transition-transform duration-500 hover:scale-105" alt="medina"/>
            <h3 className="font-bold text-xl mt-5 ml-3">Abu Dabhi</h3>
            </div>
            <div className="py-5">
            <Image src="/uae/ajman.jpg" width={350} height={220} className="rounded-3xl cursor-pointer transition-transform duration-500 hover:scale-105" alt="dammam"/>
            <h3 className="font-bold text-xl mt-5 ml-3">Ajman</h3>
            </div>
        </div>
    </div>
  )
}

export default ExplorePlaces