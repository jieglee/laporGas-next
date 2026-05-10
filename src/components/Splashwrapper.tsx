"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);
    const [renderApp, setRenderApp] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SplashScreen
                isVisible={showSplash}
                onExitComplete={() => setRenderApp(true)}
            />
            <div style={{ opacity: renderApp ? 1 : 0, transition: "opacity 0.3s ease" }}>
                {children}
            </div>
        </>
    );
}