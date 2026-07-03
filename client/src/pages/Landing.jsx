import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";
import LoggedInNavbar from "../components/landing/LoggedInNavbar";
import SEO from "../components/common/SEO.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LandingPageSkeleton from "../components/skeletons/LandingPageSkeleton";
import StructuredData from "../components/common/StructuredData.jsx";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <SEO
          title="AI-Powered Developer Growth Platform"
          description="Track your coding journey across LeetCode, GitHub, Codeforces and CodeChef. AI-powered analytics, DSA tracking, resume analysis and placement preparation."
          keywords="developer growth platform, leetcode tracker, github analytics, dsa tracker, coding dashboard, AI resume analyzer, competitive programming tracker, codorbit"
          canonical="/"
          noIndex={false}
        />

        <StructuredData />
        <LandingPageSkeleton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SEO
        title="AI-Powered Developer Growth Platform"
        description="Track your coding journey across LeetCode, GitHub, Codeforces and CodeChef. AI-powered analytics, DSA tracking, resume analysis and placement preparation."
        keywords="developer growth platform, leetcode tracker, github analytics, dsa tracker, coding dashboard, AI resume analyzer, competitive programming tracker, codorbit"
        canonical="/"
        noIndex={false}
      />

      <StructuredData />
      {user ? <LoggedInNavbar /> : <LandingNavbar />}

      <HeroSection />
      <FeaturesSection />
      <DashboardShowcase />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
