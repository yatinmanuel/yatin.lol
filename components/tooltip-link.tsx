"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface TooltipLinkProps {
  href: string
  children: React.ReactNode
  tooltipContent?: React.ReactNode
  imageUrl?: string
  imageAlt?: string
  imageFilter?: string
  isProfilePic?: boolean
  className?: string
  animation?: "pulse" | "glow" | "rotate" | "none"
  isIcon?: boolean
}

export function TooltipLink({
  href,
  children,
  tooltipContent,
  imageUrl,
  imageAlt = "Preview",
  imageFilter,
  isProfilePic = false,
  className = "",
  animation = "none",
  isIcon = false,
}: TooltipLinkProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Explicitly check if there is content for the tooltip
  const hasTooltipContent = Boolean(tooltipContent) || Boolean(imageUrl)

  useEffect(() => {
    // Only run positioning logic if there IS tooltip content
    if (!hasTooltipContent) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!tooltipRef.current) return

      const tooltipWidth = tooltipRef.current.offsetWidth
      const tooltipHeight = tooltipRef.current.offsetHeight

      const x = Math.min(e.clientX + 15, window.innerWidth - tooltipWidth - 10)
      const y = Math.min(e.clientY + 15, window.innerHeight - tooltipHeight - 10)

      tooltipRef.current.style.left = `${x}px`
      tooltipRef.current.style.top = `${y}px`
    }

    // Only add listener if visible AND there is content to show
    if (tooltipVisible && hasTooltipContent) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
    // Dependency array includes hasTooltipContent now
  }, [tooltipVisible, hasTooltipContent])

  const getAnimationClass = () => {
    if (animation === "none") return ""
    return `animate-${animation}`
  }

  const displayImageUrl = imageUrl

  return (
    <Link
      href={href}
      ref={linkRef}
      className={`${isIcon ? "social-icon" : "text-link"} ${className}`}
      // Only attach hover listeners if there IS content for a tooltip
      onMouseEnter={hasTooltipContent ? () => setTooltipVisible(true) : undefined}
      onMouseLeave={hasTooltipContent ? () => setTooltipVisible(false) : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <span className={getAnimationClass()}>{children}</span>

      {/* Always render tooltip container and toggle CSS visibility to keep image loaded */}
      {hasTooltipContent && (
        <div
          ref={tooltipRef}
          className={`tooltip-container ${tooltipVisible ? "tooltip-visible" : ""}`}
          style={{
            minWidth: isProfilePic ? "150px" : "280px",
            maxWidth: isProfilePic ? "150px" : "400px",
          }}
        >
          {displayImageUrl && (
            <div className={isProfilePic ? "mb-2 flex justify-center p-2" : "mb-2 relative p-2"}>
              <Image
                src={displayImageUrl}
                alt={imageAlt}
                width={isProfilePic ? 120 : 380}
                height={isProfilePic ? 120 : 200}
                priority
                className={isProfilePic ? "rounded-full" : "rounded"}
                style={{
                  objectFit: isProfilePic ? "cover" : "contain",
                  maxHeight: "200px",
                  filter: imageFilter,
                }}
              />
            </div>
          )}
          {tooltipContent && <div className="text-xs text-gray-300">{tooltipContent}</div>}
        </div>
      )}
    </Link>
  )
}
