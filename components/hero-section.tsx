"use client";

import Link from "next/link";
import { Play, Info, Star, Calendar } from "lucide-react";
import { fetchTrending } from "@/lib/anime-data";
import type { Anime } from "@/lib/anime-data";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [featured, setFeatured] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrending().then((data) => setFeatured(data.slice(0, 3)));
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const anime = featured[currentIndex];

  if (!anime) {
    return (
      <section className="relative h-[420px] w-full overflow-hidden bg-bg-card md:h-[480px]">
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-main border-t-transparent" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[480px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={anime.bannerImage || anime.coverImage}
          alt=""
          className="h-full w-full object-cover transition-all duration-700"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-bg-main/30" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-4 lg:px-8">
        <div className="max-w-xl">
          {/* Meta */}
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-green-main px-3 py-1 text-xs font-semibold text-bg-main">
              Featured
            </span>
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              {anime.rating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {anime.year}
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-2 font-heading text-4xl font-bold leading-tight text-text-main md:text-[42px]">
            {anime.title}
          </h1>

          {/* Genres */}
          <div className="mb-3 flex flex-wrap gap-2">
            {anime.genres.slice(0, 4).map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-border-main bg-bg-panel/50 px-2.5 py-0.5 text-xs text-text-secondary"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-text-secondary">
            {anime.synopsis}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/watch/${anime.id}?ep=1`}
              className="glow-green flex h-11 items-center gap-2 rounded-full bg-green-main px-6 text-sm font-semibold text-bg-main transition-all hover:-translate-y-0.5 hover:bg-green-hover"
            >
              <Play className="h-4 w-4 fill-bg-main" />
              Watch Now
            </Link>
            <Link
              href={`/anime/${anime.id}`}
              className="flex h-11 items-center gap-2 rounded-full border border-border-main bg-bg-panel/50 px-6 text-sm font-medium text-text-secondary transition-colors hover:text-text-main"
            >
              <Info className="h-4 w-4" />
              Details
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {featured.map((_, i) => (
          <button
            key={featured[i].id}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIndex
                ? "w-8 bg-green-main"
                : "w-4 bg-text-muted/40 hover:bg-text-muted"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
