import Link from "next/link";
import { Star, Play } from "lucide-react";
import type { Anime } from "@/lib/anime-data";
import { Badge } from "@/components/ui/badge";

interface AnimeCardProps {
  anime: Anime;
  showRank?: boolean;
  rank?: number;
}

export function AnimeCard({ anime, showRank, rank }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`} className="group relative block">
      <div className="card-hover relative overflow-hidden rounded-[10px] bg-bg-card">
        {/* Cover Image with 3:4 aspect ratio */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={anime.coverImage || "/placeholder.svg"}
            alt={anime.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-main/90 shadow-lg">
              <Play className="h-5 w-5 fill-bg-main text-bg-main" />
            </div>
          </div>

          {/* Rank Badge */}
          {showRank && rank && (
            <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-green-main font-heading text-xs font-bold text-bg-main">
              {rank}
            </div>
          )}

          {/* Status Badge */}
          <Badge
            className={`absolute right-2 top-2 border-none text-xs font-medium ${
              anime.status === "Airing"
                ? "bg-green-main/90 text-bg-main"
                : anime.status === "Completed"
                  ? "bg-bg-panel/90 text-text-secondary"
                  : "bg-yellow-500/90 text-bg-main"
            }`}
          >
            {anime.status}
          </Badge>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 p-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-text-main transition-colors group-hover:text-green-main">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-medium text-text-secondary">
                {anime.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-text-muted">
              {anime.type} &middot; {anime.episodes} eps
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
