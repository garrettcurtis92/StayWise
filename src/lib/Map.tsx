// src/lib/Map.tsx
"use client";

import React from "react";
import ReactMapGL, { Marker } from "react-map-gl/mapbox";

type MapProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

export default function Map({ latitude, longitude, zoom = 10 }: MapProps) {
  const [viewport, setViewport] = React.useState({
    latitude,
    longitude,
    zoom,
  });

  return (
    <div className="w-full h-64">
      <ReactMapGL
        {...viewport}
        style={{ width: '100%', height: '100%' }}
        onMove={({ viewState }) => setViewport({
          latitude: viewState.latitude,
          longitude: viewState.longitude,
          zoom: viewState.zoom
        })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <Marker latitude={latitude} longitude={longitude} />
      </ReactMapGL>
    </div>
  );
}
