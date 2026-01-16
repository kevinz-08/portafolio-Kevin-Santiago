/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FD6F00',
          dark: '#984300',
          light: '#CA5900',
        },
        text: {
          primary: '#FEFEFE',
          secondary: '#959595',
          tertiary: '#707070',
          dark: '#000000',
        },
        bg: {
          primary: '#121212',
          secondary: '#1E1E1E',
          light: '#f5f5f5',
          card: '#1E1E1E',
          cardLight: '#ffffff',
        },
        border: {
          DEFAULT: '#76767610',
          dark: '#575757',
        }
      },
      fontFamily: {
        'lato-black': ['Lato-Black', 'sans-serif'],
        'lato-bold': ['Lato-Bold', 'sans-serif'],
        'lato-extrabold': ['Lato-ExtraBold', 'sans-serif'],
        'lato-medium': ['Lato-Medium', 'sans-serif'],
        'lato-semibold': ['Lato-SemiBold', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #984300, #fd6f00, #ca5900)',
        'gradient-text': 'linear-gradient(#984300, #fd6f00, #ca5900)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 0.6s ease forwards',
        'slide': 'autoRun 10s linear infinite',
      },
      keyframes: {
        autoRun: {
          '0%': { left: '100%' },
          '100%': { left: 'calc(var(--width) * -1)' },
        },
      }
    },
  },
  plugins: [],
}
