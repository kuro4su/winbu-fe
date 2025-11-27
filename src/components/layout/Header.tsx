'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Square, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-foreground bg-background">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Brutal Logo */}
        <Link href="/" className="group flex items-center space-x-2 shrink-0">
          <div className="brutal-border-primary bg-primary p-2 transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
            <Square className="h-5 w-5 text-primary-foreground fill-current" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter hidden sm:inline">
            BELLO<span className="text-primary">NIME</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full brutal-border bg-card px-4 py-2 pr-12 font-bold uppercase text-sm placeholder:text-muted-foreground focus:brutal-shadow-sm transition-all outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 brutal-border bg-primary text-primary-foreground p-1.5 hover:brutal-shadow-sm transition-all"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/latest-anime">ANIME</NavLink>
          <NavLink href="/latest-films">FILMS</NavLink>
          <NavLink href="/around-the-world">WORLD</NavLink>
          <NavLink href="/tv-shows">TV</NavLink>
          <NavLink href="/catalog">CATALOG</NavLink>
          <NavLink href="/genres">GENRES</NavLink>

          <div className="ml-2 brutal-border p-2 bg-card hover:brutal-shadow-sm transition-all">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="brutal-border p-2 bg-card hover:brutal-shadow-sm transition-all">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l-4 border-foreground p-0">
              <SheetHeader className="p-6 border-b-4 border-foreground bg-primary">
                <SheetTitle className="text-2xl font-black uppercase tracking-tighter text-primary-foreground">
                  MENU
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6 gap-4">
                <MobileNavLink href="/latest-anime" onClick={() => setIsOpen(false)}>ANIME</MobileNavLink>
                <MobileNavLink href="/latest-films" onClick={() => setIsOpen(false)}>FILMS</MobileNavLink>
                <MobileNavLink href="/around-the-world" onClick={() => setIsOpen(false)}>WORLD</MobileNavLink>
                <MobileNavLink href="/tv-shows" onClick={() => setIsOpen(false)}>TV SHOWS</MobileNavLink>
                <MobileNavLink href="/catalog" onClick={() => setIsOpen(false)}>CATALOG</MobileNavLink>
                <MobileNavLink href="/genres" onClick={() => setIsOpen(false)}>GENRES</MobileNavLink>

                <div className="h-1 bg-border my-2" />

                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase">THEME</span>
                  <div className="brutal-border p-2 bg-card">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative px-4 py-2 font-bold uppercase text-sm tracking-tight transition-colors hover:text-primary ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-200" />
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-xl font-black uppercase hover:text-primary transition-colors flex items-center justify-between group"
    >
      {children}
      <Square className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity fill-current text-primary" />
    </Link>
  );
}
