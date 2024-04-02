import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Featured from "./components/Featured";
import KeyFeatures from "./components/KeyFeatures";
import ExplorePlaces from "./components/ExplorePlaces";
import EmailUs from "./components/EmailUs";
import PopularSearches from "./components/PopularSearches";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Brands />
      <Featured />
      <KeyFeatures />
      <ExplorePlaces />
      <EmailUs />
      <PopularSearches />
    </main>
  );
}
