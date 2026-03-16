"use client";

import { useEffect, useState } from "react";
import { AnimeCard } from "@/components/anime-card";
import { fetchRecentlyAdded } from "@/lib/anime-data";
import type { Anime } from "@/lib/anime-data";

export default function RecentPage() {
  const [recent, setRecent] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentlyAdded().then(data => {
      setRecent(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-text-main md:text-4xl">Recently Added</h1>
          <p className="mt-1 text-sm text-text-muted">Fresh new additions to our library</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-main border-t-transparent" />
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-text-muted">No recently added anime found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recent.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
