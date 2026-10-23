import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0F7B3C",
          "green-hover": "#0c6331",
          accent: "#22C55E",
          cream: "#F8F5F0",
          orange: "#F26A1B",
          "orange-hover": "#d9570e",
          gold: "#F5C518",
          chili: "#D7263D",
          deep: "#1A2E1A",
          muted: "#4A5D4A",
          border: "#E5E0D8",
          success: "#16A34A",
          warning: "#D97706",
        },
      },
      fontFamily: {
        heading: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
        input: "12px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(26, 46, 26, 0.06)",
        "card-hover": "0 10px 25px rgba(26, 46, 26, 0.12)",
        sheet: "0 -4px 30px rgba(26, 46, 26, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
