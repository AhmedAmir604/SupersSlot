import React from "react";
import dayjs from "dayjs";
import { FiClock, FiCheck } from "react-icons/fi";

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

  const formatTime = (time) => {
    return dayjs(`2000-01-01 ${time}`).format("h:mm A");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <FiClock className="text-blue-600 text-xl" />
        <h3 className="text-lg font-semibold text-gray-900">Available Time Slots</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[40vh] overflow-y-auto">
        {slots.map((time, index) => {
          const isBooked = formattedBookedSlots.includes(time);
          const isSelected = slot === time;

          return (
            <button
              key={index}
              onClick={() => !isBooked && setSlot(time)}
              disabled={isBooked}
              className={`relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 
                       border-2 flex items-center justify-center gap-2 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg"
                  : isBooked
                  ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {isSelected && <FiCheck className="text-sm" />}
              <span>{formatTime(time)}</span>
              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-400 rotate-45" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {slots.length === 0 && (
        <div className="text-center py-8">
          <FiClock className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No available slots for this date</p>
        </div>
      )}

      {slot && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 text-blue-700">
            <FiCheck className="text-lg" />
            <span className="font-medium">Selected: {formatTime(slot)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
