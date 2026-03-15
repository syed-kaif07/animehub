import { HeroSection } from "@/components/hero-section";
import { AnimeCard } from "@/components/anime-card";
import { SectionHeader } from "@/components/section-header";
import { fetchTrending, fetchRecentlyAdded, fetchAnimeList, genres } from "@/lib/anime-data";
import Link from "next/link";
import { TrendingUp, Flame, Clock, Sparkles } from "lucide-react";

export default async function HomePage() {
  const [trendingAnime, recentlyAdded, allAnime] = await Promise.all([
    fetchTrending(),
    fetchRecentlyAdded(),
    fetchAnimeList(),
  ]);

  const popularAnime = [...allAnime]
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  return (
    <div className="bg-bg-main">
      {/* Hero */}
      <HeroSection />

      {/* Trending Section */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeader
          title="Trending Now"
          description="Most watched anime this week"
          href="/trending"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {trendingAnime.map((anime, i) => (
            <AnimeCard key={anime.id} anime={anime} showRank rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-y border-border-main bg-bg-panel/50">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4 lg:px-8">
          {[
            { icon: Flame, label: "Anime Series", value: "1,200+" },
            { icon: TrendingUp, label: "Active Users", value: "10K+" },
            { icon: Clock, label: "Hours Watched", value: "500K+" },
            { icon: Sparkles, label: "Episodes", value: "50K+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl bg-bg-card/50 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-main/10">
                <stat.icon className="h-5 w-5 text-green-main" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-text-main">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Section */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeader
          title="Most Popular"
          description="All-time fan favorites"
          href="/browse?sort=popular"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {popularAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeader
          title="Recently Added"
          description="Fresh new additions to our library"
          href="/recent"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {recentlyAdded.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Genre Quick Access */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeader title="Browse by Genre" description="Find your next favorite anime" />
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/browse?genre=${encodeURIComponent(genre)}`}
              className="rounded-full border border-border-main bg-bg-card px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-green-main hover:text-green-main"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-main/10 via-bg-card to-green-main/5 p-8 md:p-12">
          <div className="relative z-10 max-w-lg">
            <h2 className="mb-2 font-heading text-2xl font-bold text-text-main md:text-3xl">
              Join the Community
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-text-secondary">
              Create an account to save your watchlist, track progress, and join
              discussions with fellow anime fans.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/signup"
                className="glow-green flex h-11 items-center rounded-full bg-green-main px-6 text-sm font-semibold text-bg-main transition-all hover:-translate-y-0.5 hover:bg-green-hover"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="flex h-11 items-center rounded-full border border-border-main px-6 text-sm font-medium text-text-secondary transition-colors hover:text-text-main"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-green-main/5 blur-3xl" />
          <div className="absolute -bottom-10 -right-5 h-40 w-40 rounded-full bg-green-main/5 blur-2xl" />
        </div>
      </section>
    </div>
  );
}
