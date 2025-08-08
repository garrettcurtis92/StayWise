// src/app/listings/[id]/BookingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = { listingId: string };

export default function BookingForm({ listingId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  if (!session) return null; // We'll show a sign-in prompt in the server component.

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
  };

  return (
    <form onSubmit={submit} className="space-y-4 mt-6 max-w-md">
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <div>
        <label htmlFor="start" className="block mb-1">Start Date</label>
        <input
          id="start"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Book Now
      </button>
    </form>
  );
}
