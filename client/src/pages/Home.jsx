import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Categories from "@/_components/Categories";
import ServiceCard from "@/_components/ServiceCard";
import { getAllServices } from "@/handlers/servicesHandlers";
import Filter from "@/_components/Filter";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const clickHandler = async (id) => {
    navigate(`/services/${id}`);
  };

  useEffect(() => {
    async function getAll() {
      try {
        const res = await getAllServices(query);
        if (res) setServices(res.data.services);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    }
    getAll();
  }, [query]);

  return (
    <section className="bg-white flex flex-col items-center px-0 md:px-4 py-6  ">
      <div className="mb-10 w-full max-w-3xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-12 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">
          Discover Services
        </h1>
        <label className="relative block">
          <input
            className="w-full py-2 rounded-full pl-10 pr-4 text-gray-700 placeholder:text-gray-500 focus:outline-none"
            placeholder="Search services"
            id="search"
            name="search"
            type="text"
            inputMode="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <IoSearchOutline className="absolute text-2xl top-2 left-3 text-gray-500" />
        </label>
        <div className="text-xs flex items-center gap-1 text-white mt-2 justify-center">
          <CiLocationOn className="text-lg" />
          <span>New York City, United States</span>
        </div>
      </div>

      <Categories />

      <div className="w-full max-w-3xl mt-6">
        <Filter query={query} setQuery={setQuery} />
      </div>

      {/* Gradient Background for Card Section */}
      <div className="flex flex-wrap gap-8 mt-8 justify-center  w-full max-w-4xl bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-3 md:p-6 py-4 rounded-lg shadow-lg">
        {services.map((service, index) => (
          <ServiceCard
            clickHandler={clickHandler}
            key={index}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}
