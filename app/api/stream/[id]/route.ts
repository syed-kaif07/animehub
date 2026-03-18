import { NextResponse } from "next/server"
import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { ANIME } from "@consumet/extensions"

export const runtime = "nodejs"

const hianime = new ANIME.Hianime()

async function debugLog(payload: unknown) {
  try {
    const baseDir = process.env.INIT_CWD || process.env.PWD || process.cwd()
    const candidates = [
      path.join(baseDir, "debug-19b511.log"),
      path.join(baseDir, ".cursor", "debug-19b511.log"),
    ]
    const line = `${JSON.stringify(payload)}\n`
    await Promise.all(
      candidates.map(async (p) => {
        await mkdir(path.dirname(p), { recursive: true }).catch(() => {})
        await appendFile(p, line, { encoding: "utf8" }).catch(() => {})
      })
    )
  } catch {
    // ignore
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rawId = params.id
  const id = decodeURIComponent(rawId)

  await debugLog({
    sessionId: "19b511",
    runId: "pre-fix",
    hypothesisId: "H_STREAM_API",
    location: "app/api/stream/[id]/route.ts:GET",
    message: "Stream API called",
    data: { rawIdPreview: String(rawId).slice(0, 160), idPreview: String(id).slice(0, 160) },
    timestamp: Date.now(),
  })

  try {
    const sources = await hianime.fetchEpisodeSources(id)

    await debugLog({
      sessionId: "19b511",
      runId: "pre-fix",
      hypothesisId: "H_STREAM_API",
      location: "app/api/stream/[id]/route.ts:afterFetchEpisodeSources",
      message: "Episode sources fetched",
      data: {
        hasSources: Array.isArray(sources?.sources),
        sourcesCount: Array.isArray(sources?.sources) ? sources.sources.length : null,
        firstUrl: sources?.sources?.[0]?.url ? String(sources.sources[0].url).slice(0, 160) : null,
      },
      timestamp: Date.now(),
    })

    return NextResponse.json({
      sources: sources.sources,
      subtitles: sources.subtitles,
    })
  } catch (error) {
    await debugLog({
      sessionId: "19b511",
      runId: "pre-fix",
      hypothesisId: "H_STREAM_API",
      location: "app/api/stream/[id]/route.ts:catch",
      message: "Stream API failed; returning fallback MP4",
      data: { error: String(error), idPreview: String(id).slice(0, 160) },
      timestamp: Date.now(),
    })

    // Fallback for MVP so the Watch page is functional even if provider fails.
    return NextResponse.json({
      fallback: true,
      sources: [
        {
          url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
          quality: "HD",
          isM3U8: false,
        },
      ],
      subtitles: [],
    })
  }
}