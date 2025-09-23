import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <Box minH="100vh" bg="white">
      <NavBar />
      <Box as="main" maxW="5xl" mx="auto" px={4} py={8}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
