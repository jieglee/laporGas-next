"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import StatsBar from "../components/landing/StatsBar";
import HowItWorks from "../components/landing/HowItWorks";
import { LaporanSelesaiSection } from "../components/landing/Laporanselesaisection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
    const [showSplash, setShowSplash] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SplashScreen
                isVisible={showSplash}
                onExitComplete={() => setShowContent(true)}
            />
            <main style={{ opacity: showContent ? 1 : 0, transition: "opacity 0.35s ease" }}>
                <Navbar />
                <HeroSection />
                <StatsBar />
                <HowItWorks />
                <LaporanSelesaiSection />
                <Footer />
            </main>
        </>
    );
}