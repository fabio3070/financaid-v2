import './globals.css';
import type { Metadata } from "next";
import { SessionProvider } from 'next-auth/react';
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import AppNavBar from '@/components/navigation/AppNavBar';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';

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
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <div>
            <SessionProvider session={session}>
              {session && <AppNavBar />}
              {children}
            </SessionProvider>
            <Toaster />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
