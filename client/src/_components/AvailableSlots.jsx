import React, { useCallback } from "react";

export default function AvailableSlots({ slot, setSlot }) {
  // Only call SetSlot if the slot is different
  const clickHandler = useCallback(
    (date) => {
      if (date !== slot) {
        setSlot(date); // Update only the parent state
      }
    },
    [slot, setSlot] // Dependencies: slot and SetSlot
  );

  return (
    <section className="max-w-[50%] mt-10">
      <h1 className="font-bold">Morning</h1>
      <div className="flex pl-2 py-2 flex-wrap gap-3">
        {[
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
        ].map((date, index) => (
          <div
            className={`cursor-pointer rounded-md hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-md text-gray-700 border px-3 py-2 text-md font-semibold ${
              date === slot ? "bg-blue-600 text-white" : ""
            }`}
            key={index}
            onClick={() => clickHandler(date)}
          >
            {date}
          </div>
        ))}
      </div>
    </section>
  );
}
