import { Button } from "@/components/ui/button"

function EmailUs() {
  return (
    <div className='px-10 md:px-20 pb-10'>
        <div className="w-full rounded-3xl bg-[url(/email-us-bg.jpg)] bg-cover bg-bottom bg-no-repeat">
          <div className="w-full p-10 md:p-20 rounded-3xl bg-gradient-to-r from-[#b65be6] to-transparent ">
            <div className="w-full lg:w-1/2 flex flex-col gap-5 items-center lg:items-start">
                <h2 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold text-white">Find your best Real Estate</h2>
                <p className="text-lg text-white text-center">We provide a complete service for the sale, purchase or rental of real estate.</p>
                <Button className="w-28 py-5 hover:bg-white text-white hover:text-accent">Contact Us</Button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default EmailUs