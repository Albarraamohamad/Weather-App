module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure it scans all your files
  theme: {
    extend: {
      screens: {
        xxs: "300px", // Extra small screens
        xs: "475px", // Small phones
        sm: "640px", // Standard mobile
        md: "768px", // Tablets
        lg: "1024px", // Small laptops
        xl: "1280px", // Desktops
        "2xl": "1536px", // Large screens
      },
    },
  },
  plugins: [],
};
