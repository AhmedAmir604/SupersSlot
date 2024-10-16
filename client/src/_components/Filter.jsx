import React, { useState } from "react";

const Filter = ({ query, setQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState("");
  const handleOptionSelect = (option) => {
    setQuery(`sort=${option}`);
    setSelection(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="cursor-pointer w-fit relative"
    >
      <div
        className="bg-[#2c2c2c] p-2 px-6 py-2 rounded flex items-center justify-between gap-2 transition duration-300 hover:bg-gray-700"
        // Toggle dropdown
      >
        <span className=" text-md text-gray-200">
          {selection ? selection : "Filter"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14px"
          viewBox="0 0 512 512"
          className={` fill-current text-white  ${
            isOpen ? "rotate-0" : "-rotate-90"
          } transition-all duration-300`}
        >
          <path
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            fill="#yourColorHere"
          />
        </svg>
      </div>

      {
        // Show options if dropdown is open
        <div
          onMouseLeave={() => setIsOpen(false)}
          className={`border border-gray-600 transition-all duration-200 absolute left-0 top-full mt-1 bg-[#2c2c2c] rounded shadow-md p-2 ${
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
                  checked={query === option}
                  className="hidden"
                  onChange={() => handleOptionSelect(option)}
                />
                <label
                  className="block text-white text-sm cursor-pointer py-2 px-6 mx-auto rounded hover:bg-gray-700"
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
