"use client";
import React, { useState } from "react";
// Correct import for react-map-gl
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export default function ListingMap({
  latitude,
  longitude,
  zoom = 10,
}: MapProps) {
  // Add validation for Mapbox token
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="relative w-full h-64 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Map unavailable - Mapbox token missing</p>
      </div>
    );
  }

  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom,
  });

  return (
    <div className="relative w-full h-64">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
        style={{ width: "100%", height: "100%" }}
      >
        <Marker 
          longitude={longitude} 
          latitude={latitude} 
          anchor="bottom"
        />
      </Map>
    </div>
  );
}