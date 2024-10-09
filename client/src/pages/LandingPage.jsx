import Services from "@/_components/Services";
import React from "react";

export default function LandingPage() {
  return (
    <section className="max-w-screen relative">
      <div className="bg-[#409ffa] h-screen relative overflow-hidden">
        <div className="h-[120vh] w-[120vw] rounded-full absolute -left-[90%] -top-[20%] bg-[#58a4fc]"></div>
        <div className="h-screen w-[50vw] rounded-full absolute -top-[30rem] -right-[10rem] bg-[#58a4fc]"></div>
        <div className="h-screen w-[50vw] rounded-full absolute top-[15rem] -right-[30rem] bg-[#58a4fc]"></div>
      </div>
      <div className="absolute h-full text-black top-1/4 -right-[5rem] max-w-fit">
        <div className="flex flex-col gap-8 w-full md:w-1/3 text-white">
          <h1 className="text-4xl font-extrabold">
            Mine Your Goldmine Save Your Time
          </h1>
          <h1 className="text-xl font-extrabold">___</h1>
          <p>
            Lead Generation, Appointment Booking, CRM, Landing Page, Chat with
            Customers, Client Portal All in one Solutions in a Finger trip.
          </p>
        </div>
        <div className="w-1/2">
          <img
            src="./HomePage/home-slider-guy.webp"
            className="z-10 static md:absolute top-20 left-[40%] w-[7rem] lg:w-[13rem]"
          />
          <img
            src="./HomePage/myn.webp"
            className="z-0 absolute top-10 left-1/2 md:w-[22rem] lg:w-[40rem]"
          />
        </div>
      </div>
    </section>
  );
}
