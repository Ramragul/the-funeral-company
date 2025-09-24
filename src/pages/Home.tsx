// Version 1 

// import {
//     Box,
//     Heading,
//     Text,
//     Button,
//     Stack,
//     SimpleGrid,
//     Stat,
//     StatLabel,
//     StatNumber,
//     Card,
//     CardBody,
//     useColorModeValue
//   } from "@chakra-ui/react";
//   import { useNavigate } from "react-router-dom";
//   import { PhoneIcon } from "@chakra-ui/icons";
  
//   export default function Home() {
//     const navigate = useNavigate();
//     const cardBg = useColorModeValue("white", "gray.800");
  
//     return (
//       <Box>
//         {/* Hero */}
//         <Box textAlign="center" py={24} bgGradient="linear(to-b, white, skyblue.50)">
//           <Heading as="h1" size="2xl" mb={4} color="brand.600">
//             Here for you — 24/7 Support
//           </Heading>
//           <Text fontSize="lg" mb={8} color="gray.600">
//             Compassionate funeral services with dignity and care.
//           </Text>
//           <Stack spacing={4} direction={{ base: "column", md: "row" }} justify="center">
//             <Button
//               colorScheme="brand"
//               size="lg"
//               leftIcon={<PhoneIcon />}
//               onClick={() => (window.location.href = "tel:+911234567890")}
//             >
//               Call Now
//             </Button>
//             <Button variant="outline" size="lg" onClick={() => navigate("/services")}>
//               Explore Services
//             </Button>
//           </Stack>
//         </Box>
  
//         {/* Services */}
//         <Box maxW="6xl" mx="auto" py={16} px={6}>
//           <Heading size="xl" textAlign="center" mb={10} color="brand.600">
//             Our Services
//           </Heading>
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {[
//               { title: "Cremation Services", desc: "Respectful and traditional options." },
//               { title: "Burial Services", desc: "Dignified burial arrangements." },
//               { title: "Transportation", desc: "Hearse & logistics handled smoothly." },
//               { title: "Funeral Arrangements", desc: "Ceremonial support & rituals." },
//               { title: "Pre-Planning", desc: "Plan ahead with peace of mind." },
//               { title: "Memorial Services", desc: "Personalized tributes & gatherings." }
//             ].map((service, i) => (
//               <Card key={i} bg={cardBg} shadow="md" borderRadius="lg">
//                 <CardBody>
//                   <Heading size="md" mb={3} color="brand.600">
//                     {service.title}
//                   </Heading>
//                   <Text color="gray.600">{service.desc}</Text>
//                 </CardBody>
//               </Card>
//             ))}
//           </SimpleGrid>
//         </Box>
  
//         {/* Stats */}
//         <Box bg="skyblue.50" py={16}>
//           <SimpleGrid columns={{ base: 1, md: 3 }} maxW="6xl" mx="auto" spacing={10} px={6}>
//             <Stat textAlign="center">
//               <StatNumber fontSize="4xl" color="brand.600">
//                 1200+
//               </StatNumber>
//               <StatLabel>Families Served</StatLabel>
//             </Stat>
//             <Stat textAlign="center">
//               <StatNumber fontSize="4xl" color="brand.600">
//                 24/7
//               </StatNumber>
//               <StatLabel>Availability</StatLabel>
//             </Stat>
//             <Stat textAlign="center">
//               <StatNumber fontSize="4xl" color="brand.600">
//                 15+
//               </StatNumber>
//               <StatLabel>Years Experience</StatLabel>
//             </Stat>
//           </SimpleGrid>
//         </Box>
  
//         {/* Final CTA */}
//         <Box textAlign="center" py={20}>
//           <Heading as="h2" size="xl" mb={6} color="brand.600">
//             We’re here whenever you need us
//           </Heading>
//           <Button
//             colorScheme="brand"
//             size="lg"
//             leftIcon={<PhoneIcon />}
//             onClick={() => (window.location.href = "tel:+911234567890")}
//           >
//             Call Now
//           </Button>
//         </Box>
//       </Box>
//     );
//   }


// Version 2 

// Home.tsx
// import {
//     Box,
//     Container,
//     Heading,
//     Text,
//     Button,
//     Stack,
//     SimpleGrid,
//     Stat,
//     StatLabel,
//     StatNumber,
//     Card,
//     CardBody,
//     VStack,
//     Avatar,
//   } from "@chakra-ui/react";
//   import { useNavigate } from "react-router-dom";
//   import { FiCalendar, FiPhone } from "react-icons/fi";
  
//   export default function Home() {
//     const navigate = useNavigate();
  
//     return (
//       <Box>
//         {/* Hero */}
//         <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
//           <Container maxW="6xl" textAlign="center">
//             <Heading as="h1" size="2xl" color="brand.600" mb={4}>
//               Technology-powered Funeral Services
//             </Heading>
//             <Text fontSize="lg" color="gray.600" mb={8}>
//               100% professional care, dignity, and support for every family.
//             </Text>
//             <Stack
//             spacing={4}
//             direction={{ base: "column", md: "row" }}
//             justify="center"
//             >
//             <Button
//             variant="outline"
//              size="lg"
//             colorScheme="brand"
//             leftIcon={<FiPhone />}
//             onClick={() => (window.location.href = "tel:+911234567890")}
//         >
//             Call Now
//         </Button>

//         <Button
//             variant="outline"
//              colorScheme="brand"
//             size="lg"
//             onClick={() => navigate("/services")}
//         >
//             Explore Services
//         </Button>

//         <Button
//             size="lg"
//             variant="outline"
//             colorScheme="brand"
//             leftIcon={<FiCalendar />}
//             onClick={() => alert("Service Booked")}
//         >
//             Book Service
//         </Button>
//         </Stack>
//           </Container>
//         </Box>
  
//         {/* Services */}
//         <Container maxW="6xl" py={16}>
//           <Heading size="xl" textAlign="center" mb={10} color="brand.600">
//             Our Services
//           </Heading>
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {[
//               {
//                 title: "Funeral Services",
//                 desc: "Comprehensive arrangements with care and dignity.",
//               },
//               {
//                 title: "Casket & Materials",
//                 desc: "Premium and affordable choices for every need.",
//               },
//               {
//                 title: "Transportation",
//                 desc: "Hearse van and logistics handled seamlessly.",
//               },
//               {
//                 title: "Pre-Planning",
//                 desc: "Plan ahead for peace of mind and assurance.",
//               },
//               {
//                 title: "Memorial Services",
//                 desc: "Personalized tributes and remembrance events.",
//               },
//               {
//                 title: "Support Services",
//                 desc: "Guidance, paperwork, and 24/7 assistance.",
//               },
//             ].map((service, i) => (
//               <Card  key={i} shadow="md" borderRadius="lg" _hover={{ shadow: "lg" }}>
//                 <CardBody>
//                   <Heading size="md" mb={3} color="brand.600">
//                     {service.title}
//                   </Heading>
//                   <Text color="gray.600">{service.desc}</Text>
//                   <Button
//                     mt={4}
//                     size="sm"
//                     variant="link"
//                     colorScheme="brand"
//                     onClick={() => navigate("/services")}
//                   >
//                     Learn more →
//                   </Button>
//                 </CardBody>
//               </Card>
//             ))}
//           </SimpleGrid>
//         </Container>
  
//         {/* Stats */}
//         <Box bg="brand.50" py={16}>
//           <Container maxW="6xl">
//             <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
//               <Stat>
//                 <StatNumber fontSize="4xl" color="brand.600">
//                   1500+
//                 </StatNumber>
//                 <StatLabel>Families Served</StatLabel>
//               </Stat>
//               <Stat>
//                 <StatNumber fontSize="4xl" color="brand.600">
//                   24/7
//                 </StatNumber>
//                 <StatLabel>Availability</StatLabel>
//               </Stat>
//               <Stat>
//                 <StatNumber fontSize="4xl" color="brand.600">
//                   100%
//                 </StatNumber>
//                 <StatLabel>Professional Care</StatLabel>
//               </Stat>
//             </SimpleGrid>
//           </Container>
//         </Box>
  
//         {/* Testimonials */}
//         <Container maxW="6xl" py={16}>
//           <Heading size="lg" textAlign="center" mb={10} color="brand.600">
//             What Families Say
//           </Heading>
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
//             {[
//               {
//                 text: "They handled everything smoothly and respectfully.",
//                 name: "Meera K.",
//               },
//               {
//                 text: "Very professional team, available at all times.",
//                 name: "Rohit S.",
//               },
//               {
//                 text: "Compassionate and caring throughout the process.",
//                 name: "Anita P.",
//               },
//             ].map((fb, i) => (
//               <Card key={i} bg="white" shadow="sm" borderRadius="lg" p={6}>
//                 <Text color="gray.700">"{fb.text}"</Text>
//                 <VStack align="start" mt={4}>
//                   <Avatar name={fb.name} size="sm" />
//                   <Text fontSize="sm">{fb.name}</Text>
//                 </VStack>
//               </Card>
//             ))}
//           </SimpleGrid>
//         </Container>
  
//         {/* Final CTA */}
//         <Box textAlign="center" py={20} bgGradient="linear(to-t, white, brand.50)">
//           <Heading as="h2" size="xl" mb={6} color="brand.600">
//             We’re here whenever you need us
//           </Heading>
//           <Button
//             size="lg"
//             colorScheme="brand"
//             leftIcon={<FiPhone />}
//             onClick={() => (window.location.href = "tel:+911234567890")}
//           >
//             Call Now
//           </Button>
//         </Box>
//       </Box>
//     );
//   }
  


// Version 3 

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  Avatar,
  Spinner,
  Image,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiPhone } from "react-icons/fi";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  code: string;
  name: string;
  image?: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://admee.in:3003/api/admin/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories", err);
        setLoading(false);
      });
  }, []);

  const handleClick = (cat: Category) => {
    if (
      cat.code === "package" ||
      cat.code === "coffin" ||
      cat.code === "funeralground"
    ) {
      navigate(`/services/${cat.code}`);
    } else {
      navigate(`/services/category/${cat.code}`);
    }
  };

  return (
    <Box>
      {/* Hero */}
      <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
        <Container maxW="6xl" textAlign="center">
          <Heading as="h1" size="2xl" color="brand.600" mb={4}>
            Technology-Powered Funeral Services
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            100% professional care, dignity, and support for every family.
          </Text>
          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            justify="center"
          >
            <Button
              variant="outline"
              size="lg"
              colorScheme="brand"
              leftIcon={<FiPhone />}
              onClick={() => (window.location.href = "tel:+911234567890")}
            >
              Call Now
            </Button>

            <Button
              variant="outline"
              colorScheme="brand"
              size="lg"
              onClick={() => navigate("/services")}
            >
              Explore Services
            </Button>

            <Button
              size="lg"
              variant="outline"
              colorScheme="brand"
              leftIcon={<FiCalendar />}
              onClick={() => alert("Service Booked")}
            >
              Book Service
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Services Preview */}
      <Container maxW="7xl" py={16}>
        <Heading size="xl" textAlign="center" mb={10} color="brand.600">
          Our Services
        </Heading>

        {loading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {categories.slice(0, 6).map((cat) => (
              <Card
                key={cat.id}
                shadow="md"
                borderRadius="xl"
                overflow="hidden"
                _hover={{ shadow: "xl", transform: "translateY(-6px)" }}
                transition="all 0.18s"
                cursor="pointer"
                onClick={() => handleClick(cat)}
              >
                <Box h="180px" bg="gray.50">
                  <Image
                    src={
                      cat.image ||
                      "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={cat.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>

                <CardBody>
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" w="100%">
                      <Heading size="md" color="brand.600">
                        {cat.name}
                      </Heading>
                      <Badge colorScheme="pink" variant="subtle">
                        CATEGORY
                      </Badge>
                    </HStack>

                    <Text color="gray.600" fontSize="sm">
                      Explore {cat.name} services
                    </Text>

                    <Button
                      size="sm"
                      colorScheme="brand"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(cat);
                      }}
                    >
                      View
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}

        <Box textAlign="center" mt={10}>
          <Button
            size="lg"
            colorScheme="brand"
            variant="solid"
            onClick={() => navigate("/services")}
          >
            View All Services
          </Button>
        </Box>
      </Container>

      {/* Stats */}
      <Box bg="brand.50" py={16}>
        <Container maxW="6xl">
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={10}
            textAlign="center"
          >
            <Box>
              <Heading fontSize="4xl" color="brand.600">
                1500+
              </Heading>
              <Text>Families Served</Text>
            </Box>
            <Box>
              <Heading fontSize="4xl" color="brand.600">
                24/7
              </Heading>
              <Text>Availability</Text>
            </Box>
            <Box>
              <Heading fontSize="4xl" color="brand.600">
                100%
              </Heading>
              <Text>Professional Care</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxW="6xl" py={16}>
        <Heading size="lg" textAlign="center" mb={10} color="brand.600">
          What Families Say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[
            {
              text: "They handled everything smoothly and respectfully.",
              name: "Meera K.",
            },
            {
              text: "Very professional team, available at all times.",
              name: "Rohit S.",
            },
            {
              text: "Compassionate and caring throughout the process.",
              name: "Anita P.",
            },
          ].map((fb, i) => (
            <Card key={i} bg="white" shadow="sm" borderRadius="lg" p={6}>
              <Text color="gray.700">"{fb.text}"</Text>
              <VStack align="start" mt={4}>
                <Avatar name={fb.name} size="sm" />
                <Text fontSize="sm">{fb.name}</Text>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Final CTA */}
      <Box
        textAlign="center"
        py={20}
        bgGradient="linear(to-t, white, brand.50)"
      >
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
