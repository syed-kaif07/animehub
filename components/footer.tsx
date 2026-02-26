import Link from "next/link";
import { Play, Github, Twitter, MessageCircle } from "lucide-react";

const footerLinks = {
  Browse: [
    { label: "Trending", href: "/trending" },
    { label: "Popular", href: "/browse?sort=popular" },
    { label: "Recent", href: "/recent" },
    { label: "Genres", href: "/browse" },
  ],
  Community: [
    { label: "About", href: "/about" },
    { label: "Open Source", href: "/about#open-source" },
    { label: "Contact", href: "/contact" },
    { label: "GitHub", href: "https://github.com" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "DMCA", href: "/dmca" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-main bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-main">
                <Play className="h-4 w-4 fill-bg-main text-bg-main" />
              </div>
              <span className="font-heading text-lg font-bold text-text-main">
                AnimeHub
              </span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-text-muted">
              Free, open-source anime streaming platform built for the
              community.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-panel text-text-muted transition-colors hover:text-green-main"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-panel text-text-muted transition-colors hover:text-green-main"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-panel text-text-muted transition-colors hover:text-green-main"
                aria-label="Discord"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-text-main">
                {title}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-green-main"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border-main pt-6">
          <p className="text-center text-xs text-text-muted">
            {new Date().getFullYear()} AnimeHub. Open source under MIT License.
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
