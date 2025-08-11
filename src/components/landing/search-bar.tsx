import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <section
      id="search"
      className="max-w-4xl mx-auto -mt-16 relative z-20 p-4"
    >
      <form className="bg-white/90 backdrop-blur rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <Input
          placeholder="Destination"
          aria-label="Destination"
          className="md:col-span-2"
        />
        <Input type="date" aria-label="Check-in" />
        <Input type="date" aria-label="Check-out" />
        <Input type="number" min={1} aria-label="Guests" placeholder="Guests" />
        <Button className="md:col-span-5 w-full" type="button">
          Search
        </Button>
      </form>
    </section>
  );
}
