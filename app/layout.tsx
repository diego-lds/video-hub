import { GeistSans } from "geist/font/sans";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

import "./globals.css";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageContainer from "@/components/PageContainer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Video Hub",
  description: "Plataforma de streaming de vídeos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow mx-8 py-8 sm:mx-16 md:mx-24 lg:mx- xl:mx-64">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
