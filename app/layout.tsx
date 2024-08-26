import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Video Hub",
  description: "Plataforma de streaming de vídeos",
};

const canInitSupabaseClient = () => {
  try {
    createClient();
    return true;
  } catch (e) {
    return false;
  }
};

const isSupabaseConnected = canInitSupabaseClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <nav className="w-full flex justify-center  border-b border-b-foreground/10 h-16 ">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <p className="text-foreground/60">Logo</p>
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
