/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('https://t3.ftcdn.net/jpg/02/62/99/64/360_F_262996438_YagwOczOGC2EK2sTs1ZnDXzYpREQUMpt.jpg')",
      },
    },
  },
  plugins: [],
}