// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../components/ui/theme-provider';

export const metadata = {
  title: 'Exalted Essence Companion',
  description: 'Fan-made character manager and lore browser for Exalted: Essence',
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar />
          <main className="flex-1 p-6 bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
            <div className="flex justify-end mb-4">
              <ThemeToggle />
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

