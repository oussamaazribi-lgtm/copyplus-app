"use client"

import { ShoppingBag, Store, Package, Youtube, Instagram, Music2, Facebook, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const platforms = [
  { id: "etsy", name: "Etsy", icon: ShoppingBag, color: "bg-orange-500" },
  { id: "shopify", name: "Shopify", icon: Store, color: "bg-green-500" },
  { id: "amazon", name: "Amazon", icon: Package, color: "bg-amber-500" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-500" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-500" },
  { id: "tiktok", name: "TikTok", icon: Music2, color: "bg-foreground" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
]

interface PlatformSelectorProps {
  selectedPlatform: string | null
  onSelectPlatform: (platform: string) => void
}

export function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  const { t } = useLanguage()

  return (
    <section id="platforms" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {t("platforms.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            {t("platforms.subtitle")}
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon
            const isSelected = selectedPlatform === platform.id

            return (
              <Card
                key={platform.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
                  isSelected
                    ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                    : "hover:ring-1 hover:ring-primary/50"
                )}
                onClick={() => onSelectPlatform(platform.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 md:p-8">
                  <div className={cn("mb-4 rounded-xl p-3 text-primary-foreground", platform.color)}>
                    <Icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <span className="font-semibold text-foreground">{platform.name}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
