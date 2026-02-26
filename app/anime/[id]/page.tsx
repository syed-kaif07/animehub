import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Play,
  Star,
  Calendar,
  Clock,
  Tv,
  Building2,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import {
  getAnimeById,
  generateEpisodes,
  animeList,
} from "@/lib/anime-data";
import { AnimeCard } from "@/components/anime-card";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = await params;
  const anime = getAnimeById(id);

  if (!anime) {
    notFound();
  }

  const episodes = generateEpisodes(anime);
  const related = animeList
    .filter(
      (a) =>
        a.id !== anime.id &&
        a.genres.some((g) => anime.genres.includes(g))
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <img
          src={anime.bannerImage || anime.coverImage}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="relative -mt-32 flex flex-col gap-8 md:flex-row">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-48 overflow-hidden rounded-xl shadow-2xl md:w-56">
              <img
                src={anime.coverImage || "/placeholder.svg"}
                alt={anime.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-8">
            {/* Badges */}
            <div className="mb-3 flex items-center gap-2">
              <Badge
                className={`border-none text-xs font-medium ${
                  anime.status === "Airing"
                    ? "bg-green-main/90 text-bg-main"
                    : anime.status === "Completed"
                      ? "bg-bg-panel text-text-secondary"
                      : "bg-yellow-500/90 text-bg-main"
                }`}
              >
                {anime.status}
              </Badge>
              <Badge className="border-none bg-bg-panel text-xs font-medium text-text-secondary">
                {anime.type}
              </Badge>
            </div>

            <h1 className="mb-1 font-heading text-3xl font-bold text-text-main md:text-4xl">
              {anime.title}
            </h1>
            {anime.titleJapanese && (
              <p className="mb-4 text-sm text-text-muted">
                {anime.titleJapanese}
              </p>
            )}

            {/* Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold text-text-main">
                  {anime.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-text-muted" />
                <span>
                  {anime.season} {anime.year}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tv className="h-4 w-4 text-text-muted" />
                <span>{anime.episodes} Episodes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-text-muted" />
                <span>{anime.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-text-muted" />
                <span>{anime.studio}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="mb-5 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <Link
                  key={genre}
                  href={`/browse?genre=${encodeURIComponent(genre)}`}
                  className="rounded-full border border-border-main bg-bg-card px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-green-main hover:text-green-main"
                >
                  {genre}
                </Link>
              ))}
            </div>

            {/* Synopsis */}
            <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
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
              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-full border border-border-main bg-bg-panel px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-main"
              >
                <Heart className="h-4 w-4" />
                Add to List
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-main bg-bg-panel text-text-secondary transition-colors hover:text-text-main"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <section className="py-12">
          <SectionHeader title="Episodes" description={`${episodes.length} episodes available`} />
          <div className="grid gap-3">
            {episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/watch/${anime.id}?ep=${ep.number}`}
                className="group flex items-center gap-4 rounded-xl border border-border-main bg-bg-card p-3 transition-colors hover:border-green-main/50 hover:bg-bg-panel"
              >
                {/* Episode Thumbnail */}
                <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={ep.thumbnail || "/placeholder.svg"}
                    alt={`Episode ${ep.number}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-bg-main/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-text-main text-text-main" />
                  </div>
                </div>

                {/* Episode Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-green-main">
                      EP {ep.number}
                    </span>
                    <span className="text-sm font-medium text-text-main">
                      {ep.title}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-text-muted">
                    <span>{ep.duration}</span>
                    <span>{ep.aired}</span>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 flex-shrink-0 text-text-disabled group-hover:text-green-main" />
              </Link>
            ))}
          </div>
        </section>

        {/* Related Anime */}
        {related.length > 0 && (
          <section className="pb-12">
            <SectionHeader title="You Might Also Like" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {related.map((a) => (
                <AnimeCard key={a.id} anime={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
