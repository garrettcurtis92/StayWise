import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-16 bg-blue-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Have a property to share?</h2>
      <p className="mb-6 text-muted-foreground">
        Join StayWise and reach thousands of travelers.
      </p>
      <Button asChild>
        <Link href="/listings/new">Become a Host</Link>
      </Button>
    </section>
  );
}
