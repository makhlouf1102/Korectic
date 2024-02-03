import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    colors: {
      'text': {
        50: '#eae9fc',
        100: '#d6d2f9',
        200: '#ada5f3',
        300: '#8478ed',
        400: '#5b4be7',
        500: '#321fe0',
        600: '#2818b4',
        700: '#1e1287',
        800: '#140c5a',
        900: '#0a062d',
        950: '#050316',
      },
      'background': {
        50: '#ebebfa',
        100: '#d6d6f5',
        200: '#adadeb',
        300: '#8585e0',
        400: '#5c5cd6',
        500: '#3333cc',
        600: '#2929a3',
        700: '#1f1f7a',
        800: '#141452',
        900: '#0a0a29',
        950: '#050514',
      },
      'primary': {
        50: '#e7feef',
        100: '#cefddf',
        200: '#9efabe',
        300: '#6df89e',
        400: '#3cf67d',
        500: '#0bf45d',
        600: '#09c34a',
        700: '#079238',
        800: '#056125',
        900: '#023113',
        950: '#011809',
      },
      'secondary': {
        50: '#e6fef1',
        100: '#cdfee2',
        200: '#9bfdc5',
        300: '#69fca9',
        400: '#37fb8c',
        500: '#05fa6f',
        600: '#04c859',
        700: '#039643',
        800: '#02642c',
        900: '#013216',
        950: '#01190b',
      },
      'accent': {
        50: '#e6fffa',
        100: '#cdfef5',
        200: '#9bfdeb',
        300: '#68fde1',
        400: '#36fcd8',
        500: '#04fbce',
        600: '#03c9a5',
        700: '#02977b',
        800: '#026452',
        900: '#013229',
        950: '#001915',
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config