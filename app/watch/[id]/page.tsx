"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import ReactPlayer from "react-player"
import { fetchAnimeById, generateEpisodes, type Anime } from "@/lib/anime-data"

// ── Video Player ─────────────────────────────────
function VideoPlayer({ url, loading }: { url: string; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex aspect-video items-center justify-center bg-black rounded-xl">
        <p className="text-white">Loading video...</p>
      </div>
    )
  }

  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center bg-black rounded-xl">
        <p className="text-red-400">Failed to load video</p>
      </div>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <ReactPlayer url={url} controls width="100%" height="100%" />
    </div>
  )
}

// ── Watch Page ─────────────────────────────────
export default function WatchPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const id = params.id as string
  const epParam = searchParams.get("ep")
  const currentEp = epParam ? Number.parseInt(epParam) : 1

  const [anime, setAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(true)

  const [videoUrl, setVideoUrl] = useState("")
  const [videoLoading, setVideoLoading] = useState(true)

  // 🔹 Fetch anime data
  useEffect(() => {
    setLoading(true)

    fetchAnimeById(id).then((data) => {
      setAnime(data)
      setLoading(false)
    })
  }, [id])

  // 🔹 Fetch stream
  useEffect(() => {
    const loadStream = async () => {
      try {
        setVideoLoading(true)

        const episodeId = `${id}-episode-${currentEp}`

        const res = await fetch(`/api/stream/${episodeId}`)
        const data = await res.json()

        setVideoUrl(data?.sources?.[0]?.url || "")
      } catch (err) {
        console.error("STREAM ERROR:", err)
        setVideoUrl("")
      } finally {
        setVideoLoading(false)
      }
    }

    loadStream()
  }, [id, currentEp])

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white">Anime not found</p>
      </div>
    )
  }

  const episodes = generateEpisodes(anime)

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">
        {anime.title} — Episode {currentEp}
      </h1>

      {/* Player */}
      <VideoPlayer url={videoUrl} loading={videoLoading} />

      {/* Episode Navigation */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {episodes.slice(0, 50).map((ep) => (
          <Link
            key={ep.id}
            href={`/watch/${anime.id}?ep=${ep.number}`}
            className={`px-3 py-1 rounded ${
              ep.number === currentEp
                ? "bg-green-500 text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {ep.number}
          </Link>
        ))}
      </div>
    </div>
  )
}