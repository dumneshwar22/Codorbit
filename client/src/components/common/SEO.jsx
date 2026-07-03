import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image = "https://www.codorbit.online/og-image.png",
  url = "https://www.codorbit.online/",
}) => {
  const siteTitle = title
    ? `${title} | CodOrbit `
    : "CodOrbit | AI-Powered Developer Growth Platform";

  const siteDescription =
    description ||
    "Track coding progress across LeetCode, GitHub, Codeforces and CodeChef with AI-powered insights.";

  const siteKeywords =
    keywords ||
    "CodOrbit, DSA Tracker, GitHub Analytics, LeetCode Tracker";

  return (
    <Helmet>
      <title>{siteTitle}</title>

      <meta
        name="description"
        content={siteDescription}
      />

      <meta
        name="keywords"
        content={siteKeywords}
      />

      <link
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}

      <meta
        property="og:title"
        content={siteTitle}
      />

      <meta
        property="og:description"
        content={siteDescription}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:url"
        content={url}
      />

      {/* Twitter */}

      <meta
        name="twitter:title"
        content={siteTitle}
      />

      <meta
        name="twitter:description"
        content={siteDescription}
      />

      <meta
        name="twitter:image"
        content={image}
      />
    </Helmet>
  );
};

export default SEO;