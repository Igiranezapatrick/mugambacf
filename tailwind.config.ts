import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#24130f",
        crema: "#f7efe1",
        roast: "#6f3722",
        brass: "#c99a4a",
        sage: "#6f7f63"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(36, 19, 15, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
