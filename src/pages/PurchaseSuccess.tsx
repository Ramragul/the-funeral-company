// src/pages/PurchaseSuccess.tsx
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import successAnimation from "../animations/success.json"; // ✅ use your Lottie file

export default function PurchaseSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Auto-redirect after 5s
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box py={20} textAlign="center" bg="white">
      <Container maxW="lg">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ height: 200 }}
        />
        <Heading as="h1" size="xl" color="brand.600" mt={6}>
          Purchase Confirmed 🎉
        </Heading>
        <Text fontSize="lg" mt={4} color="gray.600">
          Your coffin order has been successfully placed.
        </Text>
        <Text fontWeight="bold" fontSize="lg" color="brand.700" mt={2}>
          Order ID: {orderId}
        </Text>
        <Text mt={6} color="gray.500">
          Redirecting to Home in 5 seconds...
        </Text>
      </Container>
    </Box>
  );
}
