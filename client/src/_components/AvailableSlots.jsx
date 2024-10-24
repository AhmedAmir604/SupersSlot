import React from "react";
import dayjs from "dayjs";

// Function to generate time slots (1-hour intervals)
const generateSlots = (date) => {
  if (!date) return [];

  const startOfDay = dayjs(date).startOf("day");
  const slots = [];

  // Generate 1-hour time slots from 9 AM to 5 PM (for example)
  for (let i = 9; i <= 17; i++) {
    const slotTime = startOfDay.add(i, "hour");
    slots.push(slotTime.format("HH:mm")); // Using 24-hour format for easier comparison
  }

  return slots;
};

export default function AvailableSlots({ slot, setSlot, date, bookedSlots }) {
  const slots = generateSlots(date);

  return (
    <div className="flex flex-col gap-2">
      {slots.map((time, index) => (
        <button
          key={index}
          onClick={() => setSlot(time)}
          disabled={bookedSlots.includes(time)} // Disable if slot is booked
          className={`${
            slot === time ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded ${
            bookedSlots.includes(time) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
