import React from "react";
import dayjs from "dayjs";

// Function to generate time slots based on open and close times
const generateSlots = (date, openTime, closeTime) => {
  if (!date || !openTime || !closeTime) return [];
  const startOfDay = dayjs(date).startOf("day");

  const slots = [];

  let open = Number(openTime.split(" ")[0]);
  let temp = 12 - open - 1;
  let close = Number(closeTime.split(" ")[0]) + temp;

  // Generate 1-hour time slots from open to close
  for (let i = 0; i <= close; i++) {
    const slotTime = startOfDay.add(i + open, "hour");
    slots.push(slotTime.format("HH:mm")); // Using 24-hour format for easier comparison
  }

  return slots;
};

export default function AvailableSlots({
  slot,
  setSlot,
  date,
  bookedSlots,
  time,
}) {
  const { open, close } = time; // Destructure open and close times from the time prop
  const slots = generateSlots(date, open, close);

  // Convert bookedSlots to the same format (HH:mm)
  const formattedBookedSlots = bookedSlots.map((booking) =>
    dayjs(booking.startTime).format("HH:mm")
  );

  return (
    <div className="flex flex-col flex-wrap gap-2 h-[50vh]">
      {slots.map((time, index) => {
        const isBooked = formattedBookedSlots.includes(time);
        const isSelected = slot === time;

        return (
          <button
            key={index}
            onClick={() => !isBooked && setSlot(time)} // Prevent setting slot if booked
            disabled={isBooked}
            className={`px-4 py-2 rounded transition duration-200 ${
              isSelected
                ? "bg-blue-500 text-white"
                : isBooked
                ? "bg-gray-200 opacity-50 cursor-not-allowed"
                : "bg-gray-100 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
