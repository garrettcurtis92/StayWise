import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const listings = [
  {
    id: 1,
    title: "Cozy Cabin Retreat",
    location: "Lakeview, OR",
    price: 120,
    image: "/images/listing1.jpg",
  },
  {
    id: 2,
    title: "Beachfront Bungalow",
    location: "Maui, HI",
    price: 220,
    image: "/images/listing2.jpg",
  },
  {
    id: 3,
    title: "Urban Loft",
    location: "Austin, TX",
    price: 150,
    image: "/images/listing3.jpg",
  },
];

export function FeaturedListings() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Featured Listings
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <Image
              src={listing.image}
              alt={listing.title}
              width={400}
              height={300}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{listing.title}</h3>
              <p className="text-sm text-muted-foreground">
                {listing.location}
              </p>
              <p className="mt-2 font-bold">${listing.price} / night</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export { listings };
