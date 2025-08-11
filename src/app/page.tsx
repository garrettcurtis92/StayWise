import { Hero } from "@/components/landing/hero";
import { SearchBar } from "@/components/landing/search-bar";
import { FeaturedListings } from "@/components/landing/featured-listings";
import { Features } from "@/components/landing/features";
import { CallToAction } from "@/components/landing/call-to-action";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SearchBar />
  <FeaturedListings />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  );
}
