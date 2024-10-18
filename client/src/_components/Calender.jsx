import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "tailwindcss/tailwind.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        locale={enGB}
        calendarClassName="rounded-sm shadow-md bg-white"
        dayClassName={(date) =>
          ` font-bold ${
            date.getDate() === selectedDate.getDate()
              ? "bg-blue-500 text-white font-bold rounded-full mx-1"
              : "text-gray-900 hover:bg-blue-100 rounded-full mx-1"
          }`
        }
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div className="flex justify-between items-center mb-2">
            <button onClick={decreaseMonth}>
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <span className="text-lg font-semibold">
              {monthDate.toLocaleString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={increaseMonth}>
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Calendar;
