/**
 * Service to handle website screenshot fetching and caching
 */

// Default placeholder image to use when screenshot is not available
const DEFAULT_PLACEHOLDER = "/placeholder.svg?height=600&width=800"

// Interface for screenshot response
interface ScreenshotResponse {
  success: boolean
  imageUrl: string
  cached?: boolean
  error?: string
}

/**
 * Fetch a screenshot for a given URL
 * @param url The URL to capture
 * @param forceRefresh Whether to force a refresh of the screenshot
 * @returns The URL to the screenshot image
 */
export async function getScreenshot(url: string, forceRefresh = false): Promise<string> {
  if (!url) return DEFAULT_PLACEHOLDER

  try {
    // Add protocol if missing
    if (!url.startsWith("http")) {
      url = `https://${url}`
    }

    const apiUrl = `/api/screenshot?url=${encodeURIComponent(url)}${forceRefresh ? "&refresh=true" : ""}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error("Screenshot API error:", response.statusText)
      return DEFAULT_PLACEHOLDER
    }

    const data: ScreenshotResponse = await response.json()

    if (data.success && data.imageUrl) {
      return data.imageUrl
    }

    return DEFAULT_PLACEHOLDER
  } catch (error) {
    console.error("Error fetching screenshot:", error)
    return DEFAULT_PLACEHOLDER
  }
}

/**
 * Preload screenshots for a list of URLs
 * @param urls Array of URLs to preload screenshots for
 */
export async function preloadScreenshots(urls: string[]): Promise<void> {
  try {
    // Fetch screenshots in parallel
    await Promise.allSettled(urls.map((url) => getScreenshot(url)))
  } catch (error) {
    console.error("Error preloading screenshots:", error)
  }
}
