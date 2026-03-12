import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import ClientAnimationWrapper from '@/components/ClientAnimationWrapper';
import About from '@/components/About';
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
            <div className="min-h-screen bg-background cursor-none md:cursor-none">
                <PageProgress />
                <Header />
                <Hero />
                <LogoMarquee />
                <About />
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
