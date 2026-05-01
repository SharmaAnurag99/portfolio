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

const Home = () => {
    return (
        <ClientAnimationWrapper>
            <div className="min-h-[100dvh] bg-background">
                <PageProgress />
                <Header />
                <HeroAsymmetric />
                <NowStrip />
                <LogoMarquee />
                <Manifesto />
                <StatsCounter />
                <SkillsOS />
                <Experience />
                <Services />
                <ProjectsReel />
                <Testimonials />
                <Contact />
                <Footer />
            </div>
        </ClientAnimationWrapper>
    );
};

export default Home;
