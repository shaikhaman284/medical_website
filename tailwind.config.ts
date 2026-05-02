import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Outfit', 'sans-serif']
      },
      colors: {
        navy: '#050d1a',
        'navy-mid': '#0a1628',
        teal: '#00d4b4',
        'teal-dim': '#007a6b',
        gold: '#f0c060',
        glass: 'rgba(255,255,255,0.05)'
      },
      boxShadow: {
        glow: '0 20px 80px rgba(0, 212, 180, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
