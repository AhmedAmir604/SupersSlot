import React from "react";
import { MdStar, MdLocationOn } from "react-icons/md";
import { BiDollar } from "react-icons/bi";

function ServiceCard({ service, clickHandler }) {
  return (
    <div
      onClick={() => clickHandler(service._id)}
      className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl 
                 border border-gray-100 hover:border-blue-200 transition-all duration-300 
                 hover:-translate-y-2 overflow-hidden max-w-sm"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          src={
            service?.images && service.images.length > 0
              ? service.images[0]
              : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
          }
          alt={service?.name || "Service Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <BiDollar className="text-green-600 text-sm" />
          <span className="text-sm font-semibold text-gray-900">
            {service?.price || service?.priceRange || "N/A"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {service?.name || "Service Name"}
          </h3>
          <p className="text-sm text-blue-600 font-medium">
            {service?.shopName || service?.serviceType || "Professional Service"}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {service?.description || "Professional service with excellent quality and customer satisfaction."}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MdLocationOn className="text-blue-500 flex-shrink-0" />
            <span className="truncate">
              {service?.address
                ? `${service.address.city}, ${service.address.state}`
                : "Location available"}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-500" />
              <span className="font-medium text-gray-900">
                {service?.ratingsAverage || "4.5"}
              </span>
            </div>
            <span className="text-gray-500">
              ({service?.ratingsQuantity || "0"} reviews)
            </span>
          </div>
        </div>

        {/* Service Type Badge */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                         bg-blue-100 text-blue-700 border border-blue-200">
            {service?.serviceType || "Service"}
          </span>
          
          {/* Book Now Button */}
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm 
                           hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors duration-200">
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

const MemoizedServiceCard = React.memo(ServiceCard);
MemoizedServiceCard.displayName = "ServiceCard";
export default MemoizedServiceCard;
