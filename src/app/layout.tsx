import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
    title: 'Lovable App',
    description: 'Lovable Generated Project',
    authors: [{ name: 'Lovable' }],
    openGraph: {
        title: 'Lovable App',
        description: 'Lovable Generated Project',
        type: 'website',
        images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@Lovable',
        images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
    },
};

import CustomCursor from '@/components/CustomCursor';

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
                    <CustomCursor />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
