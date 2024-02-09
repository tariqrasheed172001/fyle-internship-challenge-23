/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define the content paths where Tailwind CSS will look for classes to purge
  content: ["./src/**/*.{html,ts}"],

  // Extend the default Tailwind CSS theme with customizations
  theme: {
    extend: {}, // Custom theme extensions can be added here
  },

  // Configure any plugins that extend Tailwind CSS functionality
  plugins: [], // Additional Tailwind CSS plugins can be included here
};
