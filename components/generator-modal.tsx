"use client"

import { useState, useEffect } from "react"
import { Sparkles, Copy, Download, RefreshCw, Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const platformContentTypes: Record<string, string[]> = {
  shopify: ["titles", "descriptions", "tags", "ads"],
  etsy: ["titles", "descriptions", "tags"],
  amazon: ["titles", "descriptions", "seo"],
  youtube: ["titles", "descriptions", "scripts", "tags"],
  instagram: ["captions", "hashtags", "stories", "ads"],
  tiktok: ["captions", "hashtags", "scripts"],
  facebook: ["posts", "ads", "captions"],
  linkedin: ["posts", "articles", "ads"],
  email: ["subject", "body"],
  blog: ["titles", "articles", "seo"],
}

const platforms = [
  { id: "shopify", name: "Shopify" },
  { id: "etsy", name: "Etsy" },
  { id: "amazon", name: "Amazon" },
  { id: "facebook", name: "Facebook" },
  { id: "instagram", name: "Instagram" },
  { id: "tiktok", name: "TikTok" },
  { id: "youtube", name: "YouTube" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "email", name: "Email" },
  { id: "blog", name: "Blog SEO" },
]

const tones = ["professional", "casual", "persuasive", "friendly", "urgent", "humorous"]
const languages = ["english", "arabic", "spanish", "french", "german"]

export interface GeneratorData {
  platform: string
  contentType: string
  details: string
  keywords: string
  targetLanguage: string
  tone: string
}

interface GeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlatform: string | null
  onGenerate: (data: GeneratorData) => Promise<string>
}

export function GeneratorModal({ isOpen, onClose, selectedPlatform, onGenerate }: GeneratorModalProps) {
  const { t, isRTL } = useLanguage()
  const [platform, setPlatform] = useState(selectedPlatform || "")
  const [contentType, setContentType] = useState("")
  const [details, setDetails] = useState("")
  const [keywords, setKeywords] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("english")
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [copied, setCopied] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Sync platform state when modal opens with a selected platform
  useEffect(() => {
    if (selectedPlatform && isOpen) {
      setPlatform(selectedPlatform)
      setContentType("")
      setGeneratedContent("")
      setShowResult(false)
    }
  }, [selectedPlatform, isOpen])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setGeneratedContent("")
        setShowResult(false)
        setDetails("")
        setKeywords("")
        setContentType("")
      }, 200)
    }
  }, [isOpen])

  const availableContentTypes = platform ? platformContentTypes[platform] || [] : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!platform || !contentType || !details.trim()) return

    setIsGenerating(true)
    
    const result = await onGenerate({
      platform,
      contentType,
      details,
      keywords,
      targetLanguage,
      tone,
    })

    setGeneratedContent(result)
    setShowResult(true)
    setIsGenerating(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `copyplus-generated-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRegenerate = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleBackToForm = () => {
    setShowResult(false)
    setGeneratedContent("")
  }

  const BackIcon = isRTL ? ChevronRight : ChevronLeft

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className={cn(
          "max-w-2xl max-h-[90vh] overflow-y-auto",
          isRTL && "rtl"
        )}
        showCloseButton={false}
        aria-describedby="generator-description"
      >
        {/* Header */}
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  {showResult ? t("output.title") : t("generator.title")}
                </DialogTitle>
                <DialogDescription id="generator-description" className="text-sm text-muted-foreground">
                  {showResult 
                    ? (isRTL ? "النص الذي تم إنشاؤه جاهز للاستخدام" : "Your generated content is ready to use")
                    : (isRTL ? "أدخل التفاصيل لإنشاء نص احترافي" : "Enter details to generate professional copy")
                  }
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-secondary"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="pt-2">
          {!showResult ? (
            /* Generator Form */
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-5">
                {/* Platform & Content Type Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel className="text-sm font-medium">{t("generator.platform")}</FieldLabel>
                    <Select value={platform} onValueChange={(value) => {
                      setPlatform(value)
                      setContentType("")
                    }}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder={t("generator.platform")} />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-medium">{t("generator.contentType")}</FieldLabel>
                    <Select value={contentType} onValueChange={setContentType} disabled={!platform}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder={t("generator.contentType")} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableContentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`contentType.${type}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                {/* Details Textarea */}
                <Field>
                  <FieldLabel className="text-sm font-medium">{t("generator.details")}</FieldLabel>
                  <Textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={t("generator.detailsPlaceholder")}
                    className="min-h-28 resize-none bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20"
                  />
                </Field>

                {/* Keywords Input */}
                <Field>
                  <FieldLabel className="text-sm font-medium">{t("generator.keywords")}</FieldLabel>
                  <Input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder={t("generator.keywordsPlaceholder")}
                    className="h-11 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20"
                  />
                </Field>

                {/* Language & Tone Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel className="text-sm font-medium">{t("generator.targetLanguage")}</FieldLabel>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {t(`lang.${lang}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-medium">{t("generator.tone")}</FieldLabel>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t_) => (
                          <SelectItem key={t_} value={t_}>
                            {t(`tone.${t_}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                {/* Generate Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold shadow-lg shadow-primary/25 h-12 text-base"
                  disabled={isGenerating || !platform || !contentType || !details.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Spinner className="me-2 h-4 w-4" />
                      {t("generator.generating")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="me-2 h-4 w-4" />
                      {t("generator.generate")}
                    </>
                  )}
                </Button>
              </FieldGroup>
            </form>
          ) : (
            /* Output Result */
            <div className="space-y-5">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToForm}
                className="text-muted-foreground hover:text-foreground -ms-2"
              >
                <BackIcon className="me-1 h-4 w-4" />
                {t("generator.editForm")}
              </Button>

              {/* Generated Content */}
              <div className="rounded-xl bg-secondary/50 p-5 whitespace-pre-wrap text-foreground leading-relaxed max-h-72 overflow-y-auto text-sm">
                {generatedContent}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="h-11"
                >
                  {copied ? (
                    <>
                      <Check className="me-2 h-4 w-4 text-green-500" />
                      <span className="hidden sm:inline">{t("output.copied")}</span>
                      <span className="sm:hidden">{isRTL ? "تم" : "Done"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="me-2 h-4 w-4" />
                      <span className="hidden sm:inline">{t("output.copy")}</span>
                      <span className="sm:hidden">{isRTL ? "نسخ" : "Copy"}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="h-11"
                >
                  <Download className="me-2 h-4 w-4" />
                  <span className="hidden sm:inline">{t("output.download")}</span>
                  <span className="sm:hidden">{isRTL ? "تحميل" : "Save"}</span>
                </Button>

                <Button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                >
                  <RefreshCw className={cn("me-2 h-4 w-4", isGenerating && "animate-spin")} />
                  <span className="hidden sm:inline">{t("output.regenerate")}</span>
                  <span className="sm:hidden">{isRTL ? "إعادة" : "Redo"}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
