import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arenazeromovie.wiki'
  const path = '/about'

  return {
    title: 'About Arena Zero Movie Wiki - Your Ultimate Series Resource',
    description: 'Learn about Arena Zero Movie Wiki, a community-driven resource hub providing comprehensive episode guides, ending explanations, character info, and trailer breakdowns for the Arena Zero AI series.',
    keywords: [
      'about Arena Zero Movie Wiki',
      'Arena Zero community',
      'AI series wiki',
      'series resource hub',
      'Arena Zero Movie Wiki team',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Arena Zero Movie Wiki',
      title: 'About Arena Zero Movie Wiki',
      description: 'Learn about our mission to provide the best Arena Zero series resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'Arena Zero Movie Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Arena Zero Movie Wiki',
      description: 'Learn about our mission to provide the best Arena Zero series resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Arena Zero Movie Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Arena Zero
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Arena Zero Movie Wiki</h2>
            <p>
              Arena Zero Movie Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping viewers
              explore the AI series &quot;Arena Zero&quot; by Higgsfield. We are a community-driven platform that provides comprehensive episode
              guides, ending explanations, character info, trailer breakdowns, and AI production insights.
            </p>
            <p>
              Whether you&apos;re a new viewer just discovering the series or a dedicated fan looking for deeper insights,
              Arena Zero Movie Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Arena Zero viewers with accurate, up-to-date information
              and comprehensive resources</strong> that help them enjoy the series. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest episode releases, trailers, and series news</li>
              <li><strong>Build useful resources:</strong> Develop episode guides, ending explainers, and character profiles that help viewers understand the series</li>
              <li><strong>Foster community:</strong> Create a welcoming space where fans can learn, share insights, and grow together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for viewers of all backgrounds</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Arena Zero Movie Wiki as the <strong>go-to destination</strong> for every Arena Zero viewer seeking
              to understand the series more deeply. We want to be the resource that fans trust and rely on, whether they need
              episode guides, want to explore character backstories, or are looking for AI production insights.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Episode Guides</h3>
              <p className="text-slate-300">
                Comprehensive episode guides, plot summaries, and ending explained articles to help you understand the story.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Characters</h3>
              <p className="text-slate-300">
                Detailed character profiles, cast info, and role breakdowns for all Arena Zero characters.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailers</h3>
              <p className="text-slate-300">
                Complete trailer analysis, key scene breakdowns, and official video collection.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">⭐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Reviews</h3>
              <p className="text-slate-300">
                In-depth reviews, audience reactions, and critic perspectives on Arena Zero.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Production</h3>
              <p className="text-slate-300">
                Insights into AI film production, tools used, and the creative process behind Arena Zero.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages including English, Spanish, Portuguese,
                and French.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Arena Zero Movie Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from fans of all backgrounds. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Fan feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New insights, theories, and analysis shared by fans</li>
              <li><strong>Series updates:</strong> We monitor official episode releases and adjust our content accordingly</li>
              <li><strong>AI industry trends:</strong> We track AI film production developments and update guides based on new information</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you&apos;ve discovered a new theory, found a hidden detail in an episode,
              or have suggestions for new guides, we&apos;d love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Arena Zero Movie Wiki is maintained by a dedicated team of passionate fans and developers who love
              Arena Zero as much as you do. We&apos;re fans first, constantly analyzing episodes, exploring the AI production
              process, and staying updated with the latest series news.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Series analysis:</strong> Deep understanding of Arena Zero narrative, characters, and AI production</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and analysis</li>
              <li><strong>Community management:</strong> Listening to fan feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project dedicated to covering the world&apos;s first AI-native sci-fi action series.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Arena Zero Movie Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Higgsfield AI or any official entities.
            </p>
            <p>
              All series content, trademarks, characters, and assets are the property of their respective owners.
              We use series-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Arena Zero Movie Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@arenazeromovie.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@arenazeromovie.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@arenazeromovie.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@arenazeromovie.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@arenazeromovie.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@arenazeromovie.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@arenazeromovie.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@arenazeromovie.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest episode guides, trailers, and Arena Zero news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
