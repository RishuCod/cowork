/** @type {import('tailwindcss').Config} */
export default {
  content: [
"./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Disable specific core plugins
    preflight: false, // Disable the base styles
  },
}

