/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        user: "url('/user.png')",
        unlock: "url('/unlock.png')",
        banner: "url('/banner.png')",
      },
    },
  },
  plugins: [],
};
