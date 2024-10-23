import React, { useEffect, useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { Button } from "@/components/ui/button"; // Import shadcn Button
import { getService } from "@/handlers/servicesHandlers";
import { useParams } from "react-router-dom";

export default function ServicePage({ service, clickHandler }) {
  // Memoizing the JSX for improved rendering efficiency

  const serviceInfo = useMemo(
    () => (
      <div className="flex flex-col gap-[4rem] pl-0 md:pl-[5rem]">
        <ul className="flex flex-col gap-[2rem]">
          <h1 className="text-[#b93185] text-xl font-semibold">QUICK FACTS</h1>
          <li className="flex gap-3 items-center font-semibold text-gray-200">
            <MdOutlineDateRange size={20} color="#b93185" /> OPENING HOURS{" "}
            <p className="text-gray-400 text-sm">{service?.openingHours}</p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-200">
            <IoIosTrendingUp size={20} color="#b93185" /> SERVICE TYPE{" "}
            <p className="text-gray-400 text-sm">{service?.serviceType}</p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-200">
            <GoPerson size={20} color="#b93185" /> PRICE{" "}
            <p className="text-gray-400 text-sm">${service?.price}</p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-200">
            <CiStar size={23} color="#b93185" /> RATING{" "}
            <p className="text-gray-400 text-sm">
              {service?.ratingsAverage} ({service?.ratingsQuantity} reviews)
            </p>
          </li>
        </ul>
        <ul className="flex flex-col gap-[2rem]">
          <h1 className="text-[#b93185] text-xl font-semibold">CONTACT INFO</h1>
          <li className="flex gap-3 items-center font-semibold text-gray-200">
            <FaLocationDot size={20} color="#b93185" /> ADDRESS{" "}
            <p className="text-gray-400 text-sm">
              {service?.address?.street}, {service?.address?.city},{" "}
              {service?.address?.state} {service?.address?.zipCode}
            </p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-200">
            <GoPerson size={20} color="#b93185" /> PHONE{" "}
            <p className="text-gray-400 text-sm">{service?.phoneNumber}</p>
          </li>
        </ul>
      </div>
    ),
    [service]
  );

  return (
    <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="relative w-full h-[100vh]">
        {service?.images?.[0] && (
          <img
            src={service.images[0]}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt={service?.name}
            loading="lazy"
          />
        )}
        <div className="absolute bg-[#000000] bg-opacity-70 inset-0"></div>
        <div className="absolute h-[100vh] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-white text-3xl md:text-5xl w-2/3 text-center bg-[#b93185] bg-opacity-30 font-thin leading-tight">
            {service?.name}
          </h1>
          <div className="flex gap-[2rem]">
            <div className="text-gray-200 text-md font-semibold flex gap-2 items-center">
              <FaRegClock size={22} /> <p>{service?.serviceType}</p>
            </div>
            <div className="text-gray-200 text-lg font-semibold flex gap-1 items-center">
              <FaLocationDot size={22} /> <p>{service?.address?.city}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-[45rem] py-[3rem] px-[5rem] flex flex-col md:flex-row gap-[5rem] justify-center items-center md:items-start md:justify-between w-[100%]">
        {serviceInfo}
        <div className="w-[75vw] md:w-1/2 flex flex-col gap-[2rem]">
          <h1 className="text-xl font-semibold underline text-gray-200">
            ABOUT {service?.name?.toUpperCase()}
          </h1>
          <p className="text-gray-300 leading-1">{service?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-12">
        {service?.images?.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              alt={`Service image ${index + 1}`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-col md:items-center pb-[3rem] mx-auto w-[70vw] gap-20">
        <Button onClick={() => clickHandler()}>Book Now</Button>
      </div>
    </section>
  );
}
