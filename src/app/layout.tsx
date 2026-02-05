import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import CustomCursor from '@/components/CustomCursor';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: {
        default: 'Anurag Sharma | Full Stack & Blockchain Developer',
        template: '%s | Anurag Sharma',
    },
    description: 'Portfolio of Anurag Sharma, a Full Stack & Blockchain Developer specializing in Next.js, Rust, Solidity, and scalable web applications.',
    keywords: ['Full Stack Developer', 'Blockchain Developer', 'Next.js', 'React', 'Rust', 'Solidity', 'Web3', 'Portfolio', 'Anurag Sharma'],
    authors: [{ name: 'Anurag Sharma' }],
    creator: 'Anurag Sharma',
    metadataBase: new URL('https://sharma-portfolio.vercel.app'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sharma-portfolio.vercel.app',
        title: 'Anurag Sharma | Full Stack & Blockchain Developer',
        description: 'Building scalable applications with Next.js and Web3 technologies.',
        siteName: 'Anurag Sharma Portfolio',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Anurag Sharma Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Anurag Sharma | Full Stack & Blockchain Developer',
        description: 'Building scalable applications with Next.js and Web3 technologies.',
        images: ['/og-image.jpg'],
        creator: '@SharmaAnurag99',
    },
    icons: {
        icon: '/favicon.svg',
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <Providers>
                    <JsonLd />
                    <CustomCursor />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
