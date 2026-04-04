'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clapperboard,
  Clock,
  Cpu,
  ExternalLink,
  Globe,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Play,
  Sparkles,
  Star,
  Tv,
  Users,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined
  children: React.ReactNode
  className?: string
  locale: string
}) {
  if (linkData) {
    const href = locale === 'en' ? linkData.url : `/${locale}${linkData.url}`
    return (
      <Link
        href={href}
        className={`${className || ''} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  moduleLinkMap: ModuleLinkMap
  locale: string
}

export default function HomePageClient({ latestArticles, moduleLinkMap, locale }: HomePageClientProps) {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arenazeromovie.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "Arena Zero Movie Wiki",
        description: "Arena Zero Movie Wiki covering Episode 1, trailer, plot, ending explained, characters, reviews, AI production, and episode updates.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Arena Zero - AI-Native Sci-Fi Action Series",
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: "Arena Zero Movie Wiki",
        alternateName: "Arena Zero Wiki",
        url: siteUrl,
        description: "Arena Zero Movie Wiki - resource hub for Episode 1, trailer, plot, ending explained, characters, reviews, AI production, and episode updates",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Arena Zero Movie Wiki - AI-Native Sci-Fi Action Series",
        },
        sameAs: [
          'https://higgsfield.ai/original-series',
          'https://www.youtube.com/@HiggsfieldAI',
          'https://www.instagram.com/higgsfield.ai/',
          'https://www.reddit.com/r/aivideo/',
        ],
      },
    ],
  }

  // FAQ accordion states
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null)
  const [endingExpanded, setEndingExpanded] = useState<number | null>(null)
  const [whatIsItExpanded, setWhatIsItExpanded] = useState<number | null>(null)

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('arena-zero-watch-online')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://higgsfield.ai/original-series/arena-zero/episode-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="qqcH-1Rk-ow"
              title="Arena Zero Episode 1 - World's First AI Action Series"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionIds = [
                'arena-zero-watch-online', 'arena-zero-plot-summary', 'arena-zero-episode-guide', 'arena-zero-episode-2-release',
                'arena-zero-ending-explained', 'arena-zero-trailer', 'arena-zero-review', 'arena-zero-what-is-it',
                'arena-zero-ai-movie', 'arena-zero-making-of', 'arena-zero-characters', 'arena-zero-runtime',
                'arena-zero-higgsfield-guide', 'arena-zero-viewer-reactions', 'arena-zero-similar-series', 'arena-zero-news-updates'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Arena Zero Watch Online */}
      <section id="arena-zero-watch-online" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Watch</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroWatchOnline']} locale={locale}>
                {t.modules.arenaZeroWatchOnline.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroWatchOnline.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.modules.arenaZeroWatchOnline.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">{item.status}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.platform}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{item.note}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-3">
                    <span className="text-xs text-[hsl(var(--nav-theme-light))] font-medium">{item.price}</span>
                    <span className="text-xs text-muted-foreground">{item.runtime}</span>
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
                  >
                    Watch <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Arena Zero Plot Summary */}
      <section id="arena-zero-plot-summary" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Story</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroPlotSummary']} locale={locale}>
                {t.modules.arenaZeroPlotSummary.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroPlotSummary.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4">
            {t.modules.arenaZeroPlotSummary.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-sm font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.heading}</h3>
                  <p className="text-muted-foreground text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Arena Zero Episode Guide */}
      <section id="arena-zero-episode-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Episodes</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroEpisodeGuide']} locale={locale}>
                {t.modules.arenaZeroEpisodeGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroEpisodeGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.arenaZeroEpisodeGuide.episodes.map((ep: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    <span className="font-bold text-sm">{ep.episode}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${ep.status === 'Available now' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]'}` }>{ep.status}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{ep.note}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{ep.views}</span>
                  <a
                    href={ep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Arena Zero Episode 2 Release */}
      <section id="arena-zero-episode-2-release" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Release</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroEpisode2Release']} locale={locale}>
                {t.modules.arenaZeroEpisode2Release.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroEpisode2Release.intro}
            </p>
          </div>

          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-8">
            {t.modules.arenaZeroEpisode2Release.timeline.map((item: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.status}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-bold mb-1">{item.event}</h3>
                  <p className="text-muted-foreground text-sm">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 5: Arena Zero Ending Explained */}
      <section id="arena-zero-ending-explained" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroEndingExplained.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroEndingExplained']} locale={locale}>
                {t.modules.arenaZeroEndingExplained.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroEndingExplained.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroEndingExplained.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-2">
            {t.modules.arenaZeroEndingExplained.faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setEndingExpanded(endingExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                    <span className="font-semibold">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${endingExpanded === index ? 'rotate-180' : ''}`} />
                </button>
                {endingExpanded === index && (
                  <div className="px-5 pb-5 pl-12 text-muted-foreground text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Arena Zero Trailer */}
      <section id="arena-zero-trailer" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroTrailer.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroTrailer']} locale={locale}>
                {t.modules.arenaZeroTrailer.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroTrailer.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroTrailer.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.modules.arenaZeroTrailer.videos.map((video: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors group flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    <Play className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{video.meta}</span>
                </div>
                <h3 className="font-bold mb-2 group-hover:text-[hsl(var(--nav-theme-light))] transition-colors">{video.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{video.description}</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-4 text-sm font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
                >
                  {video.label} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 7: Arena Zero Review */}
      <section id="arena-zero-review" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroReview.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroReview']} locale={locale}>
                {t.modules.arenaZeroReview.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroReview.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroReview.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.arenaZeroReview.quotes.map((quote: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Star className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    quote.tone === 'Positive' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                    quote.tone === 'Excited' ? 'bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]' :
                    'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                  }`}>{quote.tone}</span>
                </div>
                <p className="text-sm mb-4 italic flex-1">"{quote.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[hsl(var(--nav-theme-light))]">{quote.author}</p>
                    <p className="text-xs text-muted-foreground">{quote.source}</p>
                  </div>
                  {quote.href && (
                    <a href={quote.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Arena Zero What Is It */}
      <section id="arena-zero-what-is-it" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroWhatIsIt.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroWhatIsIt']} locale={locale}>
                {t.modules.arenaZeroWhatIsIt.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroWhatIsIt.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroWhatIsIt.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-2">
            {t.modules.arenaZeroWhatIsIt.faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setWhatIsItExpanded(whatIsItExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                    <span className="font-semibold">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${whatIsItExpanded === index ? 'rotate-180' : ''}`} />
                </button>
                {whatIsItExpanded === index && (
                  <div className="px-5 pb-5 pl-12 text-muted-foreground text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 9: Arena Zero AI Movie Explained */}
      <section id="arena-zero-ai-movie" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroAiMovie.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroAiMovie']} locale={locale}>
                {t.modules.arenaZeroAiMovie.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroAiMovie.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroAiMovie.intro}
            </p>
          </div>

          <div className="scroll-reveal overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-[hsl(var(--nav-theme-light))]">Aspect</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Traditional Film</th>
                  <th className="text-left p-4 font-semibold text-[hsl(var(--nav-theme-light))]">Arena Zero (AI-Native)</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.arenaZeroAiMovie.comparisons.map((row: any, index: number) => (
                  <tr key={index} className="border-b border-border hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{row.aspect}</td>
                    <td className="p-4 text-muted-foreground">{row.traditional}</td>
                    <td className="p-4 text-[hsl(var(--nav-theme-light))]">{row.aiNative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Module 10: Arena Zero Making Of */}
      <section id="arena-zero-making-of" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroMakingOf.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroMakingOf']} locale={locale}>
                {t.modules.arenaZeroMakingOf.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroMakingOf.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroMakingOf.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4">
            {t.modules.arenaZeroMakingOf.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 11: Arena Zero Characters */}
      <section id="arena-zero-characters" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroCharacters.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroCharacters']} locale={locale}>
                {t.modules.arenaZeroCharacters.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroCharacters.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroCharacters.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.arenaZeroCharacters.characters.map((character: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div>
                    <h3 className="font-bold">{character.name}</h3>
                    <span className="text-xs text-[hsl(var(--nav-theme-light))]">{character.role}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{character.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: Arena Zero Runtime */}
      <section id="arena-zero-runtime" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">{t.modules.arenaZeroRuntime.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroRuntime']} locale={locale}>
                {t.modules.arenaZeroRuntime.title}
              </LinkedTitle>
            </h2>
            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto mb-4">
              {t.modules.arenaZeroRuntime.subtitle}
            </p>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {t.modules.arenaZeroRuntime.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.arenaZeroRuntime.info.map((row: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <Clock className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{row.label}</p>
                  <p className="font-semibold">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 13: Arena Zero Higgsfield Guide */}
      <section id="arena-zero-higgsfield-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroHiggsfieldGuide']} locale={locale}>
                {t.modules.arenaZeroHiggsfieldGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroHiggsfieldGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.modules.arenaZeroHiggsfieldGuide.series.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.status}</span>
                </div>
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 14: Arena Zero Viewer Reactions */}
      <section id="arena-zero-viewer-reactions" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Community</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroViewerReactions']} locale={locale}>
                {t.modules.arenaZeroViewerReactions.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroViewerReactions.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.arenaZeroViewerReactions.quotes.map((quote: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <MessageCircle className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-3" />
                <p className="text-sm mb-4 italic">"{quote.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[hsl(var(--nav-theme-light))]">{quote.author}</span>
                  <span className="text-xs text-muted-foreground">{quote.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 15: Arena Zero Similar AI Series */}
      <section id="arena-zero-similar-series" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">Discover More</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroSimilarSeries']} locale={locale}>
                {t.modules.arenaZeroSimilarSeries.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroSimilarSeries.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.modules.arenaZeroSimilarSeries.series.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.status}</span>
                </div>
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">{item.platform}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: Arena Zero News and Updates */}
      <section id="arena-zero-news-updates" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-medium text-[hsl(var(--nav-theme-light))] uppercase tracking-wide mb-3">News</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['arenaZeroNewsUpdates']} locale={locale}>
                {t.modules.arenaZeroNewsUpdates.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.arenaZeroNewsUpdates.intro}
            </p>
          </div>

          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-8">
            {t.modules.arenaZeroNewsUpdates.events.map((event: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    <span className="text-xs text-muted-foreground">{event.date}</span>
                  </div>
                  <h3 className="font-bold mb-1">{event.event}</h3>
                  <p className="text-muted-foreground text-sm">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder height="h-96" />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder height="h-64" />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>
    </div>
  )
}
