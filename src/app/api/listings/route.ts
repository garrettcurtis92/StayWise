// src/app/api/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export async function POST(req: NextRequest) {
  const { title, description, price, location, lat, lng } = await req.json();

  // Validate inputs...
  
  // Geocode the location string
  const geoRes = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
      encodeURIComponent(location) +
      `.json?access_token=${mapboxToken}&limit=1`
  );
  const geoData = await geoRes.json();
  const [longitude, latitude] = geoData.features[0]?.center || [null, null];

  // Create the listing in the DB with coords
  const listing = await prisma.listing.create({
    data: { 
      title, 
      description, 
      price, 
      location, 
      latitude: lat, 
      longitude: lng 
    },
  });

  return NextResponse.json(listing);
}
