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
    <aside className="w-56 h-screen bg-background-image dark:bg-dark-background border-r border-border p-6 flex flex-col gap-6 shadow-inner">
      <div className="flex flex-col items-center gap-3">
        <img
          src="/castes/default.jpg"
          alt="Exalted Essence Logo"
          className="w-32 h-32 object-cover mx-auto rounded"
        />
        <div className="text-2xl font-heading text-steel dark:text-dark-steel tracking-wider leading-tight text-center">
          EXALTED <br />ESSENCE
        </div>
      </div>

      <nav className="flex flex-col gap-3 font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-md transition-colors text-steel font-semibold duration-200
               ${
                   isActive
                      ? 'bg-ice border-l-4 border-steel text-steel font-semibold shadow-inner'
                      : 'hover:bg-ice hover:text-aura-sidereal dark:hover:bg-dark-steel dark:hover:text-dark-foreground text-foreground dark:text-dark-foreground'
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


