import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function VisitingReason() {
  const [expand, setExpand] = useState(false);
  const [selection, setSelection] = useState();

  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl">
            {expand ? (
              <h1 className="border border-green-500 font-bold text-green-500 py- rounded-full px-2 text-[17px]">
                2
              </h1>
            ) : (
              <MdOutlineDone className="bg-green-600 rounded-full" />
            )}{" "}
          </div>
          <h1 className="font-bold text-lg capitalize">VISITING REASON</h1>
        </div>
        <h1 className="text-lg text-blue-500 font-bold mr-12">Skokie, IIL</h1>
      </div>
      <div
        className={`${
          expand ? "opacity-100" : "opacity-0 h-0 w-0"
        } mt-4 px-4 py-2 transition-all duration-300 overflow-hidden`}
      >
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
      </div>
      <div className="px-4 mt-4">
        <h1 className="font-bold text-gray-700">Is this an Emergency Visit?</h1>
        <label className="inline-flex items-center cursor-pointer">
          <input type="radio" name="radio" className="peer hidden" value="1" />
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex justify-center items-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
            <div className="w-2 h-2 bg-transparent rounded-full peer-checked:bg-white"></div>
          </div>
          <span className="ml-2 text-gray-700">Yes</span>
        </label>
        <label className="inline-flex items-center cursor-pointer">
          <input type="radio" name="radio" className="peer hidden" value="2" />
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex justify-center items-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
            <div className="w-2 h-2 bg-transparent rounded-full peer-checked:bg-white"></div>
          </div>
          <span className="ml-2 text-gray-700">No</span>
        </label>
      </div>
    </section>
  );
}
