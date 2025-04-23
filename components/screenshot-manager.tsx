"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getScreenshot } from "@/lib/screenshot-service"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface ScreenshotManagerProps {
  onScreenshotTaken?: (imageUrl: string) => void
}

export function ScreenshotManager({ onScreenshotTaken }: ScreenshotManagerProps) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [recentUrls, setRecentUrls] = useState<string[]>([])

  // Load recent URLs from localStorage
  useEffect(() => {
    const savedUrls = localStorage.getItem("recentScreenshotUrls")
    if (savedUrls) {
      try {
        setRecentUrls(JSON.parse(savedUrls))
      } catch (e) {
        console.error("Error loading recent URLs:", e)
      }
    }
  }, [])

  // Save recent URLs to localStorage
  const saveRecentUrl = (url: string) => {
    const updatedUrls = [url, ...recentUrls.filter((u) => u !== url)].slice(0, 5)
    setRecentUrls(updatedUrls)
    localStorage.setItem("recentScreenshotUrls", JSON.stringify(updatedUrls))
  }

  const takeScreenshot = async (urlToCapture = url, forceRefresh = false) => {
    if (!urlToCapture) return

    setLoading(true)
    setError("")
    setImageUrl("")

    try {
      const screenshotUrl = await getScreenshot(urlToCapture, forceRefresh)
      setImageUrl(screenshotUrl)
      saveRecentUrl(urlToCapture)

      if (onScreenshotTaken) {
        onScreenshotTaken(screenshotUrl)
      }
    } catch (err) {
      setError("Failed to take screenshot. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border border-gray-800 rounded-lg bg-black">
      <h3 className="text-lg font-medium mb-4 text-gray-200">Screenshot Manager</h3>

      <div className="flex gap-2 mb-4">
        <Input
          type="url"
          placeholder="Enter URL to screenshot"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-gray-900 border-gray-700 text-gray-200"
        />
        <Button
          onClick={() => takeScreenshot(url, true)}
          disabled={loading || !url}
          className="bg-red-900 hover:bg-red-800 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Capturing...
            </>
          ) : (
            "Take Screenshot"
          )}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <p className="mb-2 text-gray-300">Screenshot taken:</p>
          <div className="border border-gray-700 rounded overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Website Screenshot"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">Image path: {imageUrl}</p>
        </div>
      )}

      {recentUrls.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2 text-gray-300">Recent Screenshots:</h4>
          <div className="space-y-2">
            {recentUrls.map((recentUrl, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 truncate max-w-[70%]">{recentUrl}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => takeScreenshot(recentUrl)}
                  className="text-xs border-gray-700 text-gray-300"
                >
                  Reload
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
