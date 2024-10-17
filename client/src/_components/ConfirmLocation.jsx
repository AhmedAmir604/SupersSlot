import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function ConfirmLocation() {
  const [expand, setExpand] = useState(false);
  return (
    <section>
      <div className="cursor-pointer w-full border flex justify-between items-center px-4 py-4">
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl">
            <MdOutlineDone className="bg-green-600 rounded-full p-1" />
          </div>
          <h1 className="font-bold text-lg capitalize">Confirm Location</h1>
        </div>
        <h1 className="text-lg text-blue-500 font-bold mr-12">Skokie, IIL</h1>
      </div>
    </section>
  );
}
