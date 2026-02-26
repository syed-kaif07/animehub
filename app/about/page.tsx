import Link from "next/link";
import {
  Play,
  Github,
  Users,
  Globe,
  Shield,
  Zap,
  Code,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="mb-4 font-heading text-4xl font-bold text-text-main md:text-5xl">
            About AnimeHub
          </h1>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            A free, open-source anime streaming platform built by the community,
            for the community. We believe anime should be accessible to
            everyone.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="mb-16 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Globe,
              title: "Free & Open",
              desc: "No paywalls, no premium tiers. Every anime available to everyone, everywhere.",
            },
            {
              icon: Zap,
              title: "Fast & Smooth",
              desc: "Optimized for low-end devices with adaptive streaming, lazy loading, and CDN delivery.",
            },
            {
              icon: Shield,
              title: "Safe & Ethical",
              desc: "No unsafe ads, no malware. We prioritize user safety and content integrity.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border-main bg-bg-card p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-main/10">
                <card.icon className="h-5 w-5 text-green-main" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-text-main">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Open Source Section */}
        <div
          id="open-source"
          className="mb-16 rounded-2xl border border-border-main bg-bg-card p-8 md:p-12"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-3 font-heading text-2xl font-bold text-text-main md:text-3xl">
                Open Source First
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
                AnimeHub is built transparently with an open-source philosophy.
                Our codebase, roadmap, and governance are all public. We welcome
                contributors of all skill levels.
              </p>
              <ul className="mb-6 flex flex-col gap-2">
                {[
                  "MIT / Apache Licensed",
                  "Public roadmap & issue tracking",
                  "Community-driven feature decisions",
                  "Contributor guidelines & code of conduct",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-green-main" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-green-main px-6 text-sm font-semibold text-bg-main transition-all hover:-translate-y-0.5 hover:bg-green-hover"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-xl bg-bg-panel p-6">
              <Code className="h-8 w-8 text-green-main" />
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-text-main">
                  100+
                </div>
                <div className="text-sm text-text-muted">Contributors</div>
              </div>
              <div className="h-px w-full bg-border-main" />
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-text-main">
                  500+
                </div>
                <div className="text-sm text-text-muted">GitHub Stars</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold text-text-main">
            Built With
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "React",
              "Vercel",
              "PostgreSQL",
              "Cloudflare",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border-main bg-bg-card px-4 py-2 text-sm font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-text-main">
            Want to contribute?
          </h2>
          <p className="mb-6 text-sm text-text-muted">
            Whether you code, design, translate, or just love anime - there is a
            place for you.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center gap-2 rounded-full bg-green-main px-6 text-sm font-semibold text-bg-main transition-all hover:-translate-y-0.5 hover:bg-green-hover"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <Link
              href="/contact"
              className="flex h-11 items-center rounded-full border border-border-main px-6 text-sm font-medium text-text-secondary transition-colors hover:text-text-main"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
