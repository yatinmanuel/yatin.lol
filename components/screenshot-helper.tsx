"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// This is a helper component to take screenshots of websites
// You can use this during development to capture screenshots

export function ScreenshotHelper() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imageData, setImageData] = useState("")

  const takeScreenshot = async () => {
    if (!url) return

    setLoading(true)
    setError("")

    try {
      // This is a placeholder for a screenshot API
      // You would need to implement this on your server
      // or use a service like Cloudinary, Vercel OG, or Screenshot API
      const response = await fetch(`/api/screenshot?url=${encodeURIComponent(url)}`)

      if (!response.ok) {
        throw new Error("Failed to take screenshot")
      }

      const data = await response.json()
      setImageData(data.imageUrl)
    } catch (err) {
      setError("Failed to take screenshot. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Screenshot Helper</h3>

      <div className="flex gap-2 mb-4">
        <Input
          type="url"
          placeholder="Enter URL to screenshot"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={takeScreenshot} disabled={loading}>
          {loading ? "Taking..." : "Take Screenshot"}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {imageData && (
        <div className="mt-4">
          <p className="mb-2">Screenshot taken! Save this image to your project:</p>
          <img src={imageData || "/placeholder.svg"} alt="Screenshot" className="border border-gray-700 rounded" />
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p>To use this helper:</p>
        <ol className="list-decimal pl-5 mt-2">
          <li>Enter the URL of the website you want to screenshot</li>
          <li>Click "Take Screenshot"</li>
          <li>Save the image to your /public/images folder</li>
          <li>Update the image paths in your code</li>
        </ol>
      </div>
    </div>
  )
}
