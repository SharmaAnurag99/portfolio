const JsonLd = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Anurag Sharma',
        url: 'https://sharma-portfolio.vercel.app',
        jobTitle: 'Full Stack & Blockchain Developer',
        sameAs: [
            'https://github.com/SharmaAnurag99',
            'https://linkedin.com/in/SharmaAnurag99', // Assuming handle based on repo
            'https://twitter.com/SharmaAnurag99',
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'QodeML Labs',
        },
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Shaheed Sukhdev College of Business Studies'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default JsonLd;
