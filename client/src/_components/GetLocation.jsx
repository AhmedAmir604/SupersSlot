import { discover } from "@/handlers/servicesHandlers";
import React, { useEffect, useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [range, setRange] = useState(5000); // Default range in meters
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);
        },
        () => {
          setError(
            "Unable to fetch your location. Please enable location services."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      (async () => {
        try {
          const coordinates = [location.longitude, location.latitude];
          const res = await discover(coordinates, range);
          console.log(res);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      })();
    }
  }, [location, range]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Location Finder</h1>
      <input
        type="number"
        onChange={(e) => setRange(e.target.value * 1000)} // Convert km to meters
        placeholder="Enter range in km"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={fetchLocation}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Get My Location
      </button>
      {location.latitude && location.longitude && (
        <p className="mt-4 text-gray-700">
          <strong>Latitude:</strong> {location.latitude},{" "}
          <strong>Longitude:</strong> {location.longitude}
        </p>
      )}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default GetLocation;
