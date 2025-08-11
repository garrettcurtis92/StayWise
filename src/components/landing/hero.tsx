import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center">
      <Image
        src="/images/beach-hero.jpg"
        alt="Palm trees and turquoise ocean on a sunny beach"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 bg-black/40 p-6 rounded-lg text-white max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Next Getaway
        </h1>
        <Button asChild>
          <Link href="#search">Start Exploring</Link>
        </Button>
      </div>
    </section>
  );
}
