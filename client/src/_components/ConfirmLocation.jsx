import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import LimitServices from "./LimitServices";

export default function ConfirmLocation() {
  const [expand, setExpand] = useState(false);
  const [selection, setSelection] = useState();

  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl transition-all duration-200">
            {!expand && selection ? (
              <MdOutlineDone className="bg-green-600 rounded-full p-1" />
            ) : (
              <h1 className="border border-green-500 font-bold text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-[12px]">
                1
              </h1>
            )}{" "}
          </div>
          <h1 className="font-bold text-lg capitalize">Confirm Location</h1>
        </div>
        <h1 className="text-lg text-blue-500 font-bold mr-12">
          {selection ? selection : ""}
        </h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-[500px] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-6"
        } transition-all overflow-hidden duration-200 flex gap-4 px-8`}
      >
        <LimitServices selection={selection} setSelection={setSelection} />
      </div>
    </section>
  );
}
