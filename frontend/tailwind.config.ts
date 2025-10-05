import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        overlay: "var(--overlay)",
        bg: "var(--bg)",
        bw: "var(--bw)",
        blank: "var(--blank)",
        text: "var(--text)",
        mtext: "var(--mtext)",
        border: "var(--border)",
        ring: "var(--ring)",
        ringOffset: "var(--ring-offset)",
        surfaceDark: "var(--surface-dark)",
        surfaceDarkText: "var(--surface-dark-text)",
        muted: "var(--muted)",

        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "var(--border-radius)",
      },
      boxShadow: {
        shadow: "var(--shadow)",
        soft: "0 10px 30px -12px rgba(2,6,23,0.2)",
      },
      translate: {
        boxShadowX: "var(--box-shadow-x)",
        boxShadowY: "var(--box-shadow-y)",
        reverseBoxShadowX: "var(--reverse-box-shadow-x)",
        reverseBoxShadowY: "var(--reverse-box-shadow-y)",
      },
      fontWeight: {
        base: "var(--base-font-weight)",
        heading: "var(--heading-font-weight)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
