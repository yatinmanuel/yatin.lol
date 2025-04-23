import type React from "react"

interface SocialIconProps {
  children: React.ReactNode
  animation?: "pulse" | "glow" | "rotate" | "none"
}

export function SocialIcon({ children, animation = "none" }: SocialIconProps) {
  const getAnimationClass = () => {
    switch (animation) {
      case "pulse":
        return "animate-pulse"
      case "glow":
        return "animate-glow"
      case "rotate":
        return "animate-rotate"
      default:
        return ""
    }
  }

  return <div className={`social-icon ${getAnimationClass()}`}>{children}</div>
}
