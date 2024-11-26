import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        contentFade: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        cardEntrance: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)',
            filter: 'blur(10px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)',
            filter: 'blur(0)'
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        slideDown: 'slideDown 0.5s ease-out forwards',
        contentFade: 'contentFade 0.3s ease-out forwards',
        cardEntrance: 'cardEntrance 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}

export default config;
