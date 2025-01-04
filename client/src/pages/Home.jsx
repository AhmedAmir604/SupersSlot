import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Categories from "@/_components/Categories";
import ServiceCard from "@/_components/ServiceCard";
import { getAllServices, searchHandler } from "@/handlers/servicesHandlers";
import Filter from "@/_components/Filter";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState();
  const [filteredServices, setFilteredServices] = useState([]);
  const [sort, setSort] = useState();
  const [results, setResults] = useState([]);
  const [expand, setExpand] = useState(false);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const clickHandler = async (id) => {
    navigate(`/services/${id}`);
  };

  //This is kind of a method for auto search like for search suggestion and this method is working with debouncing
  const setSearch = (value) => {
    clearTimeout(window.debounceTimeout);
    window.debounceTimeout = setTimeout(() => {
      fetchForInput(value);
    }, 2500);
  };

  // const fetchResults = async (value) => {
  //   try {
  //     const res = await searchHandler(value);
  //     if (res) {
  //       setFilteredServices(res.data.services);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const fetchForInput = async (value) => {
    // Reset the results if the input is empty
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await searchHandler(value);
      if (res) {
        setResults(res.data.services);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setExpand(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await getAllServices(query);
        if (res) setServices(res.data.services);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    }
    fetchServices();
  }, [query]);

  useEffect(() => {
    const filterAndSortServices = () => {
      let updatedServices = [...services];

      // Apply Filter
      if (filter) {
        updatedServices = updatedServices.filter(
          (service) => service.serviceType === filter
        );
      }

      // Apply Sort
      if (sort) {
        updatedServices.sort((a, b) => {
          if (sort === "price") return a.price - b.price; // Ascending price
          if (sort === "rating") return b.rating - a.rating; // Descending rating
          if (sort === "name") return a.name.localeCompare(b.name); // Alphabetical
          return 0; // Default
        });
      }

      setFilteredServices(updatedServices);
    };

    filterAndSortServices();
  }, [filter, sort, services]);

  return (
    <section className="bg-white flex flex-col items-center md:px-4 py-6 px-4">
      <div className="mb-10 w-full max-w-3xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-12 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">
          Discover Services
        </h1>
        <label className="relative block">
          <input
            className="w-full py-2 rounded-full pl-10 pr-4 text-gray-700 placeholder:text-gray-500 focus:outline-none"
            placeholder="Search Services..."
            ref={searchBoxRef}
            autoComplete="off"
            id="search"
            name="search"
            type="text"
            inputMode="search"
            onFocus={() => setExpand(true)}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <IoSearchOutline className="absolute text-2xl top-2 left-3 text-gray-500" />
        </label>
        <div className="text-xs flex items-center gap-1 text-white mt-2 justify-center">
          <CiLocationOn className="text-lg" />
          <span>New York City, United States</span>
        </div>
        {expand && results.length > 0 && (
          <div className="absolute z-50">
            <ul className="relative bg-white py-4 px-1 sm:px-4 border border-gray-200 shadow-lg rounded-xl flex flex-col gap-4">
              {results.map((service, index) => {
                return (
                  <a
                    key={index}
                    href="#"
                    target="#"
                    className="border hover:border-gray-400 rounded-xl hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                  >
                    <li
                      key={index}
                      className="relative flex flex-col items-start gap-3 justify-center sm:px-4 py-4 border border-transparent hover:bg-gray-100 transition-all duration-200 rounded-xl"
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-5 transition-all duration-200 rounded-xl"></div>

                      {/* Title */}
                      <h1 className="text-xs sm:text-sm md:text-base font-bold border py-1 px-4 sm:px-8 lg:px-20 rounded-full bg-gray-300 text-center">
                        {service.name}
                      </h1>

                      {/* Description */}
                      <h3 className="bg-blue-500 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-1 rounded-full text-xs sm:text-sm md:text-base text-center">
                        {service.description}{" "}
                      </h3>

                      {/* Contact Details */}
                      <div className="flex flex-wrap gap-4">
                        <h3 className="text-xs sm:text-sm font-semibold py-1 text-center rounded-full bg-gray-200 px-6 sm:px-8">
                          ${service.phoneNumber}
                        </h3>
                        <h3 className="text-xs sm:text-sm font-semibold px-6 sm:px-8 py-1 text-center rounded-full bg-gray-200">
                          {`${service.address?.city} ${service.address?.street} `}
                        </h3>
                      </div>

                      {/* Additional Info */}
                      <div className="flex flex-wrap gap-3 font-bold">
                        <h3 className="text-[10px] sm:text-[12px] border-[3px] border-blue-500 px-2 sm:px-4 rounded-xl max-w-[4rem] sm:max-w-[6rem]">
                          {service.price}
                        </h3>
                        <h3 className="text-[10px] sm:text-[12px] border-[3px] border-blue-500 px-2 sm:px-4 rounded-xl max-w-[4rem] sm:max-w-[6rem]">
                          ⭐ {service.ratingsAverage}
                        </h3>
                        <h3 className="text-[10px] sm:text-[12px] border-[3px] border-blue-500 px-2 sm:px-4 rounded-xl max-w-[4rem] sm:max-w-[6rem]">
                          {service.serviceType}
                        </h3>
                      </div>
                    </li>
                  </a>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <Categories setFilter={setFilter} />

      <div className="w-full max-w-3xl mt-6">
        <Filter setSort={setSort} sort={sort} />
      </div>

      {/* Gradient Background for Card Section */}
      <div className="flex flex-wrap gap-8 mt-8 justify-center w-full max-w-4xl bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-3 md:p-6 py-4 rounded-lg shadow-lg">
        {filteredServices.length > 0
          ? filteredServices.map((service, index) => (
              <ServiceCard
                clickHandler={clickHandler}
                key={index}
                service={service}
              />
            ))
          : "Sorry, no such service is available."}
      </div>
    </section>
  );
}
