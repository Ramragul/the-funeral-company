// src/pages/About.tsx
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Card,
    CardBody,
    VStack,
    Avatar,
    Stat,
    StatLabel,
    StatNumber,
    Button,
  } from "@chakra-ui/react";
  import { FiPhone } from "react-icons/fi";
  
  export default function About() {
    return (
      <Box>
        {/* Hero Section */}
        <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
          <Container maxW="6xl" textAlign="center">
            <Heading as="h1" size="2xl" color="brand.600" mb={4}>
              About Us
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
              We are a technology-powered funeral company providing{" "}
              <strong>end-to-end services</strong> — from{" "}
              <strong>funeral ground booking</strong> and{" "}
              <strong>casket selling</strong> to complete funeral arrangements.
              Our goal is to deliver <strong>hassle-free, professional support</strong>
              for families, ensuring dignity, compassion, and care in every step.
            </Text>
          </Container>
        </Box>
  
        {/* Our Mission */}
        <Container maxW="6xl" py={16}>
          <Heading size="xl" textAlign="center" mb={8} color="brand.600">
            Our Mission
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.600" maxW="4xl" mx="auto">
            To provide families with seamless, reliable, and professional funeral
            services. By combining modern technology with traditional values, we
            ensure that every arrangement is handled with compassion, respect, and
            transparency.
          </Text>
        </Container>
  
        {/* What We Do (Service Highlights) */}
        <Container maxW="6xl" py={16}>
          <Heading size="xl" textAlign="center" mb={10} color="brand.600">
            What We Offer
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {[
              {
                title: "End-to-End Funeral Services",
                desc: "From initial arrangements to the final rituals, we manage everything with care.",
              },
              {
                title: "Funeral Ground Booking",
                desc: "Quick and reliable booking of funeral grounds with full support.",
              },
              {
                title: "Casket & Essentials",
                desc: "Premium and affordable caskets and related items available instantly.",
              },
              {
                title: "Transportation & Logistics",
                desc: "Seamless vehicle arrangements, including hearse vans and transfers.",
              },
              {
                title: "Ceremonial Support",
                desc: "Guidance for customs, rituals, and personalized memorials.",
              },
              {
                title: "24/7 Assistance",
                desc: "Always available to respond and support you at any hour.",
              },
            ].map((service, i) => (
              <Card key={i} shadow="md" borderRadius="lg" _hover={{ shadow: "lg" }}>
                <CardBody>
                  <Heading size="md" mb={3} color="brand.600">
                    {service.title}
                  </Heading>
                  <Text color="gray.600">{service.desc}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
  
        {/* Why Choose Us (Stats) */}
        <Box bg="brand.50" py={16}>
          <Container maxW="6xl">
            <Heading size="lg" textAlign="center" mb={10} color="brand.600">
              Why Families Trust Us
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
              <Stat>
                <StatNumber fontSize="4xl" color="brand.600">
                  1500+
                </StatNumber>
                <StatLabel>Families Served</StatLabel>
              </Stat>
              <Stat>
                <StatNumber fontSize="4xl" color="brand.600">
                  24/7
                </StatNumber>
                <StatLabel>Support & Assistance</StatLabel>
              </Stat>
              <Stat>
                <StatNumber fontSize="4xl" color="brand.600">
                  100%
                </StatNumber>
                <StatLabel>Hassle-Free Service</StatLabel>
              </Stat>
            </SimpleGrid>
          </Container>
        </Box>
  
        {/* Team Section (Optional) */}
        <Container maxW="6xl" py={16}>
          <Heading size="lg" textAlign="center" mb={10} color="brand.600">
            Our Team
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {[
              { name: "Rahul Sharma", role: "Founder & CEO" },
              { name: "Priya Menon", role: "Operations Head" },
              { name: "Arjun Patel", role: "Technology Lead" },
            ].map((member, i) => (
              <VStack key={i} spacing={3}>
                <Avatar name={member.name} size="xl" />
                <Text fontWeight="bold">{member.name}</Text>
                <Text color="gray.600">{member.role}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
  
        {/* Final CTA */}
        <Box textAlign="center" py={20} bgGradient="linear(to-t, white, brand.50)">
          <Heading as="h2" size="xl" mb={6} color="brand.600">
            We’re here whenever you need us
          </Heading>
          <Button
            size="lg"
            colorScheme="brand"
            leftIcon={<FiPhone />}
            onClick={() => (window.location.href = "tel:+911234567890")}
          >
            Call Now
          </Button>
        </Box>
      </Box>
    );
  }
  