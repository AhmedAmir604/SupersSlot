import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function PatientDetails() {
  const [expand, setExpand] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [display, setDisplay] = useState();
  const [submitted, setSubmitted] = useState(false); // To track submission

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setDisplay(formData.name);
    setSubmitted(true); // Track that form has been submitted
  };

  return (
    <section>
      <div
        onClick={() => setExpand(!expand)}
        className="cursor-pointer w-full border flex justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4 items-center">
          <div className="text-white text-xl">
            {!submitted ? (
              <h1 className="border border-green-500 font-bold text-green-500 rounded-full h-6 w-6 flex items-center justify-center text-[13px]">
                4
              </h1>
            ) : (
              <MdOutlineDone className="bg-green-600 text-2xl rounded-full p-1" />
            )}
          </div>
          <h1 className="font-bold text-md capitalize">PATIENT DETAILS</h1>
        </div>
        <h1 className="text-md text-blue-500 font-bold mr-12">{display}</h1>
      </div>
      <div
        className={`${
          expand
            ? "opacity-100 max-h-[500px] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-6"
        } transition-all overflow-hidden duration-200 flex gap-4 px-8`}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full text-blue-900 font-bold flex flex-col space-y-4 py-6"
        >
          <div className="flex gap-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm px-2">
                Name
              </label>
              <input
                required
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm px-2">
                Phone
              </label>
              <input
                required
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm px-2">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-2 w-1/2"
            />
          </div>
          <button
            type="submit"
            className="border px-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all w-1/4"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
