// 60-second ISR safety net — Payload `afterChange` hooks call revalidatePath('/')
// for instant freshness; this is the fallback if a hook fails to fire.
export const revalidate = 60;

import Header from '@/components/Header';
import HeroAsymmetric from '@/components/HeroAsymmetric';
import NowStrip from '@/components/NowStrip';
import LogoMarquee from '@/components/LogoMarquee';
import ClientAnimationWrapper from '@/components/ClientAnimationWrapper';
import Manifesto from '@/components/Manifesto';
import StatsCounter from '@/components/StatsCounter';
import SkillsOS from '@/components/SkillsOS';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import ProjectsReel from '@/components/ProjectsReel';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageProgress from '@/components/PageProgress';

/**
 * Homepage narrative — high conversion, low visual fatigue:
 * Hook → motion/trust → logos → SHOW WORK (spotlight) → proof numbers →
 * social voices → capabilities → belief → timeline → offerings →
 * warm CTA → grounded footer.
 *
 * Section rhythm: mostly default + subtle `section-alt` stripes; one
 * `section-spotlight` for the reel; `section-cta` before footer only.
 * Full tokens adapt in `html.dark` (see globals.css).
 */
const Home = () => {
    return (
        <ClientAnimationWrapper>
            <div className="min-h-[100dvh] bg-background">
                <PageProgress />
                <Header />

                <div className="section-default">
                    <HeroAsymmetric />
                </div>

                <div className="section-alt">
                    <NowStrip />
                </div>

                <div className="section-default">
                    <LogoMarquee />
                </div>

                <div id="work" className="section-spotlight">
                    <ProjectsReel />
                </div>

                <div className="section-alt">
                    <StatsCounter />
                </div>

                <div className="section-default">
                    <Testimonials />
                </div>

                <div className="section-alt">
                    <SkillsOS />
                </div>

                <div className="section-default">
                    <Manifesto />
                </div>

                <div className="section-alt">
                    <Experience />
                </div>

                <div className="section-default">
                    <Services />
                </div>

                <div id="contact" className="section-cta">
                    <Contact />
                </div>

                <div className="section-spotlight">
                    <Footer />
                </div>
            </div>
        </ClientAnimationWrapper>
    );
};

export default Home;
