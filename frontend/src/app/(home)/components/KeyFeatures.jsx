function KeyFeatures() {
  return (
    <div className="py-10 px-10 md:px-20 flex justify-center">
      <div className="w-full lg:w-5/6 flex  flex-col items-center lg:flex-row justify-center gap-10">
        <div className="bg-[url(/key-feature/key-feature-1.png)] bg-cover bg-center bg-no-repeat rounded-xl drop-shadow-xl md:w-[450px] md:h-[350px] p-10">
          <h3 className="text-xl md:text-2xl font-bold text-text">Smart Matchmaking</h3>
          <p className="text-sm md:text-lg mt-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div className="bg-[url(/key-feature/key-feature-2.png)] bg-cover bg-center bg-no-repeat rounded-xl drop-shadow-xl md:w-[450px] md:h-[350px] p-10">
          <h3 className="text-xl md:text-2xl font-bold text-text">Exclusive Access</h3>
          <p className="text-sm md:text-lg mt-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div className="bg-[url(/key-feature/key-feature-3.png)] bg-cover bg-center bg-no-repeat rounded-xl drop-shadow-xl md:w-[450px] md:h-[350px] p-10">
          <h3 className="text-xl md:text-2xl font-bold text-text">Personalized Support</h3>
          <p className="text-sm md:text-lg mt-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  );
}

export default KeyFeatures;
