import React from "react";

export default function LimitServices({
  selection,
  setSelection,
  services,
  service,
}) {
  const selectionHandler = (selectedService) => {
    setSelection((prev) => (prev === selectedService ? "" : selectedService));
  };

  return (
    <section className="bg-white p-4 rounded-md flex flex-col gap-2">
      <ul className="space-y-4 cursor-pointer">
        <li
          onClick={() => selectionHandler(service)}
          key={service.name}
          className={`border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all duration-200 p-4 rounded-md shadow-sm flex justify-between items-center ${
            selection.name === service.name ? "shadow-xl !border-blue-600" : ""
          }`}
        >
          <div className="text-blue-600 font-semibold text-sm md:text-lg">
            {service.name}
          </div>

          <div className="text-[13px] md:text-sm text-gray-400 flex gap-4">
            <div className="text-gray-500 text-sm md:text-md">
              Price:{" "}
              <span className="font-bold text-sm md:text-md">
                ${service.price}
              </span>
            </div>
            <span className="hidden sm:block">
              {service.ratingsAverage} ★ ({service.ratingsQuantity} reviews)
            </span>
          </div>
        </li>
        {services.map((service) => (
          <li
            onClick={() => selectionHandler(service)}
            key={service.name}
            className={`border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all duration-200 p-4 rounded-md shadow-sm flex justify-between items-center ${
              selection.name === service.name
                ? "shadow-xl !border-blue-600"
                : ""
            }`}
          >
            <div className="text-blue-600 font-semibold text-sm md:text-lg">
              {service.name}
            </div>

            <div className="text-[13px] md:text-sm text-gray-400 flex gap-4">
              <div className="text-gray-500 text-sm md:text-md">
                Price:{" "}
                <span className="font-bold text-sm md:text-md">
                  ${service.price}
                </span>
              </div>
              <span className="hidden sm:block">
                {service.ratingsAverage} ★ ({service.ratingsQuantity} reviews)
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
