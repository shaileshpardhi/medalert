import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        accent: 'linear-gradient(135deg, #3B82F6 0%, #A78BFA 100%)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
