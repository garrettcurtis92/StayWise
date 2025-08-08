// src/app/listings/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ListingMap from "@/lib/Map";

type Params = { params: { id: string } };

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch the listing by ID
  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  // 2. If not found, return 404
  if (!listing) {
    notFound();
  }

  // 3. Render the listing details
  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-gray-700">{listing.description}</p>
      <div className="text-lg font-semibold">${listing.price.toFixed(2)}</div>
      <div className="text-sm text-gray-500">{listing.location}</div>
      
      {/* Add the map component */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Location</h2>
        <ListingMap 
          latitude={listing.latitude} 
          longitude={listing.longitude} 
        />
      </div>
      
      <Link href="/listings" className="text-blue-600 hover:underline">
        ← Back to all listings
      </Link>
    </main>
  );
}
