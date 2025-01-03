import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox styles

const Map = ({ longitude, latitude }) => {
  const mapContainer = useRef(null); // Ref for the map container
  const map = useRef(null); // Ref for the Mapbox instance

  // Set your Mapbox access token
  mapboxgl.accessToken = `pk.eyJ1IjoiYWhtZWRhbWlyNjA0IiwiYSI6ImNtNWhiczhtZzBpNDkyaXM3b3V4cjkxMGoifQ.M92nmv99pZYJ0R0MRjjiQg`;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [longitude, latitude],
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
  }, [longitude, latitude]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }} // Customize map size
    />
  );
};

export default Map;
