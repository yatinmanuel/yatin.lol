import { NextResponse } from "next/server"
import puppeteer from "puppeteer-core"
import chrome from "@sparticuz/chromium"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { createHash } from "crypto"

// Configure cache directory
const CACHE_DIR = path.join(process.cwd(), "public/screenshots")
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// Ensure cache directory exists
if (!existsSync(CACHE_DIR)) {
  mkdirSync(CACHE_DIR, { recursive: true })
}

// Generate a hash for the URL to use as filename
function getUrlHash(url: string): string {
  return createHash("md5").update(url).digest("hex")
}

// Check if cached screenshot exists and is not expired
function getCachedScreenshot(urlHash: string): string | null {
  const cachePath = path.join(CACHE_DIR, `${urlHash}.json`)

  if (existsSync(cachePath)) {
    try {
      const cacheData = JSON.parse(readFileSync(cachePath, "utf-8"))

      // Check if cache is still valid
      if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
        return cacheData.imagePath
      }
    } catch (error) {
      console.error("Error reading cache:", error)
    }
  }

  return null
}

// Save screenshot to cache
function saveToCache(urlHash: string, imagePath: string): void {
  const cachePath = path.join(CACHE_DIR, `${urlHash}.json`)
  const cacheData = {
    timestamp: Date.now(),
    imagePath,
  }

  writeFileSync(cachePath, JSON.stringify(cacheData))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const forceRefresh = searchParams.get("refresh") === "true"

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const urlHash = getUrlHash(url)
    const publicPath = `/screenshots/${urlHash}.png`
    const filePath = path.join(process.cwd(), "public", publicPath)

    // Check cache first (unless force refresh is requested)
    if (!forceRefresh) {
      const cachedPath = getCachedScreenshot(urlHash)
      if (cachedPath) {
        return NextResponse.json({
          success: true,
          imageUrl: cachedPath,
          cached: true,
        })
      }
    }

    // Launch browser
    const browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath(),
      headless: true,
    })

    // Open new page
    const page = await browser.newPage()

    // Set viewport size
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    })

    // Navigate to URL with timeout
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 10000,
    })

    // Wait a bit for any animations or lazy-loaded content
    await page.waitForTimeout(1000)

    // Take screenshot
    await page.screenshot({
      path: filePath,
      fullPage: false,
      type: "png",
    })

    // Close browser
    await browser.close()

    // Save to cache
    saveToCache(urlHash, publicPath)

    return NextResponse.json({
      success: true,
      imageUrl: publicPath,
      cached: false,
    })
  } catch (error) {
    console.error("Screenshot error:", error)
    return NextResponse.json(
      {
        error: "Failed to take screenshot",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
