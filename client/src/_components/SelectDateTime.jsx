import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import Calender from "./Calender";
import AvailableSlots from "./AvailableSlots";

export default function SelectDateTime() {
  const [expand, setExpand] = useState(false);
  const [date, setDate] = useState();
  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl">
            {expand ? (
              <h1 className="border border-green-500 font-bold text-green-500 rounded-full px-[10px] text-[14px]">
                3
              </h1>
            ) : (
              <MdOutlineDone className="bg-green-600 text-3xl rounded-full p-1" />
            )}{" "}
          </div>
          <h1 className="font-bold text-lg capitalize">SELECT DATE & TIME</h1>
        </div>
        <h1 className="text-lg text-blue-500 font-bold mr-12"></h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-[500px] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-6"
        } transition-all overflow-hidden duration-200 flex gap-4 px-8`}
      >
        <Calender setDate={setDate} />
        <AvailableSlots />
      </div>
    </section>
  );
}
