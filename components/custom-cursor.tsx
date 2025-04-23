"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    const handleLinkHoverStart = () => setIsHovering(true)
    const handleLinkHoverEnd = () => setIsHovering(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"]), .social-icon, .text-link',
    )

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHoverStart)
      element.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkHoverStart)
        element.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, [])

  // Calculate cursor size and styles based on hover state
  const cursorSize = isHovering ? 8 : 30
  const cursorOpacity = isHovering ? 1 : 0.3
  const cursorColor = isHovering ? "#ffffff" : "#888888"

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        backgroundColor: cursorColor,
        opacity: hidden ? 0 : cursorOpacity,
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s, height 0.2s, opacity 0.2s, background-color 0.2s",
        filter: "none",
      }}
    />
  )
}
