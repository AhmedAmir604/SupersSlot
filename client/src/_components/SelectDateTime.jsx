import React, { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import Calender from "./Calender";
import AvailableSlots from "./AvailableSlots";
import dayjs from "dayjs";
import { getBookedSlots } from "@/handlers/servicesHandlers"; // Import your API call

export default function SelectDateTime({
  id, // Accept id as a prop
  bookedSlots,
  setBookedSlots,
  date,
  setDate,
  time,
  openingHours,
}) {
  const [expand, setExpand] = useState(false);
  const [slot, setSlot] = useState();

  const setDisplay = () => {
    if (date) {
      return dayjs(date).format("ddd, MMM D"); // Format as e.g., "Wed, Oct 25"
    }
    return ""; // Return empty string if no date is set
  };

  // Fetch booked slots when the date changes
  useEffect(() => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Format date to match your backend
      fetchBookedSlots(formattedDate);
    }
    setSlot(null);
  }, [date, id]); // Add id as a dependency to ensure it works when id changes

  const fetchBookedSlots = async (formattedDate) => {
    setBookedSlots([]); // Reset bookedSlots before fetching new slots
    try {
      const res = await getBookedSlots(id, formattedDate);
      const slots = res.data.bookings || [];
      setBookedSlots(slots);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl transition-all duration-200">
            {!expand && date && slot ? (
              <MdOutlineDone className="bg-green-600 rounded-full p-1" />
            ) : (
              <h1 className="border border-green-500 font-bold text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-[12px]">
                3
              </h1>
            )}
          </div>
          <h1 className="font-bold text-lg capitalize">SELECT DATE & TIME</h1>
        </div>

        <h1 className="text-lg text-blue-500 font-bold mr-12">
          {date ? ` ${setDisplay()} : ${slot || "Select Time"}` : "Select Date"}
        </h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-full translate-y-0"
            : "opacity-0 max-h-0 -translate-y-1"
        } transition-all overflow-hidden duration-200 flex items-center gap-4 px-8`}
      >
        <Calender
          open={openingHours.open}
          close={openingHours.close}
          setDate={setDate}
        />
        <AvailableSlots
          slot={slot}
          setSlot={setSlot}
          date={date}
          bookedSlots={bookedSlots}
          time={time}
        />
      </div>
    </section>
  );
}
