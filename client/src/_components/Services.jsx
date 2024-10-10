import React from "react";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="flex flex-col md:flex-row gap-6 py-20 px-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 items-center justify-center py-10 basis-1/2 shadow-lg border border-transparent  hover:border-[#409ffa] cursor-pointer transition-all duration-300 "
        >
          <img className="h-12" src={service.imageURL} alt={service.name} />
          <h1 className="text-[15px] font-bold w-1/2 text-center leading-tight text-gray-600">
            {service.name}
          </h1>
          <p className="text-[14px] leading-normal px-4 text-center text-gray-500">
            {service.description}
          </p>
        </div>
      ))}
    </section>
  );
}
