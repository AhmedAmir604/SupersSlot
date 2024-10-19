import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function VisitingReason() {
  const [expand, setExpand] = useState(false);
  const [selection, setSelection] = useState();

  return (
    <section className="">
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl">
            {expand ? (
              <h1 className="border border-green-500 font-bold text-green-500 py- rounded-full px-[10px] text-[14px]">
                2
              </h1>
            ) : (
              <MdOutlineDone className="bg-green-600 rounded-full p-1" />
            )}{" "}
          </div>
          <h1 className="font-bold text-lg capitalize">VISITING REASON</h1>
        </div>
        <h1 className="text-lg text-blue-500 font-bold mr-12">
          {selection ? selection : ""}
        </h1>
      </div>

      {/* Control height and visibility */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          expand
            ? "max-h-[500px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0  -translate-y-5"
        }`}
      >
        <div className="mt-4 px-4 py-2">
          <h1 className="text-md text-gray-600 font-bold mb-4">
            What are you visiting for?
          </h1>
          <div className="flex flex-wrap gap-4">
            {[
              "ToothPain",
              "Denturus",
              "Broken Tooth",
              "Check up",
              "Cosmetic",
              "Others",
            ].map((item, index) => (
              <div
                onClick={() => setSelection(item)}
                key={index}
                className={`cursor-pointer text-md font-bold text-gray-600 border border-gray-200 px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200 ${
                  selection === item && "bg-blue-700 text-white"
                } rounded-md`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className=" mt-6">
            <h1 className="font-bold text-gray-700 mb-1">
              Is this an Emergency Visit?
            </h1>
            <label className="inline-flex mr-4 items-center cursor-pointer">
              <input type="radio" name="radio" className="peer" value="1" />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="radio" name="radio" className="peer" value="2" />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
