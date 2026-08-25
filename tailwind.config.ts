import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        canvas: {
          light: "#f5f5f7",
          dark: "#000000",
        },
        surface: {
          light: "rgba(255,255,255,0.72)",
          dark: "rgba(28,28,30,0.62)",
        },
        accent: {
          blue: "#0a84ff",
          indigo: "#5e5ce6",
          teal: "#30d5c8",
          pink: "#ff375f",
          orange: "#ff9f0a",
          green: "#30d158",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 8px 30px rgba(0,0,0,0.06)",
        "soft-dark": "0 1px 2px rgba(0,0,0,0.3), 0 8px 30px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -15px rgba(10,132,255,0.35)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.035) 1px, transparent 0)",
        "aurora":
          "radial-gradient(60% 50% at 20% 15%, rgba(10,132,255,0.25) 0%, transparent 60%), radial-gradient(50% 45% at 85% 10%, rgba(94,92,230,0.22) 0%, transparent 60%), radial-gradient(55% 45% at 50% 100%, rgba(48,213,200,0.18) 0%, transparent 60%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease forwards",
        "toast-in": "toast-in 0.25s cubic-bezier(0.16,1,0.3,1) forwards",
        "pop": "pop 0.35s ease",
        "float": "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
