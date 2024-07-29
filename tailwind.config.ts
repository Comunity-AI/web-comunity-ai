import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "morado": "#8430C9",
        "second-morado": "#6B21A8",
        "verde": "#059669",
        "verde-claro": "#34d399",
        "fondo": "#0f172A",
        "blanco": "#F5F5F5"
      },
      fontFamily: {
        notojp: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
