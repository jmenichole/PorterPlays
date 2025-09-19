/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'oxanium': ['Oxanium', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#1B1D29',
        'brand-highlight': '#5CFFC1',
        'brand-primary': '#5956FF',
        'brand-light': '#FFFFFF',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 50%',
        'pos-100': '100% 50%',
      },
      animation: {
        'float-in': 'floatIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        glitch: 'glitch 0.3s ease-in-out infinite',
      },
      keyframes: {
        floatIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: 'inset 0 0 5px rgba(92, 255, 193, 0.2), 0 0 0px rgba(92, 255, 193, 0)',
          },
          '50%': {
            boxShadow: 'inset 0 0 10px rgba(92, 255, 193, 0.5), 0 0 10px rgba(92, 255, 193, 0.3)',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      }
    },
  },
  plugins: [],
}