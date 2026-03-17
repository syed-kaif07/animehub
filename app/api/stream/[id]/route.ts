import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

const hianime = new ANIME.Hianime()

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sources = await hianime.fetchEpisodeSources(id)

    return NextResponse.json({
      sources: sources.sources,
      subtitles: sources.subtitles
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stream" },
      { status: 500 }
    )
  }
}