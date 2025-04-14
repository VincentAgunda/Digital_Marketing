/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      },
      colors: {
        gray: {
          800: '#1e1e1e',
          900: '#121212',
          950: '#0a0a0a',
        },
        pink: {
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
        },
        blue: {
          400: '#60a5fa',
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
