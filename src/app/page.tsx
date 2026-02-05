'use client';


import { useGsapAnimations } from '@/hooks/useGsapAnimations';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageProgress from '@/components/PageProgress';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';

const Home = () => {
    useGsapAnimations();

    return (
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
            <Blog />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
