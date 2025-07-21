import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { serviceCategories } from "@/lib/data";

const Categories = ({ setFilter }) => {
  const categoryRef = useRef(null);

  const scrollRight = () => {
    if (categoryRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 200 : 300;
      categoryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (categoryRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 200 : 300;
      categoryRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Popular Categories</h2>
          <p className="text-gray-600">Find the perfect service for your needs</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter(undefined)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 
                     hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            View All
          </button>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:border-blue-300 
                       hover:bg-blue-50 transition-all duration-200 shadow-sm"
            >
              <FaArrowLeft className="text-gray-600 text-sm" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:border-blue-300 
                       hover:bg-blue-50 transition-all duration-200 shadow-sm"
            >
              <FaArrowRight className="text-gray-600 text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={categoryRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {serviceCategories.map((item, index) => (
          <button
            key={index}
            onClick={() => setFilter(item.name)}
            className="flex-shrink-0 flex flex-col items-center p-4 bg-white rounded-2xl 
                     border border-gray-100 hover:border-blue-200 hover:shadow-lg 
                     transition-all duration-300 hover:-translate-y-1 group min-w-[120px]"
          >
            <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 
                          flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 
                          transition-all duration-300">
              <img
                loading="lazy"
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 
                           transition-colors duration-200 text-center leading-tight">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
