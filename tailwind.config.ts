import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7fb",
          100: "#e7ebf4",
          200: "#c9d2e2",
          300: "#a5b5cf",
          400: "#7d92b3",
          500: "#5d7396",
          600: "#465b7c",
          700: "#334561",
          800: "#20314a",
          900: "#11233b"
        },
        mist: "#f6f4ef",
        moss: "#6a8f79",
        amber: "#c38a32",
        rose: "#b86161",
        border: "#d9dfeb"
      },
      boxShadow: {
        soft: "0 20px 45px rgba(17, 35, 59, 0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
