module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Matches all JS/JSX/TS/TSX files in the src directory and subdirectories
    './public/index.html',        // Includes the public/index.html file
    './src/components/**/*.{js,jsx,ts,tsx}', // Matches all component files specifically in components directory
    './src/utils/**/*.{js,jsx,ts,tsx}'      // Includes any utility-related JavaScript or TypeScript files
  ],
  theme: {
    extend: {
      // Add custom styles or extend existing ones here
    },
  },
  plugins: [
    // Add Tailwind plugins here, e.g., typography, forms, etc.
  ],
};
