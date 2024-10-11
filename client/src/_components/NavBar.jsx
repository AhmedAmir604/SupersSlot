import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  return (
    <nav className="max-w-screen sticky top-0 border-b z-30 bg-white border-gray-200 py-7 px-4 lg:px-20 flex justify-between items-center">
      {/* Menu Icon for Mobile */}
      <div className="flex md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-500 hover:text-[#3ba4f5]"
        >
          <HiMenuAlt1 />
        </button>
      </div>
      {/* Logo/Brand Name (optional) */}
      <div className="hidden md:flex text-2xl my-auto text-gray-500">
        MyBrand
      </div>
      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex gap-8 md:gap-6 items-center">
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
          <LuCalendar />
          <h1 className="text-[12px]">SCHEDULE AN APPOINTMENT</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5]"
        >
          <IoLocationOutline />
          <h1 className="text-[12px]">FIND OFFICE</h1>
        </a>
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="Person Image"
          className="w-10 h-10 object-cover rounded-full"
        />
        <h1 className="text-lg text-gray-500 font-bold text-[12px]">
          Persons Name
        </h1>
      </div>

      {/* Backdrop Blur when Menu is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleMenu} // Close the menu when backdrop is clicked
        />
      )}

      {/* Mobile Navigation Links */}
      <div
        className={`absolute top-0 left-0 h-screen bg-white flex flex-col items-start justify-center border-r border-blue-500 px-5 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
      >
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5] mb-4"
          onClick={toggleMenu} // Close menu on link click
        >
          <GoHome />
          <h1 className="text-[12px]">HOME</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5] mb-4"
          onClick={toggleMenu}
        >
          <LuCalendar />
          <h1 className="text-[12px]">SCHEDULE AN APPOINTMENT</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5] mb-4"
          onClick={toggleMenu}
        >
          <IoLocationOutline />
          <h1 className="text-[12px]">FIND OFFICE</h1>
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 font-bold flex gap-1 items-center hover:text-[#3ba4f5] mb-4"
          onClick={toggleMenu}
        >
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="Person Image"
            className="w-10 h-10 object-cover rounded-full"
          />
          <h1 className="text-[12px]">Persons Name</h1>
        </a>
        {/* Close Menu Button */}
        <button
          onClick={toggleMenu}
          className="mt-4 text-gray-500 hover:text-[#3ba4f5]"
        >
          Close Menu
        </button>
      </div>
    </nav>
  );
}
