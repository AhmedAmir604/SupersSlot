import React, { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import Calender from "./Calender";
import AvailableSlots from "./AvailableSlots";
import dayjs from "dayjs";
import { getBookedSlots } from "@/handlers/servicesHandlers";

export default function SelectDateTime({
  id,
  bookedSlots,
  setBookedSlots,
  date,
  setDate,
  time,
  openingHours,
  slot,
  setSlot,
}) {
  const [expand, setExpand] = useState(false);

  const setDisplay = () => {
    if (date) {
      return dayjs(date).format("ddd, MMM D");
    }
    return "";
  };

  useEffect(() => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      fetchBookedSlots(formattedDate);
    }
    setSlot(null);
  }, [date, id]);

  const fetchBookedSlots = async (formattedDate) => {
    setBookedSlots([]);
    try {
      const res = await getBookedSlots(id, formattedDate);
      const slots = res.data.bookings || [];
      setBookedSlots(slots);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  return (
    <section className="">
      <div
        onClick={() => setExpand(!expand)}
        className=" cursor-pointer rounded-xl hover:shadow-lg transition-all duration-200 w-[90vw] mx-auto border flex justify-between items-center px-4 py-4"
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
          <h1 className="font-bold text-sm md:text-md capitalize">
            Select Date & Time
          </h1>
        </div>

        <h1 className="text-sm md:text-md capitalize text-blue-500 font-bold mr-0 md:mr-12">
          {date ? ` ${setDisplay()} : ${slot || "Select Time"}` : "Select Date"}
        </h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-full translate-y-0"
            : "opacity-0 max-h-0 -translate-y-1"
        } transition-all max-w-[90vw] overflow-hidden duration-200 flex flex-col md:flex-row gap-0 md:gap-4 px-0 sm:px-4 md:px-8`}
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
