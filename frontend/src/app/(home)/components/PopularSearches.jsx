import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function PopularSearches() {
  return (
    <div className="p-10 md:p-20 flex flex-col items-center gap-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">Popular Searches</h2>
      <div className="w-5/6 py-5">
        <Tabs
          defaultValue="account"
          className="w-full flex flex-col items-center"
        >
          <TabsList>
            <TabsTrigger className="text-base font-bold" value="account">
              For Sale
            </TabsTrigger>
            <TabsTrigger className="text-base font-bold" value="password">
              To Rent
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className=" w-full flex flex-col gap-3 items-center"
            value="account"
          >
            <div className="flex flex-col md:flex-wrap lg:flex-row justify-around gap-5 w-full p-10">
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Jeddah
                </h2>
                <ul>
                  <li className="text-lg font-medium">Al Balad</li>
                  <li className="text-lg font-medium">Al Naseem</li>
                  <li className="text-lg font-medium">Al Mahjar</li>
                  <li className="text-lg font-medium">Al Safa</li>
                  <li className="text-lg font-medium">Al Marwah</li>
                  <li className="text-lg font-medium">Bawadi</li>
                  <li className="text-lg font-medium">Mraykh</li>
                </ul>
              </span>
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Dammam
                </h2>
                <ul>
                  <li className="text-lg font-medium">Al Jalawiyah</li>
                  <li className="text-lg font-medium">Al Adamah</li>
                  <li className="text-lg font-medium">Al Mazruiyah</li>
                  <li className="text-lg font-medium">Al Khodaryah</li>
                  <li className="text-lg font-medium">Dammam Corniche</li>
                  <li className="text-lg font-medium">Heritage Village</li>
                  <li className="text-lg font-medium">Al Faisaliyah</li>
                </ul>
              </span>
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Medina
                </h2>
                <ul>
                  <li className="text-lg font-medium">Ad Difa</li>
                  <li className="text-lg font-medium">Ar Ranuna</li>
                  <li className="text-lg font-medium">Shuran</li>
                  <li className="text-lg font-medium">Al Khalidiyyah</li>
                </ul>
              </span>
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Apartments in other cities
                </h2>
                <ul>
                  <li className="text-lg font-medium">Makkah apartments</li>
                  <li className="text-lg font-medium">
                    Khamis Mushait apartments
                  </li>
                  <li className="text-lg font-medium">Dammam apartments</li>
                  <li className="text-lg font-medium">Taif apartments</li>
                  <li className="text-lg font-medium">Al Khobar apartments</li>
                </ul>
              </span>
            </div>
          </TabsContent>
          <TabsContent
            className=" w-full flex flex-col gap-3 items-center"
            value="password"
          >
            <div className="flex flex-col md:flex-wrap lg:flex-row justify-around gap-5 w-full p-10">
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Jeddah
                </h2>
                <ul>
                  <li className="text-lg font-medium">Al Balad</li>
                  <li className="text-lg font-medium">Al Naseem</li>
                  <li className="text-lg font-medium">Al Mahjar</li>
                  <li className="text-lg font-medium">Al Safa</li>
                  <li className="text-lg font-medium">Al Marwah</li>
                  <li className="text-lg font-medium">Bawadi</li>
                  <li className="text-lg font-medium">Mraykh</li>
                </ul>
              </span>
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Dammam
                </h2>
                <ul>
                  <li className="text-lg font-medium">Al Jalawiyah</li>
                  <li className="text-lg font-medium">Al Adamah</li>
                  <li className="text-lg font-medium">Al Mazruiyah</li>
                  <li className="text-lg font-medium">Al Khodaryah</li>
                  <li className="text-lg font-medium">Dammam Corniche</li>
                  <li className="text-lg font-medium">Heritage Village</li>
                  <li className="text-lg font-medium">Al Faisaliyah</li>
                </ul>
              </span>
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Medina
                </h2>
                <ul>
                  <li className="text-lg font-medium">Ad Difa</li>
                  <li className="text-lg font-medium">Ar Ranuna</li>
                  <li className="text-lg font-medium">Shuran</li>
                  <li className="text-lg font-medium">Al Khalidiyyah</li>
                </ul>
              </span>
              <span className="flex gap-4 flex-col">
                <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-secondary">
                  Apartments in other cities
                </h2>
                <ul>
                  <li className="text-lg font-medium">Makkah apartments</li>
                  <li className="text-lg font-medium">
                    Khamis Mushait apartments
                  </li>
                  <li className="text-lg font-medium">Dammam apartments</li>
                  <li className="text-lg font-medium">Taif apartments</li>
                  <li className="text-lg font-medium">Al Khobar apartments</li>
                </ul>
              </span>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default PopularSearches;
