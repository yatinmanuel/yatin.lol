"use client"

import { useEffect, useState } from "react"
import { HackerText } from "@/components/hacker-text"
import { TerminalText } from "@/components/terminal-text"
import { TooltipLink } from "@/components/tooltip-link"
import { Instagram, Github, Linkedin, Mail } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const emailCodes = [104,101,108,108,111,64,121,97,116,105,110,46,108,111,108]
  const email = String.fromCharCode(...emailCodes)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen flex flex-col justify-center p-4 md:p-8 max-w-3xl mx-auto">
      <header className="mb-12 mt-16">
        <h1 className="name-title text-4xl md:text-6xl font-bold mb-4">
          <HackerText text="yatin manuel" delay={300} duration={800} charChangeCount={30} />
        </h1>

        <div className="font-mono text-sm md:text-base mb-6 text-gray-400">
          <TerminalText text="root@publicshell:~$ curl https://yatin.lol/hello" delay={1200} typingSpeed={20} />
        </div>
      </header>

      <section className="space-y-6 mb-12">
        <div className="font-mono text-sm md:text-base leading-relaxed text-gray-200">
          I'm one of the co-founders of{" "}
          <TooltipLink
            href="https://halvex.net"
            tooltipContent="Halvex - The Internet Company."
            imageUrl="/images/halvex-logo.svg"
            imageAlt="Halvex logo"
            imageFilter="invert(1)"
            className="underline font-bold"
          >
            Halvex
          </TooltipLink>
          , a startup that aims to provide affordable cloud infrastructure revolutionary digital solutions to make a
          positive impact on the world.
        </div>

        <div className="font-mono text-sm md:text-base leading-relaxed text-gray-200">
          I'm working on a project called{" "}
          <TooltipLink
            href="https://canary.engineering"
            tooltipContent="Canary Engineering - Integrated Automotive Solutions"
            imageUrl="/images/canary-logo.png"
            imageAlt="Canary Engineering logo"
            className="underline font-bold"
          >
            Canary
          </TooltipLink>
          , an innovative automotive solution developed with a few
          close collaborators. We can't reveal all the details yet, but I'm excited to show you what we're building soon!
        </div>

        <div className="font-mono text-sm md:text-base leading-relaxed text-gray-200">
          In my free time I like to learn and self-teach myself new things, listen to a lot of music (R&B, rap, pop,
          rock), experiment and test with new things, and maybe, just once in a while, edit what you're looking at right
          now.
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-hacker-red">connect</h2>

        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/in/yatinmanuel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="social-icon"
          >
            <Linkedin className="w-6 h-6" />
          </a>

          <a
            href="https://github.com/yatinmanuel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="social-icon"
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://instagram.com/yatin.lol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="social-icon"
          >
            <Instagram className="w-6 h-6" />
          </a>

          <Dialog>
            <DialogTrigger asChild>
              <button aria-label="Show email" className="social-icon">
                <Mail className="w-6 h-6" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Email</DialogTitle>
                <DialogDescription className="font-mono text-center">
                  <br /><strong>yatin [at] halvex [dot] net</strong><br /><br />you know how to read that :)
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </main>
  )
}
