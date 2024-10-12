import { GeistSans } from "geist/font/sans";
import "./globals.css";

import Navbar from "@/components/Navbar";
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
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Navbar />
        <PageContainer>
          <main className="min-h-screen mx-32 my-4 flex flex-col items-center">
            {children}
          </main>
        </PageContainer>
        <Footer />
      </body>
    </html>
  );
}
