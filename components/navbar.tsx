"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Play,
  TrendingUp,
  Grid3X3,
  Clock,
  User,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Play },
  { href: "/browse", label: "Browse", icon: Grid3X3 },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/recent", label: "Recent", icon: Clock },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border-main bg-bg-main/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-main">
            <Play className="h-4 w-4 fill-bg-main text-bg-main" />
          </div>
          <span className="font-heading text-xl font-bold text-text-main">
            AnimeHub
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-green-main"
                  : "text-text-secondary hover:text-text-main"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/browse?q=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="h-9 w-48 rounded-full border border-border-input bg-bg-panel px-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-text-muted hover:text-text-main"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-text-main"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Auth */}
          <Link
            href="/login"
            className="flex h-9 items-center gap-2 rounded-full border border-border-main px-4 text-sm font-medium text-text-secondary transition-colors hover:border-green-main hover:text-green-main"
          >
            <User className="h-4 w-4" />
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border-main bg-bg-main md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/browse?q=${encodeURIComponent(searchQuery.trim())}`;
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="h-10 w-full rounded-lg border border-border-input bg-bg-panel pl-9 pr-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                />
              </div>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-green-main/10 text-green-main"
                      : "text-text-secondary hover:text-text-main"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-border-main pt-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-main"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
