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
      return dayIndex >= openDayIndex || dayIndex <= closeDayIndex;
    }
    return dayIndex >= openDayIndex && dayIndex <= closeDayIndex;
  };

  return (
    <div className="shadow-xl py-4 px-2 mt-10 gap-10 mb-10 max-w-[85vw] mx-auto border h-fit">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-5 items-center justify-between px-4 w-full">
          <GrFormPrevious
            className="w-4 h-4 text-gray-400 cursor-pointer hover:scale-105 transition-all"
            onClick={() => setToday(today.month(today.month() - 1))}
          />
          <h1
            className="font-semibold cursor-pointer text-[12px] md:text-md hover:scale-105 transition-all"
            onClick={() => setToday(currentDate)}
          >
            {months[today.month()]} {today.year()}
          </h1>
          <GrFormNext
            className="w-4 h-4 text-gray-400 cursor-pointer hover:scale-105 transition-all"
            onClick={() => setToday(today.month(today.month() + 1))}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 text-[12px] md:text-sm text-gray-800 font-bold mb-2">
        {days.map((day, index) => (
          <h1
            key={index}
            className="text-center h-8 w-8 md:h-10 md:w-10 grid place-content-center select-none"
          >
            {day}
          </h1>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            const dayIndex = date.day();
            const isDayWorking = isWorkingDay(dayIndex);

            return (
              <div
                key={index}
                className={cn(
                  "p-1 md:p-2 text-center grid text-gray-600 place-content-center text-[12px] font-semibold border-t",
                  !isDayWorking && "cursor-not-allowed opacity-50"
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
                    "h-7 w-7 md:h-10 md:w-10 rounded-full grid place-content-center hover:bg-blue-600 hover:text-white transition-all select-none",
                    !isDayWorking
                      ? "cursor-not-allowed opacity-50 pointer-events-none"
                      : "cursor-pointer"
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
