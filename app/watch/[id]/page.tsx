"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
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
  Subtitles,
  Moon,
  Bookmark,
  Users,
  FastForward,
  Plus,
  Bug,
} from "lucide-react";
import {
  fetchAnimeById,
  generateEpisodes,
  type Anime,
  type Episode,
} from "@/lib/anime-data";
import { AnimeCard } from "@/components/anime-card";
import { Suspense } from "react";

// ── Anime-style Controls Bar ───────────────────────────────────────
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
  const on   = "bg-green-main/20 text-green-main";
  const off  = "text-text-muted hover:text-text-main hover:bg-bg-panel";
  const cls  = (active: boolean) => `${base} ${active ? on : off}`;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 rounded-xl border border-border-main bg-bg-card px-3 py-2">
      {/* Focus */}
      <button type="button" onClick={() => setFocus(v => !v)} className={cls(focus)} title="Focus mode">
        <Moon className="h-3.5 w-3.5" />
        Focus
      </button>

      <div className="h-4 w-px bg-border-main mx-1" />

      {/* AutoNext */}
      <button type="button" onClick={() => setAutoNext(v => !v)} className={cls(autoNext)} title="Auto play next episode">
        <FastForward className="h-3.5 w-3.5 fill-current" />
        AutoNext
      </button>

      {/* AutoPlay */}
      <button type="button" onClick={() => setAutoPlay(v => !v)} className={cls(autoPlay)} title="Auto start playing">
        <Play className="h-3.5 w-3.5 fill-current" />
        AutoPlay
      </button>

      {/* AutoSkip */}
      <button type="button" onClick={() => setAutoSkip(v => !v)} className={cls(autoSkip)} title="Auto skip intro/outro">
        <SkipForward className="h-3.5 w-3.5" />
        AutoSkip
      </button>

      {/* Add Skiptime */}
      <button type="button" className={`${base} ${off}`} title="Submit skip timestamps">
        <Plus className="h-3.5 w-3.5" />
        Add Skiptime
      </button>

      <div className="h-4 w-px bg-border-main mx-1" />

      {/* Prev */}
      <Link
        href={currentEp > 1 ? `/watch/${animeId}?ep=${currentEp - 1}` : "#"}
        className={`${base} ${currentEp > 1 ? off : "text-text-disabled cursor-not-allowed pointer-events-none"}`}
      >
        <SkipBack className="h-3.5 w-3.5" />
        Prev
      </Link>

      {/* Next */}
      <Link
        href={currentEp < totalEps ? `/watch/${animeId}?ep=${currentEp + 1}` : "#"}
        className={`${base} ${currentEp < totalEps ? off : "text-text-disabled cursor-not-allowed pointer-events-none"}`}
      >
        Next
        <SkipForward className="h-3.5 w-3.5" />
      </Link>

      <div className="h-4 w-px bg-border-main mx-1" />

      {/* Bookmark */}
      <button type="button" onClick={() => setBookmarked(v => !v)} className={cls(bookmarked)} title="Bookmark episode">
        <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} />
        Bookmark
      </button>

      {/* W2G */}
      <button type="button" className={`${base} ${off}`} title="Watch together with friends">
        <Users className="h-3.5 w-3.5" />
        W2G
      </button>

      <div className="h-4 w-px bg-border-main mx-1" />

      {/* Report */}
      <button type="button" className={`${base} text-text-muted hover:text-red-400 hover:bg-red-400/10`} title="Report issue">
        <Bug className="h-3.5 w-3.5" />
        Report
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

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setCurrentTime(pct * duration);
    setProgress(pct * 100);
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
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black"
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={() => setPlaying(p => !p)}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-30" : "opacity-50"}`}
      />

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

        {/* Progress bar */}
        <div className="px-4 pb-2">
          <div
            className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 hover:h-2.5 transition-all duration-150"
            onClick={handleProgressClick}
          >
            <div className="absolute left-0 top-0 h-full rounded-full bg-white/30" style={{ width: `${buffered}%` }} />
            <div className="absolute left-0 top-0 h-full rounded-full bg-green-main" style={{ width: `${progress}%` }} />
            <div className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow-md" style={{ left: `calc(${progress}% - 7px)` }} />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-2 px-4 pb-3">
          <button type="button" onClick={() => setPlaying(p => !p)} className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:text-green-main transition-colors">
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
          </button>
          <button type="button" className="text-white/70 hover:text-white transition-colors"><SkipBack className="h-4 w-4" /></button>
          <button type="button" className="text-white/70 hover:text-white transition-colors"><SkipForward className="h-4 w-4" /></button>

          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => setMuted(m => !m)} className="text-white/70 hover:text-white transition-colors">
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range" min={0} max={100} value={muted ? 0 : volume}
              onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
              className="h-1 w-16 cursor-pointer accent-green-main"
            />
          </div>

          <span className="ml-1 text-xs text-white/70">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div className="flex-1" />
          <button type="button" className="text-white/70 hover:text-white transition-colors" title="Subtitles"><Subtitles className="h-4 w-4" /></button>
          <button type="button" className="text-white/70 hover:text-white transition-colors" title="Settings"><Settings className="h-4 w-4" /></button>
          <button type="button" onClick={toggleFullscreen} className="text-white/70 hover:text-white transition-colors">
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Watch Page ─────────────────────────────────────────────────────
function WatchPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const epParam = searchParams.get("ep");
  const currentEp = epParam ? Number.parseInt(epParam) : 1;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const servers = ["Server 1 (HD)", "Server 2 (SD)", "Server 3 (Backup)"];

  // Fetch from Supabase
  useEffect(() => {
    setLoading(true);
    fetchAnimeById(id).then(data => {
      setAnime(data);
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

  const episodes = generateEpisodes(anime);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-green-main">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/anime/${anime.id}`} className="hover:text-green-main">{anime.title}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-secondary">Episode {currentEp}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player */}
            <VideoPlayer
              title={anime.title}
              episode={currentEp}
              thumbnail={anime.bannerImage || anime.coverImage}
            />

            {/* Anime-style Controls Bar */}
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
                    i === activeServer
                      ? "bg-green-main text-bg-main"
                      : "bg-bg-panel text-text-secondary hover:text-text-main"
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
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg bg-bg-panel px-3 text-sm text-text-secondary transition-colors hover:text-text-main">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Like
                  </button>
                  <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-panel text-text-secondary transition-colors hover:text-text-main" aria-label="Report">
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
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
                <span className="text-xs text-text-muted">Sign in to comment</span>
              </button>
              {showComments && (
                <div className="mt-2 rounded-xl border border-border-main bg-bg-card p-6">
                  <div className="flex flex-col items-center py-6 text-center">
                    <MessageSquare className="mb-2 h-8 w-8 text-text-disabled" />
                    <p className="text-sm text-text-muted">No comments yet. Be the first to share your thoughts!</p>
                    <Link href="/login" className="mt-3 text-sm font-medium text-green-main hover:underline">Sign in to comment</Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <div className="rounded-xl border border-border-main bg-bg-card">
              <div className="flex items-center gap-2 border-b border-border-main p-3">
                <List className="h-4 w-4 text-green-main" />
                <span className="text-sm font-semibold text-text-main">Episodes</span>
                <span className="ml-auto text-xs text-text-muted">{episodes.length} total</span>
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
                    <span className="w-8 flex-shrink-0 text-xs font-semibold">{ep.number.toString().padStart(2, "0")}</span>
                    <span className="flex-1 truncate">{ep.title}</span>
                    {ep.number === currentEp && <Play className="h-3 w-3 flex-shrink-0 fill-green-main" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
