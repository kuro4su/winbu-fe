import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Clapperboard className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            Winbu Explorer
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <Link
              href="/latest-anime"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Latest Anime
            </Link>
            <Link
              href="/latest-films"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Latest Films
            </Link>
            <Link
              href="/around-the-world"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Around the World
            </Link>
            <Link
              href="/tv-shows"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              TV Shows
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
