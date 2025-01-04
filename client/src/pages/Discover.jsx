import GetLocation from "@/_components/GetLocation";
import MemoizedServiceCard from "@/_components/ServiceCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Discover() {
  const [services, setServices] = useState([]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/services/${id}`);
  };

  return (
    <section className="px-16 flex flex-col gap-16">
      <GetLocation
        setServices={setServices}
        location={location}
        setLocation={setLocation}
      />
      {/* <Map services={services} userLocation={location} /> */}
      <div className="flex flex-wrap gap-10 justify-center">
        {services.length > 0 &&
          services.map((service, index) => (
            <MemoizedServiceCard
              key={index}
              service={service}
              clickHandler={clickHandler}
            />
          ))}
      </div>
    </section>
  );
}
