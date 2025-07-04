import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative p-10 space-y-8 bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground overflow-hidden">
      
      {/* Subtle flare background */}
      <div className="absolute inset-0 bg-gradient-radial from-aura-solar/10 to-transparent rounded-full blur-3xl opacity-20 -z-10" />

      {/* Header with icon */}
      <div className="flex items-center gap-4">
        <Sparkles className="w-10 h-10 text-aura-solar" />
        <h1 className="font-heading text-5xl tracking-widest uppercase bg-gradient-to-r from-steel to-aura-solar text-transparent bg-clip-text">
          Exalted Essence
        </h1>
      </div>

      <p className="text-lg max-w-3xl">
        Welcome to your celestial companion app. Manage characters, browse charms, and explore lore with radiant ease.
      </p>

      <div className="rounded-xl border border-highlight bg-white/80 dark:bg-dark-foreground/10 shadow-md backdrop-blur-md p-6 transition-all">
        <h2 className="text-2xl font-heading text-steel dark:text-dark-steel mb-4 uppercase tracking-wide">
          Start your journey
        </h2>
        <ul className="list-disc list-inside text-base space-y-1">
          <li>
            <a href="/characters" className="text-aura-abyssal font-semibold hover:text-aura-solar">
              View Characters
            </a>
          </li>
          <li>
            <a href="/campaigns" className="text-aura-abyssal hover:text-aura-lunar font-semibold">
              Join a Campaign
            </a>
          </li>
          <li>
            <a href="/wiki" className="text-aura-abyssal font-semibold hover:text-aura-sidereal">
              Browse the Wiki
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

