/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0e14",
        panel: "#121826",
        muted: "#1a2234",
        card: "#0f1422",
        text: "#eef2ff",
        sub: "#b7c0d8",
        accent: "#7c5cff",
        accent2: "#00d4ff",
        good: "#1ecb66",
        bad: "#ff5c7c",
        warn: "#ffb020",
      },
    },
  },
  plugins: [],
};
