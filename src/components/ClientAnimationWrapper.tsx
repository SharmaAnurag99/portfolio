'use client';

import { useGsapAnimations } from '@/hooks/useGsapAnimations';

export default function ClientAnimationWrapper({ children }: { children: React.ReactNode }) {
    useGsapAnimations();
    // The wrapper just runs the hook and renders children
    return <>{children}</>;
}
