// src/app/listings/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import Map from "@/lib/Map";
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
            <li key={listing.id} className="border p-4 rounded hover:shadow">
              <h2 className="text-xl font-semibold">
                <Link href={`/listings/${listing.id}`} className="hover:underline">
                  {listing.title}
                </Link>
              </h2>
              <p className="text-gray-700">{listing.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>${listing.price.toFixed(2)}</span> • <span>{listing.location}</span>
              </div>
              {listing.lat != null && listing.lng != null && (
  <Map latitude={listing.lat} longitude={listing.lng} zoom={12} />
)}

            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
