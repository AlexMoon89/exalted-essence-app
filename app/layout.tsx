import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import { ThemeProvider } from '../components/ui/theme-provider';
import { SupabaseProvider } from '@/lib/supabase-provider';
import TopBar from '@/components/TopBar';

export const metadata = {
  title: "Exalted Essence Companion",
  description: "Fan-made character manager and lore browser for Exalted: Essence",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen bg-background text-foreground font-body">
        <SupabaseProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar />
            <main className="flex-1 p-6 bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
              <TopBar />
              {children}
            </main>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
