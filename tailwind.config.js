/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
      themes: [
          {
              mytheme: {
                  primary: "#4CB752",
                  secondary: "#606062",
                  accent: "#e56982",
                  neutral: "#1e1f2e",
                  "base-100": "#f5f5f4",
                  info: "#5e93d4",
                  success: "#259381",
                  warning: "#905e09",
                  error: "#f33f6f",
              },
          },
      ],
  },
  plugins: [require("daisyui")],
};
