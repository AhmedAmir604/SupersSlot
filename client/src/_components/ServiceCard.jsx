import React from "react";

function ServiceCard({ service, clickHandler }) {
  return (
    <div
      onClick={() => clickHandler(service._id)}
      className="w-full  md:w-[40%] cursor-pointer hover:-translate-y-1.5 transition-all border border-transparent hover:border-blue-500 rounded-lg p-4 shadow-md bg-white flex flex-col items-start gap-3 duration-200"
    >
      <img
        className="w-14 h-14 rounded-full object-cover"
        src={
          service?.images && service.images.length > 0
            ? service.images[0]
            : "fallback-image-url"
        }
        alt={service?.name || "Service Image"}
      />
      <div className="text-blue-600">
        <h2 className="text-lg font-semibold">
          {service?.name || "Service Name"}
        </h2>
        <p className="text-sm text-blue-500">
          {service?.shopName || "Shop Name"}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {service?.description || "No description available"}
        </p>
      </div>
      <div className="text-sm text-gray-500 mt-2 space-y-1">
        <p>{service?.priceRange || "Price not available"}</p>
        <p>
          {service?.address
            ? `${service.address.city}, ${service.address.state}`
            : "Location not available"}
        </p>
        <p>
          ★ {service?.ratingsAverage || "No ratings"} (
          {service?.ratingsQuantity || "0"} reviews)
        </p>
      </div>
    </div>
  );
}

const MemoizedServiceCard = React.memo(ServiceCard);
MemoizedServiceCard.displayName = "ServiceCard";
export default MemoizedServiceCard;
