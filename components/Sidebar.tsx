'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/characters', label: 'Characters' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/wiki', label: 'Wiki' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-screen bg-background dark:bg-dark-background border-r border-border p-6 flex flex-col gap-6 shadow-inner">
      <div className="text-2xl font-heading text-steel dark:text-dark-steel tracking-wider leading-tight">
        EXALTED<br />ESSENCE
      </div>

      <nav className="flex flex-col gap-3 text-foreground dark:text-dark-foreground font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-md transition-all ${
                isActive
                  ? 'bg-ice border-l-4 border-steel text-steel font-semibold shadow-inner'
                  : 'hover:bg-steel hover:text-steel dark:hover:text-dark-steel'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

