import Header from '@/components/Header';
import HeroAsymmetric from '@/components/HeroAsymmetric';
import NowStrip from '@/components/NowStrip';
import LogoMarquee from '@/components/LogoMarquee';
import ClientAnimationWrapper from '@/components/ClientAnimationWrapper';
import Manifesto from '@/components/Manifesto';
import StatsCounter from '@/components/StatsCounter';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageProgress from '@/components/PageProgress';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';

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
                <Skills />
                <Experience />
                <Services />
                <Portfolio />
                <Testimonials />
                <Contact />
                <Footer />
            </div>
        </ClientAnimationWrapper>
    );
};

export default Home;
