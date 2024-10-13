import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiNike } from "react-icons/si";

export default function ServicesCard() {
  return (
    <div className="bg-[#5a4848] text-white mt-10 border-[2px] border-black px-2 py-2 rounded-lg">
      <div className="bg-[#181313] flex justify-center rounded-lg py-5">
        <div className="flex flex-col gap-8">
          <h1 className="text-sm">$120/hr</h1>
          <h1 className="text-2xl w-1/2">Senior UI Developer</h1>
        </div>
        <div className="flex flex-col gap-20 pb-24">
          <FaRegBookmark className="text-2xl" />
          <IoIosArrowRoundForward className="text-4xl" />
        </div>
      </div>
      <div className="text-white flex gap-4 items-center justify-between px-3 py-2">
        <div className="flex items-center">
          <SiNike className="text-5xl " />
          <h1 className=" w-1/2 text-sm ml-3">Senior UI Developer</h1>
        </div>
        <button className="text-sm border py-2 px-4 rounded-full">View</button>
      </div>
    </div>
  );
}
