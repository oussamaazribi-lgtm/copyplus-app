"use client"

import { useState, useEffect } from "react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlatformSelector } from "@/components/platform-selector"
import { GeneratorModal, type GeneratorData } from "@/components/generator-modal"
import { Footer } from "@/components/footer"

// Mock generated content for demo
const mockResponses: Record<string, Record<string, string>> = {
  en: {
    shopify: `Premium Product Title:
"Handcrafted Leather Wallet - Genuine Italian Leather | Slim Bifold Design | RFID Protected | Perfect Gift for Men"

Product Description:
Elevate your everyday carry with our meticulously handcrafted leather wallet. Made from 100% genuine Italian leather, this slim bifold wallet combines timeless elegance with modern functionality.

Key Features:
- Premium Italian leather that ages beautifully
- RFID-blocking technology for security
- 6 card slots + 2 hidden pockets
- Slim profile fits comfortably in any pocket
- Available in Classic Brown, Midnight Black, and Cognac

Makes the perfect gift for birthdays, anniversaries, or any special occasion.

Order now and experience luxury that lasts a lifetime!`,
    etsy: `Etsy Listing Title:
"Handmade Ceramic Mug | Artisan Coffee Cup | Unique Pottery Gift | Rustic Kitchen Decor | 12oz Stoneware"

Listing Description:
Discover the charm of handcrafted artistry with this beautiful ceramic mug. Each piece is lovingly made in my home studio, ensuring that no two mugs are exactly alike.

What Makes This Special:
- Hand-thrown on a pottery wheel
- Food-safe glazes in earthy tones
- Microwave and dishwasher safe
- Comfortable handle design
- Perfect 12oz capacity for your morning brew

This mug makes a thoughtful gift for coffee lovers, tea enthusiasts, or anyone who appreciates handmade craftsmanship.

Tags: handmade mug, ceramic cup, pottery gift, artisan coffee, rustic decor`,
    amazon: `Amazon Product Title:
Premium Wireless Bluetooth Earbuds - Active Noise Cancelling - 48H Battery Life - IPX7 Waterproof - Hi-Fi Stereo Sound - Touch Control - Built-in Mic for Calls

Bullet Points:
- SUPERIOR SOUND QUALITY: Experience crystal-clear Hi-Fi stereo sound with deep bass and crisp highs powered by 13mm dynamic drivers
- ALL-DAY BATTERY: Enjoy up to 8 hours of playtime on a single charge, plus 40 additional hours with the compact charging case
- ACTIVE NOISE CANCELLATION: Block out distractions with advanced ANC technology. Switch to transparency mode when you need awareness
- WATERPROOF & SWEATPROOF: IPX7 rated protection makes these earbuds perfect for workouts, running, and outdoor activities
- SEAMLESS CONNECTIVITY: Bluetooth 5.3 ensures stable connection up to 33ft. Touch controls for music, calls, and voice assistant

A+ Content Description:
Upgrade your audio experience with our premium wireless earbuds. Whether you're commuting, working out, or relaxing at home, enjoy immersive sound quality that brings your music to life.`,
    youtube: `Video Title Options:
1. "I Tried This $5 Hack for 30 Days - You Won't Believe What Happened!"
2. "The Secret Nobody Tells You About [Topic] - Complete Guide 2024"
3. "Watch This Before You [Action] - Everything You Need to Know"

Video Description:
In this video, I reveal the ultimate guide to [topic]. Whether you're a beginner or experienced, these tips will transform your approach completely.

Timestamps:
00:00 - Introduction
02:15 - The Problem Most People Face
05:30 - Solution #1: Quick Wins
10:45 - Advanced Strategies
15:00 - Final Thoughts & Call to Action

Don't forget to subscribe and hit the bell icon for more content like this!

#YouTube #Tutorial #Guide #HowTo`,
    instagram: `Engaging Caption:
"Sometimes the smallest step in the right direction ends up being the biggest step of your life.

Today I'm sharing something that changed everything for me...

[Your story here]

The truth is, we all have the power to transform our lives. It starts with one decision, one moment of courage.

What's ONE thing you're going to start today? Drop it in the comments!

.
.
.
#Motivation #PersonalGrowth #Inspiration #MindsetMatters #SuccessStory #DailyInspiration #GrowthMindset #LifeChanging"`,
    tiktok: `TikTok Caption:
"This changed EVERYTHING for me... (wait for it)"

Hook Ideas:
- "POV: You finally discover the secret to [topic]"
- "Nobody talks about this but..."
- "I wish I knew this sooner"

Script Outline:
[0-3s] Hook: Grab attention with a bold statement
[3-15s] Problem: What struggle does your audience face?
[15-45s] Solution: Show your method/product/tip
[45-55s] Results: Proof it works
[55-60s] CTA: Follow for more, link in bio, comment

Hashtags:
#fyp #viral #lifehack #LearnOnTikTok #tiktoktips`,
    facebook: `Facebook Post:
Big news! We've been working on something special, and we're finally ready to share it with you...

After months of development and listening to YOUR feedback, we're excited to announce [product/feature/news].

Here's what this means for you:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

We couldn't have done this without our amazing community. Thank you for your continued support and trust!

Ready to learn more? Click the link below or drop a comment with any questions - we're here to help!

[Link]

#announcement #newproduct #community`,
    linkedin: `LinkedIn Post:
I learned something powerful this week that I need to share with you.

After 10 years in [industry], I thought I knew everything about [topic]. I was wrong.

Here's what changed my perspective:

[Story or insight]

The 3 key takeaways:

1. [First lesson] - This matters because...
2. [Second lesson] - The impact on your work...
3. [Third lesson] - How to apply it today...

The bottom line? Success isn't about knowing everything. It's about staying curious and being willing to learn.

What's a lesson that recently changed your perspective? I'd love to hear your thoughts below.

---
#Leadership #ProfessionalDevelopment #CareerGrowth #BusinessStrategy`,
    email: `Subject Line Options:
1. "[Name], your exclusive offer expires tonight"
2. "The one thing successful [role] do differently"
3. "Quick question about your [goal]"

Email Body:
Hi [Name],

I noticed you've been exploring [topic/product], and I wanted to reach out personally.

Here's the thing - most people struggle with [problem] because they're missing one crucial element: [solution].

That's exactly why we created [product/offer]. It's designed to help you:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

For the next 48 hours, we're offering [special offer] exclusively for subscribers like you.

[CTA Button: Claim Your Offer]

If you have any questions, just reply to this email - I read every response.

Best,
[Your Name]

P.S. This offer expires [date/time]. Don't miss out!`,
    blog: `SEO Blog Title:
"The Ultimate Guide to [Topic]: Everything You Need to Know in 2024"

Meta Description:
Discover the complete guide to [topic]. Learn proven strategies, expert tips, and actionable steps to [achieve goal]. Updated for 2024.

Blog Outline:

Introduction (150 words)
- Hook the reader with a compelling statistic or question
- Address the pain point this article solves
- Preview what they'll learn

H2: What is [Topic]? (200 words)
- Clear definition
- Why it matters
- Brief history or context

H2: The Benefits of [Topic] (300 words)
- Benefit 1 with example
- Benefit 2 with example
- Benefit 3 with example

H2: How to Get Started with [Topic] (400 words)
- Step 1: [Action]
- Step 2: [Action]
- Step 3: [Action]

H2: Common Mistakes to Avoid (250 words)
- Mistake 1 and solution
- Mistake 2 and solution

H2: Expert Tips for Success (300 words)
- Pro tip 1
- Pro tip 2

Conclusion (150 words)
- Recap key points
- Call to action

Focus Keywords: [primary keyword], [secondary keyword], [long-tail keyword]`,
  },
  ar: {
    shopify: `عنوان المنتج المميز:
"محفظة جلدية يدوية الصنع - جلد إيطالي أصلي | تصميم رفيع ثنائي الطي | حماية RFID | هدية مثالية للرجال"

وصف المنتج:
ارتقِ بأسلوبك اليومي مع محفظتنا الجلدية المصنوعة يدوياً بعناية فائقة. مصنوعة من الجلد الإيطالي الأصلي 100%، تجمع هذه المحفظة الرفيعة بين الأناقة الخالدة والوظائف العصرية.

المميزات الرئيسية:
- جلد إيطالي فاخر يزداد جمالاً مع الوقت
- تقنية حجب RFID للأمان
- 6 فتحات للبطاقات + جيبان مخفيان
- تصميم رفيع يناسب أي جيب
- متوفرة بألوان: البني الكلاسيكي، الأسود، والكونياك

هدية مثالية لأعياد الميلاد والمناسبات الخاصة.

اطلب الآن واستمتع بالفخامة!`,
    etsy: `عنوان المنتج على إتسي:
"كوب سيراميك يدوي الصنع | فنجان قهوة حرفي | هدية فخار فريدة | ديكور مطبخ ريفي"

وصف المنتج:
اكتشف سحر الحرفة اليدوية مع هذا الكوب السيراميكي الجميل. كل قطعة مصنوعة بحب في مشغلي المنزلي، مما يضمن أن لا يوجد كوبان متطابقان تماماً.

ما يميز هذا الكوب:
- مصنوع يدوياً على عجلة الفخار
- طلاء آمن للطعام بألوان ترابية
- آمن للميكروويف وغسالة الصحون
- تصميم مقبض مريح
- سعة مثالية 350 مل

الوسوم: كوب يدوي، فخار حرفي، هدية فريدة، ديكور ريفي`,
    amazon: `عنوان منتج أمازون:
سماعات بلوتوث لاسلكية - إلغاء الضوضاء النشط - بطارية 48 ساعة - مقاومة للماء IPX7 - صوت ستيريو عالي الدقة

النقاط الرئيسية:
- جودة صوت فائقة: استمتع بصوت ستيريو Hi-Fi واضح مع باس عميق
- بطارية تدوم طوال اليوم: حتى 8 ساعات تشغيل متواصل
- إلغاء الضوضاء النشط: تخلص من الإزعاج مع تقنية ANC المتقدمة
- مقاومة للماء والعرق: تصنيف IPX7 مثالي للتمارين الرياضية
- اتصال سلس: بلوتوث 5.3 يضمن اتصالاً مستقراً`,
    youtube: `خيارات عناوين الفيديو:
1. "جربت هذه الطريقة لمدة 30 يوم - النتيجة صادمة!"
2. "السر الذي لا يخبرك به أحد عن [الموضوع] - دليل كامل 2024"
3. "شاهد هذا قبل أن تبدأ [الفعل] - كل ما تحتاج معرفته"

وصف الفيديو:
في هذا الفيديو، أكشف لكم الدليل الكامل عن [الموضوع]. سواء كنت مبتدئاً أو متمرساً، هذه النصائح ستغير طريقتك تماماً.

الفهرس الزمني:
00:00 - المقدمة
02:15 - المشكلة التي يواجهها معظم الناس
05:30 - الحل الأول: نتائج سريعة
10:45 - استراتيجيات متقدمة
15:00 - الخلاصة والدعوة للعمل

لا تنسى الاشتراك وتفعيل الجرس!`,
    instagram: `تعليق جذاب:
"أحياناً تكون أصغر خطوة في الاتجاه الصحيح هي أكبر خطوة في حياتك.

اليوم أشارككم شيئاً غيّر حياتي تماماً...

[قصتك هنا]

الحقيقة أننا جميعاً نملك القوة لتغيير حياتنا. كل شيء يبدأ بقرار واحد، لحظة شجاعة واحدة.

ما هو الشيء الذي ستبدأه اليوم؟ اكتبه في التعليقات!

.
.
.
#تحفيز #تطوير_الذات #إلهام #عقلية_النجاح #قصة_نجاح #إلهام_يومي"`,
    tiktok: `تعليق تيك توك:
"هذا غيّر كل شيء بالنسبة لي... (انتظروا)"

أفكار للخطاف:
- "لو بس كنت أعرف هذا من قبل..."
- "محد يتكلم عن هذا الشي بس..."
- "السر اللي ما يبون تعرفونه"

الهاشتاقات:
#فورين #تيك_توك #نصائح #تعلم #ترند`,
    facebook: `منشور فيسبوك:
أخبار رائعة! كنا نعمل على شيء مميز، وأخيراً نحن مستعدون لمشاركته معكم...

بعد أشهر من التطوير والاستماع لملاحظاتكم، نحن متحمسون للإعلان عن [المنتج/الميزة/الخبر].

إليكم ما يعنيه هذا لكم:
- [الفائدة 1]
- [الفائدة 2]
- [الفائدة 3]

شكراً لدعمكم المستمر وثقتكم!

#إعلان #منتج_جديد #مجتمعنا`,
    linkedin: `منشور لينكد إن:
تعلمت شيئاً قوياً هذا الأسبوع أحتاج أن أشاركه معكم.

بعد 10 سنوات في [المجال]، ظننت أنني أعرف كل شيء عن [الموضوع]. كنت مخطئاً.

إليكم ما غيّر وجهة نظري:

[القصة أو الرؤية]

النقاط الثلاث الرئيسية:

1. [الدرس الأول] - هذا مهم لأن...
2. [الدرس الثاني] - التأثير على عملك...
3. [الدرس الثالث] - كيف تطبقه اليوم...

الخلاصة: النجاح ليس معرفة كل شيء. إنه البقاء فضولياً والاستعداد للتعلم.

#قيادة #تطوير_مهني #نمو_وظيفي`,
    email: `خيارات عنوان البريد:
1. "[الاسم]، عرضك الحصري ينتهي الليلة"
2. "الشيء الوحيد الذي يفعله الناجحون بشكل مختلف"
3. "سؤال سريع عن [هدفك]"

محتوى البريد:
مرحباً [الاسم]،

لاحظت أنك كنت تستكشف [الموضوع/المنتج]، وأردت التواصل معك شخصياً.

إليك الأمر - معظم الناس يعانون من [المشكلة] لأنهم يفتقدون عنصراً حاسماً واحداً: [الحل].

هذا بالضبط لماذا أنشأنا [المنتج/العرض].

لمدة 48 ساعة القادمة، نقدم [عرض خاص] حصرياً للمشتركين مثلك.

مع أطيب التحيات،
[اسمك]`,
    blog: `عنوان المدونة:
"الدليل الشامل لـ [الموضوع]: كل ما تحتاج معرفته في 2024"

الوصف التعريفي:
اكتشف الدليل الكامل لـ [الموضوع]. تعلم استراتيجيات مجربة ونصائح خبراء وخطوات عملية.

مخطط المدونة:

المقدمة (150 كلمة)
- اجذب القارئ بإحصائية مقنعة أو سؤال
- عالج نقطة الألم التي يحلها هذا المقال

العنوان: ما هو [الموضوع]؟ (200 كلمة)
- تعريف واضح
- لماذا هو مهم

العنوان: فوائد [الموضوع] (300 كلمة)
- الفائدة 1 مع مثال
- الفائدة 2 مع مثال

العنوان: كيف تبدأ مع [الموضوع] (400 كلمة)
- الخطوة 1
- الخطوة 2
- الخطوة 3

الخلاصة (150 كلمة)
- ملخص النقاط الرئيسية
- دعوة للعمل`,
  },
}

function CopyPlusApp() {
  const { language, isRTL } = useLanguage()
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Update html dir attribute when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
    document.documentElement.style.fontFamily = isRTL 
      ? "var(--font-ibm-plex-arabic), sans-serif" 
      : "var(--font-geist-sans), sans-serif"
  }, [isRTL, language])

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenGeneratorWithoutPlatform = () => {
    setSelectedPlatform(null)
    setIsModalOpen(true)
  }

  const handleGenerate = async (data: GeneratorData): Promise<string> => {
    // Simulate AI processing with 1.5 second delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Get mock response based on language and platform
    const langKey = data.targetLanguage === "arabic" ? "ar" : "en"
    const platformKey = data.platform
    
    let response = mockResponses[langKey]?.[platformKey] 
      || mockResponses["en"]?.[platformKey]
      || mockResponses["en"]["shopify"]

    // Add the user's details to make it feel more personalized
    if (data.details) {
      response = response.replace("[Topic]", data.details.slice(0, 50))
      response = response.replace("[topic]", data.details.slice(0, 50))
      response = response.replace("[الموضوع]", data.details.slice(0, 50))
    }

    return response
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onGetStarted={handleOpenGeneratorWithoutPlatform} />
      
      <main className="flex-1">
        <HeroSection onStartWriting={handleOpenGeneratorWithoutPlatform} />
        
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handlePlatformSelect}
        />
      </main>

      <Footer />

      {/* Generator Modal */}
      <GeneratorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPlatform={selectedPlatform}
        onGenerate={handleGenerate}
      />
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <CopyPlusApp />
    </LanguageProvider>
  )
}
