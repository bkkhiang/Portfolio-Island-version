/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        // Light Theme (Cyan & Royal Blue)
        light: {
          primary: '#0ea5e9', // Sky blue
          secondary: '#7c3aed', // Purple
          accent: '#06b6d4', // Cyan
        },
        // Dark Theme (Navy & Gold)
        dark: {
          primary: '#1e3a8a', // Navy blue
          secondary: '#fbbf24', // Gold
          accent: '#3b82f6', // Royal blue
        },
        // Professional Theme (Slate & Emerald)
        professional: {
          primary: '#059669', // Emerald green
          secondary: '#1e293b', // Slate dark
          accent: '#0d9488', // Teal
        },
      },
    },
  },
  plugins: [],
}