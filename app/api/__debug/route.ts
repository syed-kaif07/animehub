import { NextResponse } from "next/server"
import { appendFile } from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"

function getLogPath() {
  const baseDir = process.env.INIT_CWD || process.env.PWD || process.cwd()
  return path.join(baseDir, "debug-19b511.log")
}

export async function GET() {
  const logPath = getLogPath()
  try {
    const payload = {
      sessionId: "19b511",
      runId: "probe",
      hypothesisId: "H_DEBUG_ROUTE",
      location: "app/api/__debug/route.ts:GET",
      message: "Debug route GET probe",
      data: { logPath, cwd: process.cwd() },
      timestamp: Date.now(),
    }
    await appendFile(logPath, `${JSON.stringify(payload)}\n`, { encoding: "utf8" })
  } catch {
    // ignore
  }

  return NextResponse.json({ ok: true, logPath, cwd: process.cwd() })
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text()

    try {
      // write NDJSON line locally for guaranteed evidence
      const logPath = getLogPath()
      await appendFile(logPath, `${bodyText}\n`, { encoding: "utf8" })
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

