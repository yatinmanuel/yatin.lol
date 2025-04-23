import type React from "react"
import "./globals.css"
import { Geist_Mono as GeistMono } from "next/font/google"
import { CustomCursor } from "@/components/custom-cursor"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

// Load Geist Mono font
const geistMono = GeistMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "Yatin Manuel",
  description: "19 y/o student, co-founder & ceo @ halvex, system/network administrator",
  generator: 'v0.dev',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Yatin Manuel",
    description: "19 y/o student, co-founder & ceo @ halvex, system/network administrator",
    url: "https://yatin.lol",
    images: [
      {
        url: "https://yatin.lol/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Yatin Manuel banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yatin Manuel",
    description: "19 y/o student, co-founder & ceo @ halvex, system/network administrator",
    images: ["https://yatin.lol/images/banner.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistMono.variable}`}>
      <body className="bg-black text-red-500 font-mono relative overflow-x-hidden min-h-screen">
        <CustomCursor />
        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
