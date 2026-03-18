import { NextResponse } from "next/server"
import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"

function getLogPath() {
  const baseDir = process.env.INIT_CWD || process.env.PWD || process.cwd()
  return path.join(baseDir, "debug-19b511.log")
}

async function appendToAllLogLocations(line: string) {
  const candidates = [
    getLogPath(),
    path.join(process.env.INIT_CWD || process.env.PWD || process.cwd(), ".cursor", "debug-19b511.log"),
    path.join(process.cwd(), "debug-19b511.log"),
    path.join(process.cwd(), ".cursor", "debug-19b511.log"),
  ]

  const results = await Promise.all(
    candidates.map(async (p) => {
      try {
        await mkdir(path.dirname(p), { recursive: true }).catch(() => {})
        await appendFile(p, line, { encoding: "utf8" })
        return { path: p, ok: true as const }
      } catch (e) {
        return { path: p, ok: false as const, error: String(e) }
      }
    })
  )

  return results
}

export async function GET() {
  const logPath = getLogPath()
  const cwd = process.cwd()
  const baseDir = process.env.INIT_CWD || process.env.PWD || cwd
  try {
    const payload = {
      sessionId: "19b511",
      runId: "probe",
      hypothesisId: "H_DEBUG_ROUTE",
      location: "app/api/debug-log/route.ts:GET",
      message: "Debug route GET probe",
      data: { logPath, cwd, baseDir },
      timestamp: Date.now(),
    }
    const writeResults = await appendToAllLogLocations(`${JSON.stringify(payload)}\n`)
    return NextResponse.json({ ok: true, logPath, cwd, baseDir, writeResults })
  } catch {
    // ignore
  }

  return NextResponse.json({ ok: true, logPath, cwd, baseDir, writeResults: [] })
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text()

    try {
      await appendToAllLogLocations(`${bodyText}\n`)
    } catch {
      // ignore
    }

    try {
      const meta = {
        sessionId: "19b511",
        runId: "pre-fix",
        hypothesisId: "H_DEBUG_ROUTE",
        location: "app/api/debug-log/route.ts:POST",
        message: "debug-log received POST",
        data: {
          contentType: req.headers.get("content-type"),
          bodyLength: bodyText.length,
          bodyPreview: bodyText.slice(0, 200),
        },
        timestamp: Date.now(),
      }
      await appendToAllLogLocations(`${JSON.stringify(meta)}\n`)
    } catch {
      // ignore
    }

    await fetch("http://127.0.0.1:7821/ingest/14c8addf-ae12-450b-b4f0-55c73bd82a57", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "19b511",
      },
      body: bodyText,
    }).catch(() => {})
  } catch {
    // swallow
  }

  return NextResponse.json({ ok: true, logPath: getLogPath(), cwd: process.cwd() })
}

