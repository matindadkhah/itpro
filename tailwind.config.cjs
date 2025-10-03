/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/preline/**/*.js" // ✅ نسخه جدید Preline نیاز به glob عمیق دارد
  ],
  theme: {
    extend: {
      fontFamily: {
        shabnam: ['Shabnam', 'sans-serif']
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']); // اختیاری: بعضی حالت‌های Preline
    },
  ],
}
