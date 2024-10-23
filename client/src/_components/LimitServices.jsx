import { Button } from "@/components/ui/button";
import { getSomeServices } from "@/handlers/servicesHandlers";
import React, { useEffect, useState } from "react";

export default function LimitServices({
  selection,
  setSelection,
  services,
  selectedService,
}) {
  const selectionHandler = (service) => {
    setSelection((prev) => (service.name === prev ? "" : service.name));
  };
  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const query =
  //         "serviceType=barber&fields=ratingsAverage,ratingsQuantity,name,price,openingHours,phoneNumber";
  //       const res = await getSomeServices(query);
  //       setServices(res.data.services); // Assuming the data structure includes `services`
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchServices();
  // }, []);

  return (
    <section className="bg-white p-4 rounded-md flex flex-col gap-2 ">
      <ul className="space-y-4 cursor-pointer ">
        <li
          onClick={() => selectionHandler(selectedService)}
          key={selectedService?.name}
          className={`border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all duration-200 p-4 rounded-md shadow-sm flex justify-between items-center ${
            selection === selectedService?.name
              ? " shadow-xl !border-blue-600 "
              : ""
          }`}
        >
          <div className="text-blue-600 font-semibold text-lg">
            {selectedService?.name}
          </div>
          <div className="text-gray-500">
            Price: <span className="font-bold">${selectedService?.price}</span>
          </div>
          <div className="text-sm text-gray-400">
            {selectedService?.ratingsAverage} ★ (
            {selectedService?.ratingsQuantity} reviews)
          </div>
        </li>
        {services.map((service) => (
          <li
            onClick={() => selectionHandler(service)}
            key={service.name}
            className={`border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all duration-200 p-4 rounded-md shadow-sm flex justify-between items-center ${
              selection === service.name ? " shadow-xl !border-blue-600 " : ""
            }`}
          >
            <div className="text-blue-600 font-semibold text-lg">
              {service.name}
            </div>
            <div className="text-gray-500">
              Price: <span className="font-bold">${service.price}</span>
            </div>
            <div className="text-sm text-gray-400">
              {service.ratingsAverage} ★ ({service.ratingsQuantity} reviews)
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
