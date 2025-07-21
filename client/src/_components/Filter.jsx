import React, { useState } from "react";
import { FiChevronDown, FiFilter } from "react-icons/fi";

const Filter = ({ setSort, sort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { value: "price", label: "Price: Low to High", icon: "💰" },
    { value: "rating", label: "Highest Rated", icon: "⭐" },
    { value: "name", label: "Alphabetical", icon: "🔤" },
    { value: "newest", label: "Newest First", icon: "🆕" }
  ];

  const handleOptionSelect = (option) => {
    setSort(option);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const selected = filterOptions.find(opt => opt.value === sort);
    return selected ? selected.label : "Sort by";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl 
                 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
      >
        <FiFilter className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700 min-w-[120px] text-left">
          {getSelectedLabel()}
        </span>
        <FiChevronDown 
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 
                        rounded-xl shadow-lg z-20 overflow-hidden">
            <div className="py-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 
                           transition-colors duration-150 ${
                             sort === option.value 
                               ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500" 
                               : "text-gray-700"
                           }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                  {sort === option.value && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            {sort && (
              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={() => handleOptionSelect(null)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-gray-700 
                           hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
