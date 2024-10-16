import React, { useEffect, useRef, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiNike } from "react-icons/si";

export default function ServicesCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      let rect = card.getBoundingClientRect();
      let x = e.clientX - rect.left - rect.width / 2;
      let y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `rotateX(${-y / 50}deg) rotateY(${x / 30}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `rotateX(0) rotateY(0)`;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="card-wrapper relative"
      style={{
        perspective: "180px",
      }}
    >
      <div
        className="card bg-[#5a4848] text-white mt-10 border-black px-2 py-2 rounded-lg"
        ref={cardRef}
        style={{
          transition: "400ms background ease-in-out, 400ms transform ease-out",
        }}
      >
        <div className="relative">
          <img
            className="object-cover h-full w-full absolute rounded-lg"
            src="/Services/service1.jpg"
            alt="Service"
          />
          <div className="bg-[#181313] bg-opacity-50 relative flex justify-center rounded-lg py-5">
            <div className="flex flex-col gap-8 z-10 text-gray-200">
              <h1 className="text-sm">$120/hr</h1>
              <h1 className="text-2xl w-1/2">Senior UI Developer</h1>
            </div>
            <div className="flex flex-col gap-20 pb-24 text-gray-300">
              <FaRegBookmark className="text-2xl hover:scale-110 transition-all duration-100 cursor-pointer " />
              <IoIosArrowRoundForward className="text-4xl hover:translate-x-1 transition-all duration-100 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="text-white flex gap-4 items-center justify-between px-3 py-2">
          <div className="flex items-center text-gray-200">
            <SiNike className="text-5xl " />
            <h1 className=" w-1/2 text-sm ml-3">Senior UI Developer</h1>
          </div>
          <button className="text-sm border border-[#181313] text-gray-200 py-2 px-4 rounded-full hover:bg-[#181313] hover:border-transparent transition-all duration-150">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
