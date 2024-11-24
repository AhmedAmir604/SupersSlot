import { discover } from "@/handlers/servicesHandlers";
import React, { useEffect, useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [range, setRange] = useState(5000);
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);
        },
        (error) => {
          setError("sorry something went wrong!", error);
        }
      );
    }
    console.log(location);
  };

  useEffect(() => {
    (async () => {
      try {
        const coordinates = [location.longitude, location.latitude];
        const res = await discover(coordinates, range);

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [location]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Range</h1>
      <input
        onChange={(e) => setRange(e.target.value * 1000)}
        placeholder="Enter Km range!"
      />
      <h1>Get Your Location</h1>
      <button
        className="border border-black"
        onClick={fetchLocation}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Get Location
      </button>
      {location.latitude && location.longitude && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GetLocation;
