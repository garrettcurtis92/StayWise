import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Highlight section for the Beach Bungalow image the user provided.
// Ensure the image file is added at: public/images/beach-bungalow.jpg
// (You can change the filename and alt text as needed.)
export function BeachBungalowHighlight() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 py-20 grid gap-10 lg:grid-cols-2 items-center">
      <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
        <Image
          src="/images/beach-bungalow.jpg"
          alt="Beach bungalow getaway"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
      </div>
      <div className="space-y-5 order-1 lg:order-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Beachfront Bungalow Escape
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Step out your door onto warm sand and unwind where ocean breezes,
          sunrise coffee, and sunset colors frame every moment. This featured
          stay blends rustic charm with modern comfort—perfect for couples or
          solo recharge retreats.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/listings">Explore Listings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/listings/new">List Your Property</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
