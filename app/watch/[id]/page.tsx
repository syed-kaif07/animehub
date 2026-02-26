"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Play,
  SkipBack,
  SkipForward,
  ChevronLeft,
  MessageSquare,
  ThumbsUp,
  Flag,
  Star,
  List,
  Server,
} from "lucide-react";
import { getAnimeById, generateEpisodes, animeList } from "@/lib/anime-data";
import { AnimeCard } from "@/components/anime-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";

function WatchPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const epParam = searchParams.get("ep");
  const currentEp = epParam ? Number.parseInt(epParam) : 1;

  const anime = getAnimeById(id);
  const [activeServer, setActiveServer] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const servers = ["Server 1 (HD)", "Server 2 (SD)", "Server 3 (Backup)"];

  if (!anime) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-main">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-main">Anime not found</h1>
          <Link href="/" className="mt-4 text-green-main hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const episodes = generateEpisodes(anime);
  const related = animeList
    .filter(
      (a) =>
        a.id !== anime.id && a.genres.some((g) => anime.genres.includes(g))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-green-main">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/anime/${anime.id}`}
            className="hover:text-green-main"
          >
            {anime.title}
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Episode {currentEp}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player Area */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-bg-card">
              <img
                src={anime.bannerImage || anime.coverImage}
                alt={`${anime.title} Episode ${currentEp}`}
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-main/60">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-main/90 shadow-lg transition-transform hover:scale-110">
                  <Play className="h-7 w-7 fill-bg-main text-bg-main" />
                </div>
                <p className="text-sm text-text-secondary">
                  {anime.title} - Episode {currentEp}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Video player placeholder - Connect streaming source to enable
                  playback
                </p>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-border-main bg-bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Episode Nav */}
              <div className="flex items-center gap-2">
                <Link
                  href={
                    currentEp > 1
                      ? `/watch/${anime.id}?ep=${currentEp - 1}`
                      : "#"
                  }
                  className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors ${
                    currentEp > 1
                      ? "bg-bg-panel text-text-secondary hover:text-text-main"
                      : "cursor-not-allowed bg-bg-panel/50 text-text-disabled"
                  }`}
                >
                  <SkipBack className="h-3.5 w-3.5" />
                  Prev
                </Link>
                <span className="px-2 text-sm font-semibold text-green-main">
                  EP {currentEp} / {episodes.length}
                </span>
                <Link
                  href={
                    currentEp < episodes.length
                      ? `/watch/${anime.id}?ep=${currentEp + 1}`
                      : "#"
                  }
                  className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors ${
                    currentEp < episodes.length
                      ? "bg-bg-panel text-text-secondary hover:text-text-main"
                      : "cursor-not-allowed bg-bg-panel/50 text-text-disabled"
                  }`}
                >
                  Next
                  <SkipForward className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Server Selection */}
              <div className="flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-text-muted" />
                <span className="text-xs text-text-muted">Server:</span>
                {servers.map((server, i) => (
                  <button
                    key={server}
                    type="button"
                    onClick={() => setActiveServer(i)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      i === activeServer
                        ? "bg-green-main text-bg-main"
                        : "bg-bg-panel text-text-secondary hover:text-text-main"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Anime Info */}
            <div className="mt-4 rounded-xl border border-border-main bg-bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-heading text-xl font-bold text-text-main">
                    {anime.title}
                  </h1>
                  <p className="mt-0.5 text-sm text-text-muted">
                    Episode {currentEp} &middot; {anime.duration} &middot;{" "}
                    {anime.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-9 items-center gap-1.5 rounded-lg bg-bg-panel px-3 text-sm text-text-secondary transition-colors hover:text-text-main"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Like
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-panel text-text-secondary transition-colors hover:text-text-main"
                    aria-label="Report"
                  >
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowComments(!showComments)}
                className="flex w-full items-center justify-between rounded-xl border border-border-main bg-bg-card p-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-main"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comments
                </div>
                <span className="text-xs text-text-muted">
                  Sign in to comment
                </span>
              </button>
              {showComments && (
                <div className="mt-2 rounded-xl border border-border-main bg-bg-card p-6">
                  <div className="flex flex-col items-center py-6 text-center">
                    <MessageSquare className="mb-2 h-8 w-8 text-text-disabled" />
                    <p className="text-sm text-text-muted">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                    <Link
                      href="/login"
                      className="mt-3 text-sm font-medium text-green-main hover:underline"
                    >
                      Sign in to comment
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Episode List */}
          <div className="w-full lg:w-80">
            <div className="rounded-xl border border-border-main bg-bg-card">
              <div className="flex items-center gap-2 border-b border-border-main p-3">
                <List className="h-4 w-4 text-green-main" />
                <span className="text-sm font-semibold text-text-main">
                  Episodes
                </span>
                <span className="ml-auto text-xs text-text-muted">
                  {episodes.length} total
                </span>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/watch/${anime.id}?ep=${ep.number}`}
                    className={`flex items-center gap-3 border-b border-border-main/50 px-3 py-2.5 text-sm transition-colors last:border-0 ${
                      ep.number === currentEp
                        ? "bg-green-main/10 text-green-main"
                        : "text-text-secondary hover:bg-bg-panel hover:text-text-main"
                    }`}
                  >
                    <span className="w-8 flex-shrink-0 text-xs font-semibold">
                      {ep.number.toString().padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate">{ep.title}</span>
                    {ep.number === currentEp && (
                      <Play className="h-3 w-3 flex-shrink-0 fill-green-main" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-text-main">
                  Related Anime
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {related.map((a) => (
                    <AnimeCard key={a.id} anime={a} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-12" />
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={null}>
      <WatchPageContent />
    </Suspense>
  );
}
