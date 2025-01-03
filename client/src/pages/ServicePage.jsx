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
import Map from "@/_components/Map";

export default function ServicePage({ service, clickHandler }) {
  // Memoizing the JSX for improved rendering efficiency
  const serviceInfo = useMemo(
    () => (
      <div className="flex flex-col gap-8 pl-0 md:pl-16">
        <ul className="flex flex-col gap-6">
          <h1 className="text-blue-600 text-xl font-semibold">Quick Facts</h1>
          <li className="flex gap-3 items-center font-semibold text-gray-700">
            <MdOutlineDateRange size={20} color="#3b82f6" /> Opening Hours
            <p className="text-gray-500 text-sm">{service?.openingHours}</p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-700">
            <IoIosTrendingUp size={20} color="#3b82f6" /> Service Type
            <p className="text-gray-500 text-sm">{service?.serviceType}</p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-700">
            <GoPerson size={20} color="#3b82f6" /> Price
            <p className="text-gray-500 text-sm">${service?.price}</p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-700">
            <CiStar size={23} color="#3b82f6" /> Rating
            <p className="text-gray-500 text-sm">
              {service?.ratingsAverage} ({service?.ratingsQuantity} reviews)
            </p>
          </li>
        </ul>
        <ul className="flex flex-col gap-6">
          <h1 className="text-blue-600 text-xl font-semibold">Contact Info</h1>
          <li className="flex gap-3 items-center font-semibold text-gray-700">
            <FaLocationDot size={20} color="#3b82f6" /> Address
            <p className="text-gray-500 text-sm">
              {service?.address?.street}, {service?.address?.city},{" "}
              {service?.address?.state} {service?.address?.zipCode}
            </p>
          </li>
          <li className="flex gap-3 items-center font-semibold text-gray-700">
            <GoPerson size={20} color="#3b82f6" /> Phone
            <p className="text-gray-500 text-sm">{service?.phoneNumber}</p>
          </li>
        </ul>
      </div>
    ),
    [service]
  );

  return (
    <section className="bg-white text-gray-800">
      <div className="relative w-full h-[80vh]">
        {service?.images?.[0] && (
          <img
            src={service.images[0]}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt={service?.name}
            loading="lazy"
          />
        )}
        <div className="absolute bg-white bg-opacity-80 inset-0"></div>
        <div className="absolute h-[80vh] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-gray-900 text-3xl md:text-5xl w-2/3 text-center bg-blue-600 bg-opacity-20 font-semibold leading-tight py-2 px-4 rounded">
            {service?.name}
          </h1>
          <div className="flex gap-4 text-blue-500 text-md font-medium">
            <div className="flex gap-2 items-center">
              <FaRegClock size={20} /> <p>{service?.serviceType}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationDot size={20} /> <p>{service?.address?.city}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 p-8 md:p-16 justify-center items-start md:justify-between max-w-6xl mx-auto">
        {serviceInfo}
        <div className="flex flex-col gap-4 ">
          <h1 className="text-xl font-semibold text-blue-600 underline">
            About {service?.name?.toUpperCase()}
          </h1>

          <p className="text-gray-600">{service?.description}</p>
          <div className=" w-full mx-auto">
            <Map
              longitude={service.address?.coordinates[0]}
              latitude={service.address?.coordinates[1]}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-12">
        {service?.images?.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              className="w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
              alt={`Service image ${index + 1}`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center py-12">
        <Button
          onClick={clickHandler}
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
          Book Now
        </Button>
      </div>
    </section>
  );
}
