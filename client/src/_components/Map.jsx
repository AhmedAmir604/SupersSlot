import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";

//Nothing is workign righ here try using google maps api
//Map tiler is more  then just shit
export default function Map({ services, userLocation }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Initialize the map only once
    if (map.current) return;

    // Create a new map instance
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=vQ0RSFI0VXVBNmSRpu3k", // Use MapTiler style
      center: [userLocation.longitude, userLocation.latitude], // Initial center of the map
      zoom: 14, // Initial zoom level
    });

    // Add a marker for the user's location
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .addTo(map.current);

    // Add markers for services if they exist
    console.log(services);
    if (services && services.length > 0) {
      services.forEach((service) => {
        const coordinates = service.address?.coordinates; // Optional chaining to avoid errors
        if (coordinates && coordinates.length === 2) {
          new maptilersdk.Marker({ color: "#FFF000" })
            .setLngLat([coordinates[0], coordinates[1]]) // Position of the marker
            .addTo(map.current);
        }
      });
    }
  }, [userLocation, services]); // Dependencies array includes userLocation and services

  return (
    <div className="map-wrap">
      <div
        ref={mapContainer}
        className="map"
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
}
