import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FaCogs,
  FaBoxOpen,
  FaChurch,
  FaEdit,
  FaClipboardList,
} from "react-icons/fa";

interface TileProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

export default function AdminHomePage () {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("brand.100", "brand.700");
  const textColor = useColorModeValue("gray.700", "white");

  const tiles: TileProps[] = [
    {
      title: "Funeral Ground Creation",
      description: "Add new burial or cremation grounds",
      icon: FaChurch,
      path: "/ground/create",
    },
    {
      title: "Grounds Edit",
      description: "Edit or update existing grounds",
      icon: FaEdit,
      path: "/admin/grounds",
    },
    {
      title: "Coffin Catalogue",
      description: "Upload and manage coffin products",
      icon: FaBoxOpen,
      path: "/product/catalogue",
    },
    {
      title: "Service & Variants",
      description: "Create new services and their variants",
      icon: FaCogs,
      path: "/admin/service/upload",
    },
    {
      title: "Admin Dashboard",
      description: "View and manage all orders",
      icon: FaClipboardList,
      path: "/admin/dashboard",
    },
  ];

  return (
    <Box p={{ base: 5, md: 10 }} bg="brand.50" minH="100vh">
      <Heading
        mb={8}
        textAlign="center"
        fontSize={{ base: "2xl", md: "3xl" }}
        color="brand.700"
      >
        Funeral Services Admin Panel
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {tiles.map((tile) => (
          <Box
            key={tile.title}
            bg={cardBg}
            p={6}
            rounded="2xl"
            shadow="md"
            transition="all 0.3s"
            cursor="pointer"
            _hover={{
              transform: "translateY(-6px)",
              bg: hoverBg,
              shadow: "xl",
            }}
            onClick={() => navigate(tile.path)}
          >
            <Flex
              align="center"
              justify="center"
              bg="brand.500"
              w="60px"
              h="60px"
              rounded="full"
              mb={4}
              mx="auto"
            >
              <Icon as={tile.icon} boxSize={8} color="white" />
            </Flex>
            <Heading
              fontSize="xl"
              mb={2}
              textAlign="center"
              color={textColor}
            >
              {tile.title}
            </Heading>
            <Text
              fontSize="sm"
              textAlign="center"
              color="gray.600"
              px={2}
            >
              {tile.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};


