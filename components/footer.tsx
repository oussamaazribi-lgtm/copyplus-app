"use client"

import { Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/40 bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CopyPlus
            </span>
            <span className="text-muted-foreground text-sm">
              — {t("footer.tagline")}
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CopyPlus. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
