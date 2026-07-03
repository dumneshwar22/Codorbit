import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CodOrbit",
    url: "https://www.codorbit.online",
    description:
      "AI-Powered Developer Growth Platform for coding analytics, DSA tracking, resume analysis and placement preparation.",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.codorbit.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CodOrbit",
    url: "https://www.codorbit.online",
    logo: "https://www.codorbit.online/favicon.png",
    
    // Later on replace with actual real links 
    sameAs: [
      "https://www.linkedin.com/company/codorbit",
      "https://github.com/CodOrbitAI",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CodOrbit",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://www.codorbit.online",
    description:
      "Track coding progress across GitHub, LeetCode, Codeforces and CodeChef. AI-powered analytics, resume analysis and placement readiness.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;