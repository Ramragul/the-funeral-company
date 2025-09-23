import { Box, Flex, HStack, Link, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Box bg="white" boxShadow="sm" px={6} py={3}>
      <Flex h={16} align="center" justify="space-between">
        <Button variant="ghost" onClick={() => navigate("/")}>
          FuneralCo
        </Button>

        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
          <Link onClick={() => navigate("/about")}>About</Link>
          <Link onClick={() => navigate("/services")}>Services</Link>
          <Link onClick={() => navigate("/contact")}>Contact</Link>
        </HStack>

        <Button
          colorScheme="brand"
          onClick={() => (window.location.href = "tel:+911234567890")}
        >
          Call 24/7
        </Button>
      </Flex>
    </Box>
  );
}
