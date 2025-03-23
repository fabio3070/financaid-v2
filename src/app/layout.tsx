import './globals.css';
import type { Metadata } from "next";
import { SessionProvider } from 'next-auth/react';
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { palette } from '@/lib/palette';

export const metadata: Metadata = {
  title: "Financaid",
  description: "Finance all-in-one app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body style={{ backgroundColor: palette.background.dark}}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
