/*
 * ============================================================================
 *  HOME PAGE — DESIGN VARIANT SWITCHBOARD (experiments branch)
 * ============================================================================
 *  Each section has multiple visual variants. Only ONE is active at a time.
 *  To preview a variant: comment the [ACTIVE] line and uncomment the one you
 *  want to try. Build / `npm run dev` and reload.
 *
 *  Tier 1 NEW — always-on add-ons (no variant switch needed):
 *    • <StatsCounter />     animated numbers section
 *    • <NowStatus />        rotating live status chip in <Footer />
 *
 *  Variant menu:
 *    HERO          → A: Hero (current)            · B: HeroMagnetic
 *    SKILLS        → A: Skills (current grid)     · B: SkillsConstellation
 *    TESTIMONIALS  → A: carousel (default prop)   · B: marquee (variant="marquee")
 *
 *  Coming next (ask anytime to ship): PortfolioStickyScroll, HeroVideoReel,
 *  SectionTransition (clip-path reveal between sections), PortfolioHoverPreview.
 * ============================================================================
 */

// === HERO VARIANTS ===
import Hero from '@/components/Hero'                    // [ACTIVE] A · current static hero
// import Hero from '@/components/HeroMagnetic'         // [B] floating tech badges + magnetic CTA + grid bg

// === SKILLS VARIANTS ===
import Skills from '@/components/Skills'                // [ACTIVE] A · grouped grid
// import Skills from '@/components/SkillsConstellation' // [B] orbital constellation around hub

// === TESTIMONIALS VARIANT (prop-driven) ===
import Testimonials from '@/components/Testimonials'

// === Always-on add-ons ===
import StatsCounter from '@/components/StatsCounter'

// === Static / shared ===
import Header from '@/components/Header'
import LogoMarquee from '@/components/LogoMarquee'
import ClientAnimationWrapper from '@/components/ClientAnimationWrapper'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PageProgress from '@/components/PageProgress'
import Experience from '@/components/Experience'

const Home = () => {
  return (
    <ClientAnimationWrapper>
      <div className="min-h-screen bg-background cursor-none md:cursor-none">
        <PageProgress />
        <Header />
        <Hero />
        <LogoMarquee />
        <About />
        <Skills />
        <StatsCounter />
        <Experience />
        <Services />
        <Portfolio />

        {/* === TESTIMONIALS VARIANTS === */}
        <Testimonials />                          {/* [ACTIVE] A · swipeable carousel */}
        {/* <Testimonials variant="marquee" /> */}{/* [B] dual-row infinite marquee   */}

        <Contact />
        <Footer />
      </div>
    </ClientAnimationWrapper>
  )
}

export default Home
