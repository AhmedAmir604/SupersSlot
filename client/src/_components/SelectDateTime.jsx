import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import Calender from "./Calender";

export default function SelectDateTime() {
  const [expand, setExpand] = useState(false);
  return (
    <section>
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
          <h1 className="font-bold text-lg capitalize">SELECT DATE & TIME</h1>
        </div>
        <h1 className="text-lg text-blue-500 font-bold mr-12"></h1>
      </div>
      <Calender />
    </section>
  );
}
