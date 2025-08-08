// src/app/listings/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import ListingMap from "@/lib/Map";
// Use the Prisma-generated Listing type for accurate typings
import type { Listing } from "@prisma/client";


export default async function ListingsPage() {
  // 1. Fetch all listings from the database
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">All Listings</h1>
      {listings.length === 0 ? (
        <p>No listings yet. <Link href="/listings/new" className="text-blue-600 hover:underline">Create one?</Link></p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-gray-700">{listing.description}</p>
              <div className="text-lg font-semibold">${listing.price.toFixed(2)}</div>
              <div className="text-sm text-gray-500 mb-4">{listing.location}</div>
              
              {/* Add map for each listing */}
              <div className="mb-4">
                <ListingMap 
                  latitude={listing.latitude} 
                  longitude={listing.longitude}
                  zoom={12}
                />
              </div>
              
              <Link
                href={`/listings/${listing.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </ul>
      )}
    </main>
  );
}
