import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Categories from "@/_components/Categories";

export default function Home() {
  return (
    <section className="bg-[#181313] h-[150vh] flex flex-col items-center px- py-6">
      <div className="mb-10 bg-gradient-to-r w-[90%] from-[#7f7362] to-[#52422b] px-4 md:px-14 py-20 rounded-2xl">
        <h1 className="text-2xl md:text-4xl font-semibold text-white mb-10">
          Book everything, now.
        </h1>
        <label className="relative">
          <input
            className="w-[70%] lg:w-1/2 py-2 placeholder:text-gray-700 rounded-full px-8"
            placeholder="Search"
            id="search"
            name="search"
            type="text"
            inputMode="search"
          ></input>
          <IoSearchOutline className="absolute text-xl top-0.5 left-2" />
        </label>
        <div className="text-sm flex items-center gap-2 text-white mt-2">
          <CiLocationOn className="text-xl " />
          <span className=""> New York City, United States</span>
        </div>
      </div>

      <Categories />
    </section>
  );
}
