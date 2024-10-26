import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function VisitingReason({ category, setCategory, categories }) {
  const [expand, setExpand] = useState(false);

  const selectionHandler = (item) => {
    setCategory(item);
  };

  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer rounded-xl hover:shadow-lg transition-all duration-200 w-[90vw] mx-auto border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl transition-all duration-200">
            {!expand && category ? (
              <MdOutlineDone className="bg-green-600 rounded-full p-1" />
            ) : (
              <h1 className="border border-green-500 font-bold text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-[12px]">
                2
              </h1>
            )}
          </div>
          <h1 className="font-bold text-sm md:text-md capitalize">
            Visiting Reason
          </h1>
        </div>
        <h1 className="font-bold text-sm md:text-md capitalize text-blue-500 mr-0 md:mr-12">
          {category ? category : ""}
        </h1>
      </div>

      {/* Control height and visibility */}
      <div
        className={`${
          expand
            ? "opacity-100 max-h-[500px] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-6"
        } transition-all overflow-hidden max-w-[90vw] duration-200 flex flex-col px-0 md:px-8`}
      >
        <div className="mt-4 px-4 py-2">
          <h1 className="text-md text-gray-600 font-bold mb-4">
            What are you visiting for?
          </h1>
          <div className="flex flex-wrap gap-4">
            {categories &&
              categories.map((item, index) => (
                <div
                  onClick={() => selectionHandler(item)}
                  key={index}
                  className={`cursor-pointer text-sm md:text-md font-bold text-gray-600 border border-gray-200 px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200 ${
                    category === item && "bg-blue-700 text-white"
                  } rounded-md`}
                >
                  {item}
                </div>
              ))}
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-sm md:text-md text-gray-700 mb-1">
              Is this an Emergency Visit?
            </h1>
            <label className="inline-flex mr-4 items-center cursor-pointer">
              <input type="radio" name="radio" className="peer" value="1" />
              <span className="ml-2 text-gray-700 text-sm md:text-md">Yes</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="radio" name="radio" className="peer" value="2" />
              <span className="ml-2 text-gray-700 text-sm md:text-md">No</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
