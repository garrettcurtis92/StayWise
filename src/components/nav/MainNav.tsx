"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/profile", label: "Profile" },
];

function getInitials(name?: string | null) {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.map((p) => p[0]).join("" );
}

export default function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => pathname === href;

  const navLinks = (
    <nav className="flex flex-col md:flex-row md:items-center md:gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className={cn(
            "text-gray-600 hover:text-gray-900 px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isActive(link.href) && "font-semibold text-gray-900"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden"
              aria-label="Toggle menu"
              aria-controls="mobile-nav"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64" id="mobile-nav">
            <div className="mt-6 flex flex-col space-y-4">
              {navLinks}
              <Separator />
              <Button asChild className="w-full">
                <Link href="/listings/new">New Listing</Link>
              </Button>
              {session ? (
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full"
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => signIn()}
                  className="w-full"
                >
                  Sign in
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          StayWise
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {navLinks}
      </div>
      <div className="flex items-center gap-3">
        <Button asChild className="hidden md:inline-flex">
          <Link href="/listings/new">New Listing</Link>
        </Button>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar>
                  {session.user?.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name ?? "User"} />
                  ) : (
                    <AvatarFallback>{getInitials(session.user?.name)}</AvatarFallback>
                  )}
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => signIn()}>Sign in</Button>
        )}
      </div>
    </div>
  );
}
