"use client"

import { useState, useEffect, useRef } from "react"

interface HackerTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  charChangeCount?: number
  charSet?: string
}

export function HackerText({
  text,
  className = "",
  delay = 0,
  duration = 1000, // Reduced from 2000 to 1000 for faster animation
  charChangeCount = 20, // Increased from 10 to 20 for more character changes
  charSet,
}: HackerTextProps) {
  const chars =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`"
  const [displayText, setDisplayText] = useState(() =>
    text
      .split("")
      .map((c) => (c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
      .join("")
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const completedRef = useRef(false)
  const iterationRef = useRef(0)

  useEffect(() => {
    // Extended character set for more variety
    const startAnimation = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)

      let iterations = 0
      const maxIterations = charChangeCount

      intervalRef.current = setInterval(() => {
        if (completedRef.current) return

        iterations++

        if (iterations >= maxIterations) {
          setDisplayText(text)
          completedRef.current = true
          if (intervalRef.current) clearInterval(intervalRef.current)
          return
        }

        // Generate scrambled text that gradually becomes the target text
        const progress = iterations / maxIterations
        let result = ""

        for (let i = 0; i < text.length; i++) {
          // Characters that should already be revealed
          if (i < Math.floor(text.length * progress)) {
            result += text[i]
          }
          // Characters that should be scrambled
          else if (text[i] === " ") {
            result += " "
          } else {
            result += chars[Math.floor(Math.random() * chars.length)]
          }
        }

        setDisplayText(result)
      }, duration / charChangeCount) // This makes the interval shorter for more rapid changes
    }

    const timeoutId = setTimeout(() => {
      completedRef.current = false
      iterationRef.current = 0
      startAnimation()
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, delay, duration, charChangeCount, charSet])

  // Use a span with a fixed width based on the text to prevent layout shifts
  return (
    <span
      className={`scramble-text ${className}`}
      style={{
        display: "inline-block",
        minWidth: `${text.length}ch`, // Ensure the width doesn't change during animation
      }}
    >
      {displayText}
    </span>
  )
}
