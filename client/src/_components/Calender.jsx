import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../../utils/calender.js";
import cn from "../../utils/cn.js";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar({
  setDate,
  open = "Monday",
  close = "Sunday",
}) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dayToIndex = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thru: 4,
    Fri: 5,
    Sat: 6,
  };
  const openDayIndex = dayToIndex[open];
  const closeDayIndex = dayToIndex[close];

  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  // Function to check if a day is within the working days
  const isWorkingDay = (dayIndex) => {
    if (closeDayIndex < openDayIndex) {
      // This accounts for when the range wraps around the week (e.g., Sunday to Thursday)
      return dayIndex >= openDayIndex || dayIndex <= closeDayIndex;
    }
    return dayIndex >= openDayIndex && dayIndex <= closeDayIndex;
  };

  return (
    <div className="shadow-xl py-4 px-2 mt-10 gap-10 mb-10 border h-fit">
      <div className="flex justify-between items-center">
        <div className="flex gap-10 items-center justify-between px-4 w-full">
          <GrFormPrevious
            className="w-5 h-5 text-gray-400 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <h1
            className="font-semibold cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            {months[today.month()]} {today.year()}
          </h1>
          <GrFormNext
            className="w-5 h-5 text-gray-400 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          return (
            <h1
              key={index}
              className="text-sm text-center h-14 w-14 font-bold grid place-content-center text-gray-800 select-none"
            >
              {day}
            </h1>
          );
        })}
      </div>

      <div className="grid grid-cols-7">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            const dayIndex = date.day(); // Get the index of the day (0-6)
            const isDayWorking = isWorkingDay(dayIndex); // Check if it’s a working day

            return (
              <div
                key={index}
                className={cn(
                  "p-2 text-center h-14 grid text-gray-600 place-content-center text-[13px] font-semibold border-t",
                  !isDayWorking && "cursor-not-allowed opacity-50" // Blurs non-working days
                )}
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-blue-600 text-white"
                      : "",
                    "h-10 w-10 rounded-full grid place-content-center hover:bg-blue-600 hover:text-white transition-all select-none",
                    !isDayWorking
                      ? "cursor-not-allowed opacity-50 pointer-events-none"
                      : "cursor-pointer" // Apply classes based on isDayWorking
                  )}
                  onClick={() => {
                    if (isDayWorking) {
                      setSelectDate(date);
                      setDate(date);
                    }
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
