// src/app/listings/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ListingMap from "@/lib/Map";
import BookingForm from "./BookingForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Params = { params: { id: string } };

export default async function ListingPage({ params }: Params) {
  const { id } = params;
  const session = await getServerSession(authOptions);

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
      
      {/* Booking section */}
      <section className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Book this stay</h2>
        {session ? (
          <BookingForm listingId={listing.id} />
        ) : (
          <div className="p-4 bg-yellow-50 border rounded">
            <p className="mb-2">You must be signed in to make a booking.</p>
            <Link href="/api/auth/signin" className="text-blue-600 underline">Sign in</Link>
          </div>
        )}
      </section>

      <Link href="/listings" className="text-blue-600 hover:underline block mt-8">
        ← Back to all listings
      </Link>
    </main>
  );
}
