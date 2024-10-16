import { GeistSans } from "geist/font/sans";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={nunito.className}>
      <body className="bg-background text-foreground">
        <div>
          <Navbar />
          <main className="max-w-5xl mx-auto ">{children}</main>

          <footer className="w-full h-30  border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs bg-emerald-600">
            <p>
              <a
                className="text-white hover:underline"
                href="https://github.com/diego-lds"
              >
                Criado por Diego Lopes &copy; {new Date().getFullYear()}
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
