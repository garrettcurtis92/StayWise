// Listing detail page: uses container and unified Button.
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ListingMap from "@/lib/Map";
import BookingForm from "./BookingForm";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export default async function ListingPage({ params }: Params) {
  const { id } = await params;
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
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-text/80">{listing.description}</p>
      <div className="text-lg font-semibold">${listing.price.toFixed(2)}</div>
      <div className="text-sm text-text/60">{listing.location}</div>
      
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
          <div className="p-4 border rounded bg-surface">
            <p className="mb-2">You must be signed in to make a booking.</p>
            <Button asChild variant="primary">
              <Link href="/api/auth/signin">Sign in</Link>
            </Button>
          </div>
        )}
      </section>

      <Button asChild variant="ghost" className="mt-8">
        <Link href="/listings">← Back to all listings</Link>
      </Button>
    </main>
  );
}
