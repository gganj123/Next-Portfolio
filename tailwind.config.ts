/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: '#7A4EAB',
        indigo: '#4332CF',
        blue: '#2F8FED',
        green: '#4DCF42',
        yellow: '#FAEB33',
        orange: '#F19031',
        red: '#F2293A',
      },
    },
  },
  plugins: [],
};
