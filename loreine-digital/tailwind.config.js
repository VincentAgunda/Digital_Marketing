/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Added: Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Your existing font family config
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
        // Your existing custom colors
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
          300: '#67e8f9', // Used for dark accent hover
          400: '#22d3ee', // Used for dark accent
          // Consider adding 500 if needed: '#06b6d4'
        },
        blue: {
          400: '#60a5fa', // Your existing blue
          // You might want to add more shades if needed
        },
        // --- Added: Specific colors for the light theme ---
        'accent-light': '#007AFF',        // Apple Blue for light mode accent
        'accent-light-hover': '#005ECB',  // Darker Apple Blue for hover
        'primary-light': '#002D62',       // Deep Blue for light mode primary text
        'secondary-light': '#334155',     // Slate-700 equivalent for light mode secondary text
        // --- Optional: Added background tints ---
        'alice-blue': '#F0F8FF',          // Very light blue tint for light bg start
        'subtle-gray': '#F9FAFB',         // Very light gray for light section bg (gray-50)
      },
      animation: {
        // Your existing animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Consider adding the news scroll animation here if you prefer CSS
        // 'news-scroll': 'news-scroll 40s linear infinite',
      },
      keyframes: {
        // Your existing keyframes
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        // Keyframes for news scroll
        // 'news-scroll': {
        //    '0%': { transform: 'translateX(0)' },
        //    '100%': { transform: 'translateX(-50%)' }, // Assumes content is duplicated once
        // },
      },
    },
  },
  plugins: [],
};