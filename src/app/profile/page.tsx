// src/app/profile/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4">You must sign in to view your profile.</h2>
          <Link
            href="/api/auth/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const { user } = session;
  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {user.image && (
        <Image
          src={user.image}
          alt="Profile picture"
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
      )}
      <div className="space-y-2 text-center">
        <p>
          <span className="font-semibold">Name:</span> {user.name || "—"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
      <Link
        href="/api/auth/signout"
        className="mt-6 inline-block bg-red-600 text-white px-4 py-2 rounded"
      >
        Sign out
      </Link>
    </main>
  );
}
