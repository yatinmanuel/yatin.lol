"use client"
import { ScreenshotManager } from "@/components/screenshot-manager"

export default function ScreenshotsAdminPage() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-red-500">Screenshot Management</h1>

        <div className="mb-8">
          <p className="text-gray-300 mb-4">
            Use this tool to capture, manage and refresh screenshots of websites for your tooltips. Screenshots are
            automatically cached for 7 days to improve performance.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Capture New Screenshot</h2>
            <ScreenshotManager />
          </div>
        </div>
      </div>
    </div>
  )
}
