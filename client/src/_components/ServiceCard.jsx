import React from "react";

function ServiceCard({ service }) {
  return (
    <div className="md:w-[40%] w-[80%] min-h-[18rem] border-[5px] border-transparent hover:border-[#121212] flex flex-col lg:flex-row items-center bg-[#2c2c2c] shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-16 h-16 rounded-full object-cover mr-4"
        src={
          service?.images && service.images.length > 0
            ? service.images[0]
            : "fallback-image-url"
        }
        alt={service?.name || "Unknown"}
      />
      <div className="text-white">
        <h2 className="text-md md:text-lg">{service?.name || "Unknown"}</h2>
        <h3 className="text-sm md:text-md text-gray-300">
          {service?.shopName || "Unknown Shop"}
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          {service?.description || "No description available"}
        </p>
        <p className="mt-2 text-sm">{service?.priceRange || "Unknown price"}</p>
        <p className="text-sm text-gray-400">
          {service?.address
            ? `${service.address.street}, ${service.address.city}, ${service.address.state} ${service.address.zipCode}`
            : "Unknown address"}
        </p>
        <p className="text-sm text-gray-400">
          ★ {service?.ratingsAverage || "No ratings"} (
          {service?.ratingsQuantity || "0"} reviews)
        </p>
        <p className="text-sm text-gray-400">
          Phone: {service?.phoneNumber || "Unknown"}
        </p>
        <p className="text-sm text-gray-400">
          Hours: {service?.openingHours || "Not specified"}
        </p>
      </div>
    </div>
  );
}

const MemoizedServiceCard = React.memo(ServiceCard);
MemoizedServiceCard.displayName = "ServiceCard";
export default MemoizedServiceCard;
