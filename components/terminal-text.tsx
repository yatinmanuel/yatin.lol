"use client"

import { useState, useEffect, useRef } from "react"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
  className?: string
  showCursor?: boolean
  delay?: number
}

export function TerminalText({
  text,
  typingSpeed = 50,
  className = "",
  showCursor = true,
  delay = 0,
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, typingSpeed)

      return () => clearInterval(typingInterval)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, typingSpeed, delay])

  return (
    <span className={`terminal-text ${className} ${showCursor && isTyping ? 'after:content-[""]' : ""}`}>
      {displayText}
    </span>
  )
}
