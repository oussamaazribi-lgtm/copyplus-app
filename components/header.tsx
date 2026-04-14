"use client"

import { Sparkles, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

interface HeaderProps {
  onGetStarted?: () => void
}

export function Header({ onGetStarted }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted()
    } else {
      const platforms = document.getElementById("platforms")
      platforms?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-7 w-7 text-primary" />
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CopyPlus
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t("nav.language")}</span>
          </Button>

          {/* Get Started Button */}
          <Button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
          >
            {t("nav.getStarted")}
          </Button>
        </div>
      </div>
    </header>
  )
}
