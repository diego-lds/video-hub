import { GeistSans } from "geist/font/sans";
import "./globals.css";

import Navbar from "@/components/Navbar";

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
        <main className="min-h-screen mx-32 my-4 flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
