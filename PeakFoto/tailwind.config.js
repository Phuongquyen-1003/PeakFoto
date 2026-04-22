/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'p-deep': '#0F2854',   // Xanh nền sâu
        'p-ocean': '#1C4D8D',  // Xanh thẻ (card)
        'p-sky': '#4988C4',    // Xanh highlight/icon
        'p-ice': '#BDE8F5',    // Xanh nút/chữ (Nổi bật nhất)
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}