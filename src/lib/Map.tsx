"use client";
import Map from "react-map-gl/mapbox";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export default function ListingMap({ latitude, longitude, zoom = 10 }: MapProps) {
  return (
    <div className="relative w-full h-64">
      <Map
        initialViewState={{ latitude, longitude, zoom }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
