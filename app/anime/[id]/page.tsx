"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchAnimeById, fetchAnimeByGenre } from "@/lib/anime-data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Anime {
  id: string;
  title: string;
  title_japanese?: string;
  synopsis?: string;
  cover_image?: string;
  banner_image?: string;
  rating?: number;
  episodes?: number;
  status?: string;
  type?: string;
  genres?: string[];
  studio?: string;
  year?: number;
  season?: string;
  duration?: string;
  views?: number;
}

interface Episode {
  number: number;
  title: string;
  duration: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateEpisodes(anime: Anime): Episode[] {
  const count = anime.episodes ?? 12;
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: anime.duration ?? "24 min",
  }));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Video Player ─────────────────────────────────────────────────────────────

function VideoPlayer({ anime }: { anime: Anime }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1440); // 24 min placeholder
  const [buffering, setBuffering] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fake playback tick
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 1;
        setProgress((next / duration) * 100);
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, duration]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = Number(e.target.value);
    setProgress(pct);
    setCurrentTime((pct / 100) * duration);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
    >
      {/* Thumbnail / placeholder frame */}
      {anime.banner_image && (
        <img
          src={anime.banner_image}
          alt={anime.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            playing ? "opacity-20" : "opacity-60"
          }`}
        />
      )}

      {/* Centre play button */}
      {!playing && (
        <button
          onClick={() => { setBuffering(true); setTimeout(() => { setBuffering(false); setPlaying(true); }, 800); }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Buffering spinner */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 mb-3 accent-green-500 cursor-pointer"
        />

        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-3">
            {/* Play / Pause */}
            <button onClick={() => setPlaying((p) => !p)} className="hover:text-green-400 transition">
              {playing ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Volume */}
            <button onClick={() => setMuted((m) => !m)} className="hover:text-green-400 transition">
              {muted || volume === 0 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 19L19 20.27 20.27 19 5.27 4 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
              className="w-20 h-1 accent-green-500 cursor-pointer"
            />

            {/* Time */}
            <span className="text-xs text-white/70">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="hover:text-green-400 transition">
            {fullscreen ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WatchPage() {
  const params = useParams();
  const id = params?.id as string;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [related, setRelated] = useState<Anime[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEp, setSelectedEp] = useState(1);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments] = useState<{ user: string; text: string }[]>([
    { user: "AniUser42", text: "This episode was insane! 🔥" },
    { user: "weeaboo99", text: "Can't wait for the next one." },
  ]);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);
      try {
        // ✅ Fixed: was getAnimeById(id) — now uses Supabase
        const data = await fetchAnimeById(id);
        if (!data) return;

        setAnime(data);
        setEpisodes(generateEpisodes(data));

        // ✅ Fixed: was animeList.filter() on empty array — now uses Supabase
        if (data.genres?.length) {
          const rel = await fetchAnimeByGenre(data.genres[0]);
          setRelated(rel.filter((a: Anime) => a.id !== id).slice(0, 6));
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
        <p className="text-xl">Anime not found.</p>
        <Link href="/" className="text-green-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left: player + info ── */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-green-400 transition">Home</Link>
              <span>/</span>
              <Link href={`/anime/${anime.id}`} className="hover:text-green-400 transition truncate">
                {anime.title}
              </Link>
              <span>/</span>
              <span className="text-white">Episode {selectedEp}</span>
            </div>

            {/* Player */}
            <VideoPlayer anime={anime} />

            {/* Episode title */}
            <div className="mt-4">
              <h1 className="text-xl font-bold">
                {anime.title}{" "}
                <span className="text-green-400">— Episode {selectedEp}</span>
              </h1>
              {anime.studio && (
                <p className="text-sm text-gray-400 mt-1">Studio: {anime.studio}</p>
              )}
            </div>

            {/* Episode list */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Episodes</h2>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {episodes.map((ep) => (
                  <button
                    key={ep.number}
                    onClick={() => setSelectedEp(ep.number)}
                    className={`py-2 rounded-lg text-sm font-medium transition ${
                      selectedEp === ep.number
                        ? "bg-green-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {ep.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Comments</h2>
              <div className="flex gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold shrink-0">
                  U
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment…"
                    className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => setComment("")}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition"
                  >
                    Post
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold shrink-0">
                      {c.user[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-400">{c.user}</p>
                      <p className="text-sm text-gray-300 mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: related anime ── */}
          <aside className="w-full lg:w-80 shrink-0">
            <h2 className="text-lg font-semibold mb-4">Related Anime</h2>
            <div className="space-y-3">
              {related.length === 0 && (
                <p className="text-sm text-gray-500">No related anime found.</p>
              )}
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/watch/${r.id}`}
                  className="flex gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <img
                    src={r.cover_image ?? "/placeholder.png"}
                    alt={r.title}
                    className="w-16 h-20 object-cover rounded-md shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug line-clamp-2">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {r.episodes ? `${r.episodes} eps` : r.type}
                    </p>
                    {r.rating && (
                      <p className="text-xs text-yellow-400 mt-0.5">★ {r.rating}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
