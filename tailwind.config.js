/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        steel: 'var(--steel)',
        ice: 'var(--ice)',
        border: 'var(--border)',
        highlight: 'var(--highlight)',
        'dark-background': 'var(--dark-background)',
        'dark-foreground': 'var(--dark-foreground)',
        'dark-steel': 'var(--dark-steel)',
        aura: {
          solar: 'var(--aura-solar)',
          lunar: 'var(--aura-lunar)',
          abyssal: 'var(--aura-abyssal)',
          sidereal: 'var(--aura-sidereal)',
        },
      },
      fontFamily: {
        heading: ['"Cinzel Decorative"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

