import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span>&copy; {new Date().getFullYear()} StayWise</span>
        <nav className="flex gap-4">
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Contact
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
