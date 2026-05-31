import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        bg: "#0a0a0a",
        surface: "#111111",
        cream: "#e8e4dc",
        muted: "#6b6860",
        accent: "#c8b89a",
      },
    },
  },
  plugins: [],
};
export default config;
