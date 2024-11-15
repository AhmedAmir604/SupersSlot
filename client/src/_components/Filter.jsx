import React, { useState } from "react";

const Filter = ({ setSort, sort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSort(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="cursor-pointer w-fit relative"
    >
      <div className="bg-blue-500 text-white p-2 px-4 rounded flex items-center justify-between gap-2 transition duration-300 hover:bg-blue-600">
        <span className="text-md">{sort ? sort : "Filter"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14px"
          viewBox="0 0 512 512"
          className={`fill-current ${
            isOpen ? "rotate-0" : "-rotate-90"
          } transition-transform duration-300`}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      {
        // Show options if dropdown is open
        <div
          className={`transition-opacity duration-200 absolute left-0 top-full mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {["price", "ratingsAverage", "priceRange", "Option3"].map(
            (option) => (
              <div key={option} className="flex items-center">
                <input
                  id={option}
                  name="option"
                  type="radio"
                  checked={sort === option}
                  className="hidden"
                  onChange={() => handleOptionSelect(option)}
                />
                <label
                  className="block text-gray-700 text-sm cursor-pointer py-1 px-4 rounded hover:bg-blue-100"
                  htmlFor={option}
                >
                  {option}
                </label>
              </div>
            )
          )}
        </div>
      }
    </div>
  );
};

export default Filter;
