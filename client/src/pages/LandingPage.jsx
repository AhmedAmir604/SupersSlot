import { ButtonDemo } from "@/_components/ButtonComp";
import HomePageBG from "@/_components/HomePageBG";

export default function LandingPage() {
  return (
    <section className="max-w-screen relative">
      <HomePageBG />
      <div className="absolute top-0 flex md:flex-row flex-col justify-evenly h-full items-center xl:items-start text-black xl:top-[17%] xl:left-[5rem] max-w-fit">
        {/* Text Section */}
        <div className="flex flex-col gap-2 md:gap-8 px-4 md:w-1/2 md:ml-20 xl:ml-0 xl:w-[40%] text-white">
          <h1 className="lg:text-4xl text-2xl font-extrabold">
            Mine Your Goldmine Save Your Time
          </h1>
          <h1 className="text-xl font-extrabold">___</h1>
          <p className="md:text-lg text-md">
            Lead Generation, Appointment Booking, CRM, Landing Page, Chat with
            Customers, Client Portal All in one Solutions in a Finger trip.
          </p>
          <ButtonDemo text={"Get Started Free"} />
        </div>

        {/* Images for Large Screens */}
        <div className="w-1/2 hidden xl:block">
          <img
            src="./HomePage/home-slider-guy.webp"
            alt="Guy Slider"
            className="z-20 md:absolute -top-10 left-[40%] w-[7rem] lg:w-[13rem]"
            loading="lazy"
          />
          <img
            src="./HomePage/myn.webp"
            alt="MyN"
            className="z-10 absolute -top-20 left-[55%] md:w-[22rem] lg:w-[40rem] float-animation"
            loading="lazy"
          />
          <img
            src="./HomePage/elementDarkBlue.webp"
            alt="Dark Blue Element"
            className="-right-[4rem] -top-20 absolute z-0 float-animation-bg"
            loading="lazy"
          />
          <img
            src="./HomePage/elementDarkBlue.webp"
            alt="Dark Blue Element 2"
            className="right-60 top-[12rem] absolute z-0 float-animation-bg"
            loading="lazy"
          />
          <img
            src="./HomePage/whiteBg.webp"
            alt="White Background"
            className="right-[12rem] -top-20 absolute z-0 float-animation-bg"
            loading="lazy"
          />
        </div>

        {/* Mobile Image */}
        <div className="xl:hidden block">
          <img
            src="./HomePage/slider-mobile.webp"
            alt="Mobile Slider"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
