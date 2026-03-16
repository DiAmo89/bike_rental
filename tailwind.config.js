/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1070px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "hero-mobile": "url('/assets/mobile-bg.png')",
        "hero-tablet": "url('/assets/tablet-bg.png')",
        "hero-lg": "url('/assets/bg-image.png')",
      },
      // --- ДОБАВЛЯЕМ СЮДА ---
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
      },
      // ----------------------
    },
  },
  plugins: [],
};