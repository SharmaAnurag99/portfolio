'use client';

import PageProgress from '@/components/PageProgress';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useGsapAnimations } from '@/hooks/useGsapAnimations';

export default function ContactPage() {
    useGsapAnimations();

    return (
        <div className="min-h-screen bg-background cursor-none md:cursor-none">
            <PageProgress />
            <Header />
            <main className="pt-20">
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
