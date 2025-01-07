import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2F1761',
        'secondary': '#541D7B',
        'third': '#030F19',
        'fourth': '#14112E',
        'fifth': '#2d264f',
        'sixth': '#101151',
        'seventh': '#462795',
        'background' : "#14112E",
        'admin' : "#030F19",
        'secondary':"#30ae52",
        'primaryDark':"#ffffff",
        'abu':"#14112E",
        'birutua':"#101151",
        'birutuamuda':"#101151",
        'ungu':"#9A4AFF",
        'profil':"#D9D9D9",
        'Hitammuda':"#030F19",
        'popup':"#14112E",
        'editprofil':"#2D264F",
        'cancel':"#101151",
        'save':"#462795",
      },
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif',],
      'Slackey': ["Slackey",],
    },
  },
  plugins: [
    daisyui
  ],
};
