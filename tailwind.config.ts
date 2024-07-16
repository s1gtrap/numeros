import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      celeste: "rgb(var(--celeste))",
      cerulean: "rgb(var(--cerulean))",
      green: "rgb(var(--green))",
      "green/50": "rgba(var(--green), 0.2)",
      "indigo-dye": "rgb(var(--indigodye))",
      "non-photo-blue": "rgb(var(--nonphotoblue))",
      red: "rgb(var(--red))",
      "red/50": "rgba(var(--red), 0.2)",
      "rose-red": "rgb(var(--rosered))",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
