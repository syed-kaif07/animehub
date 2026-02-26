import { AnimeCard } from "@/components/anime-card";
import { animeList } from "@/lib/anime-data";

export default function TrendingPage() {
  const trending = [...animeList].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-text-main md:text-4xl">
            Trending Anime
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            The most watched anime right now
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {trending.map((anime, i) => (
            <AnimeCard key={anime.id} anime={anime} showRank rank={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
