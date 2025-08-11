// Listings index: uses standard container and shared Button component.
import Link from "next/link";
import prisma from "@/lib/prisma";
import ListingMap from "@/lib/Map";
import { Button } from "@/components/ui/button";
// Use the Prisma-generated Listing type for accurate typings
import type { Listing } from "@prisma/client";


export default async function ListingsPage() {
  // 1. Fetch all listings from the database
  const listings: Listing[] = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">All Listings</h1>
      {listings.length === 0 ? (
        <p>
          No listings yet. {""}
          <Button asChild variant="primary">
            <Link href="/listings/new">Create one?</Link>
          </Button>
        </p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-text/80">{listing.description}</p>
              <div className="text-lg font-semibold">
                ${listing.price.toFixed(2)}
              </div>
              <div className="text-sm text-text/60 mb-4">{listing.location}</div>

              {/* Add map for each listing */}
              <div className="mb-4">
                <ListingMap
                  latitude={listing.latitude}
                  longitude={listing.longitude}
                  zoom={12}
                />
              </div>

              <Button asChild variant="secondary">
                <Link href={`/listings/${listing.id}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </ul>
      )}
    </main>
  );
}
