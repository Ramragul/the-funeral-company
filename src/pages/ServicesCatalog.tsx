// src/pages/ServicesCatalog.tsx
import React, { useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid, Card, CardBody, Text, Button, Stack, Badge } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ServicesCatalog() {
  const [services, setServices] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://admee.in:3003/api/services/list?category=standalone")
      .then(r => setServices(r.data.services || []))
      .catch(() => setServices([]));
  }, []);

  return (
    <Box py={12} bgGradient="linear(to-b, white, brand.50)">
      <Container maxW="6xl">
        <Heading as="h1" size="xl" color="brand.600" textAlign="center" mb={6}>Other Services</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {services.map((s) => (
            <Card key={s.code} borderRadius="xl" shadow="sm">
              <CardBody>
                <Stack spacing={3}>
                  <Heading size="md" color="brand.600">{s.name}</Heading>
                  <Text color="gray.600" noOfLines={3}>{s.description}</Text>
                  <Badge>₹{s.price}</Badge>
                  <Button
                    colorScheme="brand"
                    onClick={() => navigate(`/booking?service=custom-services`, { state: { services: [{ code: s.code, quantity: 1, name: s.name, unitPrice: Number(s.price) }] } })}
                  >
                    Book This
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
