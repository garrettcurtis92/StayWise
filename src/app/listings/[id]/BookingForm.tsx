// Booking form: uses shared Button for actions.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type Props = { listingId: string };

export default function BookingForm({ listingId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="p-4 border rounded bg-surface">
        <p className="mb-2">You must sign in to book.</p>
        <Button type="button" onClick={() => signIn()}>
          Sign in
        </Button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, startDate, endDate }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      router.push("/profile"); // or wherever you like
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4 mt-6 max-w-md">
      {error && <p role="alert" className="text-destructive-600">{error}</p>}
      <div>
        <label htmlFor="start" className="block mb-1">Start Date</label>
        <input
          id="start"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded focus-ring"
          required
        />
      </div>
      <div>
        <label htmlFor="end" className="block mb-1">End Date</label>
        <input
          id="end"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border p-2 rounded focus-ring"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
        Book Now
      </Button>
    </form>
  );
}
