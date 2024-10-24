import React, { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import Calender from "./Calender";
import AvailableSlots from "./AvailableSlots";
import dayjs from "dayjs";

export default function SelectDateTime() {
  const [expand, setExpand] = useState(false);
  const [date, setDate] = useState(null); // Initially set to null
  const [slot, setSlot] = useState();
  const [bookedSlots, setBookedSlots] = useState([]);

  const setDisplay = () => {
    if (date) {
      return date.$d.toString().split(" ").slice(0, 3).join(" ");
    }
  };

  // Fetch booked slots when the date changes
  useEffect(() => {
    if (date) {
      // Example of fetching booked slots from an API (or use a static array)
      const formattedDate = dayjs(date.$d).format("YYYY-MM-DD"); // Format date to match your backend
      fetchBookedSlots(formattedDate);
    }
  }, [date]);

  const fetchBookedSlots = (formattedDate) => {
    // Replace this with an API call to fetch booked slots for the selected date
    const dummyBookedSlots = {
      "2024-10-24": ["09:00", "14:00"], // Example: these slots are booked for 2024-10-24
      "2024-10-25": ["10:00", "15:00"], // Booked slots for another date
    };

    setBookedSlots(dummyBookedSlots[formattedDate] || []);
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
          {date ? ` ${setDisplay()} : ${slot} ` : ""}
        </h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-[500px] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-6"
        } transition-all overflow-hidden duration-200 flex gap-4 px-8`}
      >
        <Calender setDate={setDate} />
        <AvailableSlots
          slot={slot}
          setSlot={setSlot}
          date={date}
          bookedSlots={bookedSlots}
        />
      </div>
    </section>
  );
}
