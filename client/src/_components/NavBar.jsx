import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";

export default function NavBar() {
  return (
    <nav className="max-w-screen sticky top-0 border-b z-20 bg-white border-gray-200 py-7 px-20 flex justify-between">
      <a
        href="#"
        className="text-2xl my-auto text-gray-500 hover:text-[#3ba4f5]"
      >
        <HiMenuAlt1 />
      </a>
      <div className="flex gap-8">
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5]"
        >
          <GoHome />
          <h1 className="text-[12px]">HOME</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5]"
        >
          {" "}
          <LuCalendar />
          <h1 className="text-[12px]">SCHEDULE AN APPOINTMENT</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5]"
        >
          {" "}
          <IoLocationOutline />
          <h1 className="text-[12px]">FIND OFFICE</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5]"
        >
          {" "}
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="Person Image"
            className="w-10 h-10 object-cover rounded-full"
          />
          <h1 className="text-[12px]">Persons Name</h1>
        </a>
      </div>
    </nav>
  );
}
