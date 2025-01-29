import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        contentDiv: "#2c2638",
        fieldInactive: "#3c364c",
        buttonPrimary: "#6d54b5",
        buttonSecondary: "#9976ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
