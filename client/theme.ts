import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#e9f5ff",
      100: "#d1eaff",
      200: "#a9d8ff",
      300: "#80c5ff",
      400: "#57b3ff",
      500: "#338cff", // Primary brand color
      600: "#266fcc",
      700: "#1a5299",
      800: "#0d3666",
      900: "#001b33",
    },
    danger: {
      500: "#E53E3E", // Red for danger or error
      600: "#C53030",
      700: "#9B2C2C",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`, // Customize fonts
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        color: "gray.800", // Default text color
        bg: "gray.50", // Default background color
        lineHeight: "1.6", // Default line height
        fontSize: "1rem", // Set base font size to 16px (1rem)
        padding: "0", // Reset default padding
        margin: "0", // Reset default margin
      },
      a: {
        color: "brand.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default customTheme;
