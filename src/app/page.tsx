"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SplashScreen from "../components/SplashScreen";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import StatsBar from "../components/landing/StatsBar";
import HowItWorks from "../components/landing/HowItWorks";
import LaporanSelesaiSection from "../components/landing/Laporanselesaisection";
import Footer from "../components/landing/Footer";

export default function Home() {
    const [showSplash, setShowSplash] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (session) console.log("[SESSION]", session);
    }, [session]);

    return (
        <>
            <SplashScreen isVisible={showSplash} />
            <main>
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