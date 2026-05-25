import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LaporGas",
  description: "Platform Pengaduan Masyarakat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className={`${poppins.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
          <Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      fontSize: "0.82rem",
      fontWeight: 500,
      borderRadius: "10px",
      border: "0.5px solid #f0e6dc",
    },
    success: {
      iconTheme: { primary: "#E8541C", secondary: "white" },
    },
  }}
/>
      </body>
    </html>
  );
}