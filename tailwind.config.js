/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#475569',
      onPrimary: '#f8fafc',
      secondary: '#cbd5e1',
      onSecondary: '#020617',
      body: '#0f172a',
      title: '#020617',
      dark: '#020617',
      light: '#f8fafc',
    },
    fontFamily: {
      railway: ['Raleway', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
