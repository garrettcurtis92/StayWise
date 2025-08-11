// Profile page: container and shared Button variants.
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4">You must sign in to view your profile.</h2>
          <Button asChild variant="primary">
            <Link href="/api/auth/signin">Sign in</Link>
          </Button>
        </div>
      </main>
    );
  }

  const { user } = session;
  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center p-6 bg-surface">
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
      <Button asChild variant="destructive" className="mt-6">
        <Link href="/api/auth/signout">Sign out</Link>
      </Button>
    </main>
  );
}
