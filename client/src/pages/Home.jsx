import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { MdStar } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
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

  const setSearch = (value) => {
    clearTimeout(window.debounceTimeout);
    window.debounceTimeout = setTimeout(() => {
      fetchForInput(value);
    }, 500);
  };

  const fetchForInput = async (value) => {
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

      if (filter) {
        updatedServices = updatedServices.filter(
          (service) => service.serviceType === filter
        );
      }

      if (sort) {
        updatedServices.sort((a, b) => {
          if (sort === "price") return a.price - b.price;
          if (sort === "rating") return b.rating - a.rating;
          if (sort === "name") return a.name.localeCompare(b.name);
          return 0;
        });
      }

      setFilteredServices(updatedServices);
    };

    filterAndSortServices();
  }, [filter, sort, services]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Book Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Service Experience
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Discover and book premium beauty, wellness, and lifestyle services near you
            </p>
          </div>

          {/* Enhanced Search Section */}
          <div className="max-w-2xl mx-auto relative z-30" ref={searchBoxRef}>
            <div className="relative">
              <input
                className="w-full h-16 rounded-2xl pl-16 pr-6 text-lg text-gray-800 placeholder:text-gray-500 
                         bg-white/95 backdrop-blur-sm border-2 border-white/20 
                         focus:outline-none focus:ring-4 focus:ring-yellow-400/30 focus:border-yellow-400/50
                         shadow-2xl transition-all duration-300"
                placeholder="Search for salons, spas, barbers..."
                autoComplete="off"
                id="search"
                name="search"
                type="text"
                inputMode="search"
                onFocus={() => setExpand(true)}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoSearchOutline className="absolute text-3xl top-1/2 left-5 transform -translate-y-1/2 text-blue-600" />
            </div>
            
            <div className="flex items-center justify-center gap-2 text-blue-100 mt-4">
              <CiLocationOn className="text-xl" />
              <span className="text-sm font-medium">New York City, United States</span>
            </div>

            {/* Enhanced Search Results */}
            {expand && results.length > 0 && (
              <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setExpand(false)}>
                <div 
                  className="absolute top-[calc(16rem)] left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[60vh] overflow-y-auto">
                    {results.slice(0, 8).map((service, index) => (
                      <div
                        key={index}
                        onClick={() => clickHandler(service._id)}
                        className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 
                                cursor-pointer transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-700">
                              {service.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center gap-1 text-yellow-600">
                                <MdStar className="text-base" />
                                <span className="font-medium">{service.ratingsAverage || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-1 text-green-600">
                                <BiDollar className="text-base" />
                                <span className="font-medium">${service.price}</span>
                              </div>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                {service.serviceType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {results.length > 8 && (
                      <div className="p-4 text-center border-t border-gray-100">
                        <button 
                          onClick={() => {
                            setQuery(searchBoxRef.current.querySelector('input').value);
                            setExpand(false);
                            window.scrollTo({
                              top: document.querySelector('.services-grid').offsetTop - 100,
                              behavior: 'smooth'
                            });
                          }}
                          className="text-blue-600 font-medium hover:text-blue-800"
                        >
                          View all {results.length} results
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          <Categories setFilter={setFilter} />
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <Filter setSort={setSort} sort={sort} />
        </div>

        {/* Services Grid */}
        <div className="mb-8 services-grid">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filter ? `${filter} Services` : 'All Services'}
            </h2>
            <span className="text-gray-600 text-sm">
              {filteredServices.length} services found
            </span>
          </div>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  clickHandler={clickHandler}
                  key={service._id || index}
                  service={service}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <IoSearchOutline className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any services matching your criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
