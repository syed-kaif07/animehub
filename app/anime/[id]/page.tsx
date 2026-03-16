"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  MessageSquare,
  ThumbsUp,
  Flag,
  List,
  Server,
  ChevronRight,
  ChevronLeft,
  Subtitles,
  Moon,
  Bookmark,
  Users,
  FastForward,
  Plus,
  Bug,
} from "lucide-react";
import { fetchAnimeById, generateEpisodes, type Anime, type Episode } from "@/lib/anime-data";

// ── Player Controls Bar ────────────────────────────────────────────
function PlayerControlsBar({
  currentEp,
  totalEps,
  animeId,
}: {
  currentEp: number;
  totalEps: number;
  animeId: string;
}) {
  const [autoNext, setAutoNext] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoSkip, setAutoSkip] = useState(false);
  const [focus, setFocus] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const base = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 select-none cursor-pointer";
  const on  = "bg-green-main/20 text-green-main";
  const off = "text-text-muted hover:text-text-main hover:bg-bg-panel";
  const cls = (active: boolean) => `${base} ${active ? on : off}`;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 rounded-xl border border-border-main bg-bg-card px-3 py-2">
      <button type="button" onClick={() => setFocus(v => !v)} className={cls(focus)}>
        <Moon className="h-3.5 w-3.5" /> Focus
      </button>
      <div className="h-4 w-px bg-border-main mx-1" />
      <button type="button" onClick={() => setAutoNext(v => !v)} className={cls(autoNext)}>
        <FastForward className="h-3.5 w-3.5 fill-current" /> AutoNext
      </button>
      <button type="button" onClick={() => setAutoPlay(v => !v)} className={cls(autoPlay)}>
        <Play className="h-3.5 w-3.5 fill-current" /> AutoPlay
      </button>
      <button type="button" onClick={() => setAutoSkip(v => !v)} className={cls(autoSkip)}>
        <SkipForward className="h-3.5 w-3.5" /> AutoSkip
      </button>
      <button type="button" className={`${base} ${off}`}>
        <Plus className="h-3.5 w-3.5" /> Add Skiptime
      </button>
      <div className="h-4 w-px bg-border-main mx-1" />
      <Link
        href={currentEp > 1 ? `/anime/${animeId}?ep=${currentEp - 1}` : "#"}
        className={`${base} ${currentEp > 1 ? off : "text-text-disabled cursor-not-allowed pointer-events-none"}`}
      >
        <SkipBack className="h-3.5 w-3.5" /> Prev
      </Link>
      <Link
        href={currentEp < totalEps ? `/anime/${animeId}?ep=${currentEp + 1}` : "#"}
        className={`${base} ${currentEp < totalEps ? off : "text-text-disabled cursor-not-allowed pointer-events-none"}`}
      >
        Next <SkipForward className="h-3.5 w-3.5" />
      </Link>
      <div className="h-4 w-px bg-border-main mx-1" />
      <button type="button" onClick={() => setBookmarked(v => !v)} className={cls(bookmarked)}>
        <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} /> Bookmark
      </button>
      <button type="button" className={`${base} ${off}`}>
        <Users className="h-3.5 w-3.5" /> W2G
      </button>
      <div className="h-4 w-px bg-border-main mx-1" />
      <button type="button" className={`${base} text-text-muted hover:text-red-400 hover:bg-red-400/10`}>
        <Bug className="h-3.5 w-3.5" /> Report
      </button>
    </div>
  );
}

// ── Video Player ───────────────────────────────────────────────────
function VideoPlayer({
  title,
  episode,
  thumbnail,
}: {
  title: string;
  episode: number;
  thumbnail: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1440);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setInterval(() => setBuffered(b => Math.min(b + Math.random() * 2, 100)), 400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (playing) {
      progressTimer.current = setInterval(() => {
        setCurrentTime(t => {
          const next = t + 1;
          setProgress((next / duration) * 100);
          return next >= duration ? 0 : next;
        });
      }, 1000);
    } else {
      if (progressTimer.current) clearInterval(progressTimer.current);
    }
    return () => { if (progressTimer.current) clearInterval(progressTimer.current); };
  }, [playing, duration]);

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    if (playing) controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    return () => { if (controlsTimer.current) clearTimeout(controlsTimer.current); };
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setCurrentTime(pct * duration);
    setProgress(pct * 100);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) { containerRef.current?.requestFullscreen(); setFullscreen(true); }
    else { document.exitFullscreen(); setFullscreen(false); }
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black"
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={() => setPlaying(p => !p)}
    >
      <img src={thumbnail} alt={title} className={`h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-30" : "opacity-50"}`} />

      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-green-main/90 shadow-2xl transition-transform hover:scale-110">
            <Play className="h-9 w-9 fill-white text-white" />
          </div>
          <p className="text-base font-semibold text-white drop-shadow">{title} — Episode {episode}</p>
          <p className="mt-1 text-xs text-white/60">Click to play</p>
        </div>
      )}

      {playing && showControls && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/30">
            <Pause className="h-7 w-7 text-white" />
          </div>
        </div>
      )}

      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls || !playing ? "opacity-100" : "opacity-0"}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-4 pb-2 pt-4">
          <p className="text-sm font-semibold text-white drop-shadow">{title} — Episode {episode}</p>
        </div>
        <div className="px-4 pb-2">
          <div className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 hover:h-2.5 transition-all duration-150" onClick={handleProgressClick}>
            <div className="absolute left-0 top-0 h-full rounded-full bg-white/30" style={{ width: `${buffered}%` }} />
            <div className="absolute left-0 top-0 h-full rounded-full bg-green-main" style={{ width: `${progress}%` }} />
            <div className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow-md" style={{ left: `calc(${progress}% - 7px)` }} />
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 pb-3">
          <button type="button" onClick={() => setPlaying(p => !p)} className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:text-green-main transition-colors">
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
          </button>
          <button type="button" className="text-white/70 hover:text-white"><SkipBack className="h-4 w-4" /></button>
          <button type="button" className="text-white/70 hover:text-white"><SkipForward className="h-4 w-4" /></button>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => setMuted(m => !m)} className="text-white/70 hover:text-white">
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input type="range" min={0} max={100} value={muted ? 0 : volume}
              onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
              className="h-1 w-16 cursor-pointer accent-green-main"
            />
          </div>
          <span className="ml-1 text-xs text-white/70">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div className="flex-1" />
          <button type="button" className="text-white/70 hover:text-white"><Subtitles className="h-4 w-4" /></button>
          <button type="button" className="text-white/70 hover:text-white"><Settings className="h-4 w-4" /></button>
          <button type="button" onClick={toggleFullscreen} className="text-white/70 hover:text-white">
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Episodes Sidebar with Grid + Pagination + Find ─────────────────
function EpisodesSidebar({
  episodes,
  currentEp,
  animeId,
  linkPrefix = "/anime",
}: {
  episodes: Episode[];
  currentEp: number;
  animeId: string;
  linkPrefix?: string;
}) {
  const router = useRouter();
  const PAGE_SIZE = 100;
  const totalPages = Math.ceil(episodes.length / PAGE_SIZE);
  const [page, setPage] = useState(Math.ceil(currentEp / PAGE_SIZE) || 1);
  const [findValue, setFindValue] = useState("");

  useEffect(() => {
    setPage(Math.ceil(currentEp / PAGE_SIZE) || 1);
  }, [currentEp]);

  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, episodes.length);
  const visibleEpisodes = episodes.slice(start, end);

  const pageLabel = (p: number) => {
    const s = (p - 1) * PAGE_SIZE + 1;
    const e = Math.min(p * PAGE_SIZE, episodes.length);
    return `${String(s).padStart(3, "0")}-${String(e).padStart(3, "0")}`;
  };

  const handleFind = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const num = Number.parseInt(findValue.trim());
    if (!num || num < 1 || num > episodes.length) return;
    setPage(Math.ceil(num / PAGE_SIZE));
    router.push(`${linkPrefix}/${animeId}?ep=${num}`);
    setFindValue("");
  };

  return (
    <div className="rounded-xl border border-border-main bg-bg-card">
      {/* Header with Find */}
      <div className="flex items-center gap-2 border-b border-border-main p-3">
        <List className="h-4 w-4 text-green-main shrink-0" />
        <span className="text-sm font-semibold text-text-main">Episodes</span>
        <div className="ml-auto flex items-center gap-1 rounded-lg border border-border-input bg-bg-panel px-2 py-1">
          <span className="text-xs text-text-muted">#</span>
          <input
            type="number"
            min={1}
            max={episodes.length}
            value={findValue}
            onChange={e => setFindValue(e.target.value)}
            onKeyDown={handleFind}
            placeholder="Find"
            className="w-14 bg-transparent text-xs text-text-main placeholder:text-text-muted outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <span className="text-xs text-text-muted shrink-0">{episodes.length} ep</span>
      </div>

      {/* Pagination bar — only for >100 episodes */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 border-b border-border-main px-3 py-2">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:text-text-main hover:bg-bg-panel disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex flex-1 items-center justify-center">
            <span className="text-xs font-medium text-text-main">{pageLabel(page)}</span>
          </div>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:text-text-main hover:bg-bg-panel disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Episode Grid */}
      <div className="max-h-[600px] overflow-y-auto p-3">
        <div className="grid grid-cols-6 gap-1.5">
          {visibleEpisodes.map((ep) => (
            <Link
              key={ep.id}
              href={`${linkPrefix}/${animeId}?ep=${ep.number}`}
              className={`flex items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors ${
                ep.number === currentEp
                  ? "bg-green-main text-bg-main"
                  : "bg-bg-panel text-text-secondary hover:bg-green-main/20 hover:text-green-main"
              }`}
            >
              {ep.number}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function AnimePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const epParam = searchParams.get("ep");
  const currentEp = epParam ? Number.parseInt(epParam) : 1;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState(0);
  const [comment, setComment] = useState("");
  const [comments] = useState([
    { user: "AniUser42", text: "This episode was insane! 🔥" },
    { user: "weeaboo99", text: "Can't wait for the next one." },
  ]);

  const servers = ["Server 1 (HD)", "Server 2 (SD)", "Server 3 (Backup)"];

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchAnimeById(id).then(data => {
      if (!data) { setLoading(false); return; }
      setAnime(data);
      setEpisodes(generateEpisodes(data));
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-main">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-main border-t-transparent" />
          <p className="text-sm text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-main">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-main">Anime not found</h1>
          <Link href="/" className="mt-4 text-green-main hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-green-main">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-secondary truncate">{anime.title}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-secondary">Episode {currentEp}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">

          {/* Left: player + controls + info + comments */}
          <div className="flex-1 min-w-0">
            <VideoPlayer
              title={anime.title}
              episode={currentEp}
              thumbnail={anime.bannerImage || anime.coverImage}
            />

            <PlayerControlsBar
              currentEp={currentEp}
              totalEps={episodes.length}
              animeId={anime.id}
            />

            {/* Server Selection */}
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-border-main bg-bg-card px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-text-muted" />
                <span className="text-xs text-text-muted">Server:</span>
              </div>
              {servers.map((server, i) => (
                <button
                  key={server}
                  type="button"
                  onClick={() => setActiveServer(i)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    i === activeServer ? "bg-green-main text-bg-main" : "bg-bg-panel text-text-secondary hover:text-text-main"
                  }`}
                >
                  {server}
                </button>
              ))}
            </div>

            {/* Anime Info */}
            <div className="mt-4 rounded-xl border border-border-main bg-bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-heading text-xl font-bold text-text-main">{anime.title}</h1>
                  <p className="mt-0.5 text-sm text-text-muted">
                    Episode {currentEp} &middot; {anime.duration} &middot; {anime.type}
                  </p>
                  {anime.studio && <p className="mt-0.5 text-xs text-text-muted">Studio: {anime.studio}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg bg-bg-panel px-3 text-sm text-text-secondary transition-colors hover:text-text-main">
                    <ThumbsUp className="h-3.5 w-3.5" /> Like
                  </button>
                  <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-panel text-text-secondary transition-colors hover:text-text-main">
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-4 rounded-xl border border-border-main bg-bg-card p-4">
              <h2 className="mb-4 text-sm font-semibold text-text-main flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Comments
              </h2>
              <div className="flex gap-3 mb-6">
                <div className="h-9 w-9 rounded-full bg-green-main flex items-center justify-center text-sm font-bold text-bg-main shrink-0">U</div>
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Add a comment…"
                    className="flex-1 rounded-lg bg-bg-panel px-4 py-2 text-sm text-text-main placeholder:text-text-muted outline-none focus:ring-2 focus:ring-green-main border border-border-input"
                  />
                  <button onClick={() => setComment("")} className="bg-green-main hover:bg-green-main/90 px-4 py-2 rounded-lg text-sm text-bg-main font-medium transition">
                    Post
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-bg-panel flex items-center justify-center text-sm font-bold text-text-main shrink-0">
                      {c.user[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-main">{c.user}</p>
                      <p className="text-sm text-text-secondary mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Episodes Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <EpisodesSidebar
              episodes={episodes}
              currentEp={currentEp}
              animeId={anime.id}
              linkPrefix="/anime"
            />
          </div>

        </div>
      </div>
      <div className="h-12" />
    </div>
  );
}
