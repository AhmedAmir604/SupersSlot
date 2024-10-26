import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import LimitServices from "./LimitServices";
import { Button } from "@/components/ui/button";

export default function ConfirmLocation({
  services,
  selection,
  setSelection,
  service,
}) {
  const [expand, setExpand] = useState(false);

  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl transition-all duration-200">
            {!expand && selection.name ? (
              <MdOutlineDone className="bg-green-600 rounded-full p-1" />
            ) : (
              <h1 className="border border-green-500 font-bold text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-[12px]">
                1
              </h1>
            )}
          </div>
          <h1 className="font-bold text-md capitalize capitalize">
            Confirm Location
          </h1>
        </div>
        <h1 className="font-bold text-md capitalize text-blue-500 mr-12">
          {selection?.name ? selection?.name : ""}
        </h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-[500px] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-6"
        } transition-all overflow-hidden duration-200 flex flex-col px-8`}
      >
        <Button className="bg-blue-600 text-white w-fit ml-auto hover:bg-blue-500 mt-4">
          {services[0]?.serviceType}
        </Button>

        <LimitServices
          selection={selection}
          setSelection={setSelection}
          services={services}
          service={service}
        />
      </div>
    </section>
  );
}
