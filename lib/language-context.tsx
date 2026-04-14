"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.getStarted": "Get Started",
    "nav.language": "العربية",
    
    // Hero
    "hero.title": "Write Copy That Sells & Converts",
    "hero.subtitle": "Generate high-converting copy for any platform in seconds with AI-powered intelligence",
    "hero.cta": "Start Writing Free",
    
    // Platform Selector
    "platforms.title": "Choose Your Platform",
    "platforms.subtitle": "Select where you want to publish your content",
    
    // Generator
    "generator.title": "AI Copy Generator",
    "generator.platform": "Select Platform",
    "generator.contentType": "Content Type",
    "generator.details": "Product/Content Details",
    "generator.detailsPlaceholder": "Describe your product, service, or content idea in detail...",
    "generator.keywords": "Keywords",
    "generator.keywordsPlaceholder": "Enter keywords separated by commas",
    "generator.targetLanguage": "Target Language",
    "generator.tone": "Tone",
    "generator.generate": "✨ Generate Copy",
    "generator.generating": "Generating...",
    "generator.editForm": "Edit Form",
    
    // Content Types
    "contentType.titles": "Titles",
    "contentType.descriptions": "Descriptions",
    "contentType.scripts": "Scripts",
    "contentType.tags": "Tags",
    "contentType.captions": "Captions",
    "contentType.hashtags": "Hashtags",
    "contentType.stories": "Stories",
    "contentType.posts": "Posts",
    "contentType.ads": "Ad Copy",
    "contentType.articles": "Articles",
    "contentType.subject": "Subject Lines",
    "contentType.body": "Email Body",
    "contentType.seo": "SEO Content",
    
    // Tones
    "tone.professional": "Professional",
    "tone.casual": "Casual",
    "tone.persuasive": "Persuasive",
    "tone.friendly": "Friendly",
    "tone.urgent": "Urgent",
    "tone.humorous": "Humorous",
    
    // Languages
    "lang.english": "English",
    "lang.arabic": "Arabic",
    "lang.spanish": "Spanish",
    "lang.french": "French",
    "lang.german": "German",
    
    // Output
    "output.title": "Generated Copy",
    "output.copy": "Copy to Clipboard",
    "output.copied": "Copied!",
    "output.download": "Download",
    "output.regenerate": "Regenerate",
    
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.tagline": "AI-Powered Copywriting",
  },
  ar: {
    // Header
    "nav.getStarted": "ابدأ الآن",
    "nav.language": "English",
    
    // Hero
    "hero.title": "اكتب نصوصاً تبيع وتجذب العملاء",
    "hero.subtitle": "أنشئ نصوصاً تسويقية عالية التحويل لأي منصة في ثوانٍ باستخدام الذكاء الاصطناعي",
    "hero.cta": "ابدأ الكتابة مجاناً",
    
    // Platform Selector
    "platforms.title": "اختر منصتك",
    "platforms.subtitle": "حدد المنصة التي تريد نشر محتواك عليها",
    
    // Generator
    "generator.title": "مولّد النصوص بالذكاء الاصطناعي",
    "generator.platform": "اختر المنصة",
    "generator.contentType": "نوع المحتوى",
    "generator.details": "تفاصيل المنتج/المحتوى",
    "generator.detailsPlaceholder": "صف منتجك أو خدمتك أو فكرة المحتوى بالتفصيل...",
    "generator.keywords": "الكلمات المفتاحية",
    "generator.keywordsPlaceholder": "أدخل الكلمات المفتاحية مفصولة بفواصل",
    "generator.targetLanguage": "اللغة المستهدفة",
    "generator.tone": "النبرة",
    "generator.generate": "✨ توليد النص",
    "generator.generating": "جارٍ التوليد...",
    "generator.editForm": "تعديل النموذج",
    
    // Content Types
    "contentType.titles": "عناوين",
    "contentType.descriptions": "أوصاف",
    "contentType.scripts": "نصوص فيديو",
    "contentType.tags": "وسوم",
    "contentType.captions": "تعليقات",
    "contentType.hashtags": "هاشتاقات",
    "contentType.stories": "قصص",
    "contentType.posts": "منشورات",
    "contentType.ads": "إعلانات",
    "contentType.articles": "مقالات",
    "contentType.subject": "عناوين البريد",
    "contentType.body": "محتوى البريد",
    "contentType.seo": "محتوى SEO",
    
    // Tones
    "tone.professional": "احترافي",
    "tone.casual": "عفوي",
    "tone.persuasive": "مقنع",
    "tone.friendly": "ودود",
    "tone.urgent": "عاجل",
    "tone.humorous": "فكاهي",
    
    // Languages
    "lang.english": "الإنجليزية",
    "lang.arabic": "العربية",
    "lang.spanish": "الإسبانية",
    "lang.french": "الفرنسية",
    "lang.german": "الألمانية",
    
    // Output
    "output.title": "النص المُولّد",
    "output.copy": "نسخ إلى الحافظة",
    "output.copied": "تم النسخ!",
    "output.download": "تحميل",
    "output.regenerate": "إعادة التوليد",
    
    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.tagline": "كتابة إبداعية بالذكاء الاصطناعي",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("copyplus-language") as Language
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("copyplus-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
