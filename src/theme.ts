// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   colors: {
//     brand: {
//       50: "#EAF6FF",
//       100: "#CBE8FB",
//       200: "#A4D4F7",
//       300: "#7BBFF2",
//       400: "#52ABEE",
//       500: "#2196F3",   // Primary
//       600: "#1976D2",   // Darker accent
//       700: "#125CA0",
//       800: "#0C3D6D",
//       900: "#061F3A",
//     },
//   },
//   styles: {
//     global: {
//       body: {
//         bg: "white",
//         color: "gray.800",
//       },
//     },
//   },
// });

// export default theme;


// Version 2 

// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#F0F9FF",   // very light sky tint
      100: "#DBF0FF",
      200: "#B8E0FF",
      300: "#94D0FF",
      400: "#6FC0FF",
      500: "#87CEFA",  // your chosen Light Sky Blue
      600: "#5AA6D6",
      700: "#3E7FAF",
      800: "#275879",
      900: "#123249",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.700",
      },
    },
  },
});

export default theme;

