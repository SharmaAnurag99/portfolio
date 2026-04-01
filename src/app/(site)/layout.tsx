import '../globals.css';
import Providers from '../providers';
import CustomCursor from '@/components/CustomCursor';
import JsonLd from '@/components/JsonLd';
import RouteTransitionLoader from '@/components/RouteTransitionLoader';

/**
 * Portfolio layout only — `/admin` lives outside this group so Payload admin
 * gets default Payload CSS without Tailwind preflight / site globals overriding it.
 */
export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <JsonLd />
            <CustomCursor />
            <RouteTransitionLoader />
            {children}
        </Providers>
    );
}
