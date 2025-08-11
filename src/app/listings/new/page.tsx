// New listing form: uses container and shared Button component.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NewListingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
          location: form.location,
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Unknown error");
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Create New Listing</h1>
      {error && (
        <p className="mb-4 text-destructive-600" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded focus-ring"
            required
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded focus-ring"
            required
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="price">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded focus-ring"
            required
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded focus-ring"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
          Submit
        </Button>
      </form>
    </main>
  );
}
