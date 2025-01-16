import hero from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <div className="flex flex-col translate-y-10 sm:translate-y-0 m-10 sm:m-20 lg:flex-row items-center lg:items-start justify-between gap-10 px-8 py-16">
      {/* Left Section */}
      <div className="flex flex-col gap-6 lg:w-1/2 lg:translate-y-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-overpassMono leading-tight">
          Hey welcome to your <span className="text-myGreen font-extralight">Cognito</span>
        </h1>
        <p className="text-lg md:text-xl font-mono">
          The only place to put your daily accessible content with individualization and security.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2  lg:translate-x-16 flex flex-col items-center">
        <div className="relative h-[60vh]  bg-[#F9FDFC] shadow-lg rounded-[20px] flex items-center justify-center">
          <img
            src={hero}
            alt="logo"
            className="h-full max-h-[54vh] rounded-[15px]"
          />
        </div>
        <p className="text-red-600 text-center mt-4">
          These issues are relatebale right? Fix it now, Sign up and get started!
        </p>
      </div>
    </div>
  );
};

export default Hero;
