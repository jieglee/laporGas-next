import HeroSection from "@/components/user/Home/HeroSection";
import TrendingSection from "@/components/user/Home/Trendingsection";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/user/Home/Ctasection";
import Footer from "@/components/user/Home/Footer"
export default function UserHomePage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <HeroSection />
      <TrendingSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  );
}