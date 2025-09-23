// Version 1 : Dynamic Booking


// src/pages/EndToEndServices.tsx
// import {
//     Box,
//     Container,
//     Heading,
//     Text,
//     SimpleGrid,
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Button,
//     List,
//     ListItem,
//     ListIcon,
//   } from "@chakra-ui/react";
//   import { CheckCircleIcon } from "@chakra-ui/icons";
//   import { FiPhone } from "react-icons/fi";
//   import { useNavigate } from "react-router-dom";   // 👈 import navigate hook
  
//   export default function EndToEndServices() {
//     const navigate = useNavigate();  // 👈 initialize navigate
  
//     const packages = [
//       {
//         name: "Classic Goodbye",
//         slug: "classic-goodbye",   // 👈 add slug for query param
//         price: "₹25,000",
//         features: [
//           "Freezer Box",
//           "Simple Floral Decorations",
//           "Funeral Ground Bookings",
//           "Funeral Rituals",
//           "Funeral Van",
//           "Cremation",
//           "Death Certificate Registration & Support",
//         ],
//       },
//       {
//         name: "Premium Goodbye",
//         slug: "premium-goodbye",
//         price: "₹45,000",
//         features: [
//           "Freezer Box",
//           "Moderate Floral Decorations",
//           "Funeral Ground Bookings",
//           "Funeral Rituals",
//           "Funeral Van",
//           "Cremation",
//           "Drinking Water",
//           "Pandal & Chair Arrangements",
//           "Funeral Music Arrangements",
//           "Death Certificate Registration & Support",
//           "Complimentary Doctor-Led Counseling Session for Family",
//         ],
//       },
//       {
//         name: "Grand Goodbye",
//         slug: "grand-goodbye",
//         price: "₹75,000",
//         features: [
//           "Freezer Box",
//           "Grand Floral Decorations",
//           "Funeral Ground Bookings",
//           "Funeral Rituals",
//           "Funeral Van",
//           "Cremation",
//           "Drinking Water",
//           "Pandal & Chair Arrangements",
//           "Funeral Music Arrangements",
//           "Cracker Firings",
//           "Coffee/Tea for 50 People",
//           "Breakfast for 50 People",
//           "Death Certificate Registration & Support",
//           "Complimentary Doctor-Led Counseling Session for Family",
//         ],
//       },
//     ];
  
//     return (
//       <Box>
//         {/* Hero */}
//         <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
//           <Container maxW="6xl" textAlign="center">
//             <Heading as="h1" size="2xl" color="brand.600" mb={4}>
//               End-to-End Funeral Packages
//             </Heading>
//             <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
//               Hassle-free, professional, and dignified services — choose a package
//               that suits your family’s needs with full peace of mind.
//             </Text>
//           </Container>
//         </Box>
  
//         {/* Packages */}
//         <Container maxW="7xl" py={16}>
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {packages.map((pkg, i) => (
//               <Card
//                 key={i}
//                 shadow="md"
//                 borderRadius="xl"
//                 borderWidth="1px"
//                 _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
//                 transition="all 0.2s"
//               >
//                 <CardHeader textAlign="center">
//                   <Heading size="lg" color="brand.600">
//                     {pkg.name}
//                   </Heading>
//                   <Text fontSize="2xl" fontWeight="bold" mt={2} color="gray.700">
//                     {pkg.price}
//                   </Text>
//                 </CardHeader>
//                 <CardBody>
//                   <List spacing={3}>
//                     {pkg.features.map((feature, idx) => (
//                       <ListItem key={idx} color="gray.600">
//                         <ListIcon as={CheckCircleIcon} color="brand.500" />
//                         {feature}
//                       </ListItem>
//                     ))}
//                   </List>
//                 </CardBody>
//                 <CardFooter justifyContent="center">
//                   <Button
//                     colorScheme="brand"
//                     size="lg"
//                     onClick={() =>
//                       navigate(`/booking?service=funeral&package=${pkg.slug}`)
//                     }
//                   >
//                     Book Now
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </SimpleGrid>
//         </Container>
  
//         {/* Final CTA */}
//         <Box textAlign="center" py={20} bgGradient="linear(to-t, white, brand.50)">
//           <Heading as="h2" size="xl" mb={6} color="brand.600">
//             Need Immediate Support?
//           </Heading>
//           <Text fontSize="lg" mb={6} color="gray.600">
//             Call our 24/7 helpline to get instant assistance from our team.
//           </Text>
//           <Button
//             size="lg"
//             colorScheme="brand"
//             leftIcon={<FiPhone />}
//             onClick={() => (window.location.href = "tel:+911234567890")}
//           >
//             Call Now
//           </Button>

//           <Button size="lg" variant="ghost" ml={4} onClick={() => navigate('/services')}>Other Services (Music, Flowers, Priest...)</Button>
//         </Box>
//       </Box>
//     );
//   }
  


// Version 2


// import {
//     Box,
//     Container,
//     Heading,
//     Text,
//     SimpleGrid,
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Button,
//     List,
//     ListItem,
//     ListIcon,
//   } from "@chakra-ui/react";
//   import { CheckCircleIcon } from "@chakra-ui/icons";
//   import { FiPhone } from "react-icons/fi";
//   import { useNavigate } from "react-router-dom";   // 👈 import navigate hook
  
//   export default function EndToEndServices() {
//     const navigate = useNavigate();  // 👈 initialize navigate
  
//     const packages = [
//       {
//         name: "Classic Goodbye",
//         slug: "classic-goodbye",   // 👈 add slug for query param
//         price: "₹25,000",
//         features: [
//           "Freezer Box",
//           "Simple Floral Decorations",
//           "Funeral Ground Bookings",
//           "Funeral Rituals",
//           "Funeral Van",
//           "Cremation",
//           "Death Certificate Registration & Support",
//         ],
//       },
//       {
//         name: "Premium Goodbye",
//         slug: "premium-goodbye",
//         price: "₹45,000",
//         features: [
//           "Freezer Box",
//           "Moderate Floral Decorations",
//           "Funeral Ground Bookings",
//           "Funeral Rituals",
//           "Funeral Van",
//           "Cremation",
//           "Drinking Water",
//           "Pandal & Chair Arrangements",
//           "Funeral Music Arrangements",
//           "Death Certificate Registration & Support",
//           "Complimentary Doctor-Led Counseling Session for Family",
//         ],
//       },
//       {
//         name: "Grand Goodbye",
//         slug: "grand-goodbye",
//         price: "₹75,000",
//         features: [
//           "Freezer Box",
//           "Grand Floral Decorations",
//           "Funeral Ground Bookings",
//           "Funeral Rituals",
//           "Funeral Van",
//           "Cremation",
//           "Drinking Water",
//           "Pandal & Chair Arrangements",
//           "Funeral Music Arrangements",
//           "Cracker Firings",
//           "Coffee/Tea for 50 People",
//           "Breakfast for 50 People",
//           "Death Certificate Registration & Support",
//           "Complimentary Doctor-Led Counseling Session for Family",
//         ],
//       },
//     ];
  
//     return (
//       <Box>
//         {/* Hero */}
//         <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
//           <Container maxW="6xl" textAlign="center">
//             <Heading as="h1" size="2xl" color="brand.600" mb={4}>
//               End-to-End Funeral Packages
//             </Heading>
//             <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
//               Hassle-free, professional, and dignified services — choose a package
//               that suits your family’s needs with full peace of mind.
//             </Text>
//           </Container>
//         </Box>
  
//         {/* Packages */}
//         <Container maxW="7xl" py={16}>
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {packages.map((pkg, i) => (
//               <Card
//                 key={i}
//                 shadow="md"
//                 borderRadius="xl"
//                 borderWidth="1px"
//                 _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
//                 transition="all 0.2s"
//               >
//                 <CardHeader textAlign="center">
//                   <Heading size="lg" color="brand.600">
//                     {pkg.name}
//                   </Heading>
//                   <Text fontSize="2xl" fontWeight="bold" mt={2} color="gray.700">
//                     {pkg.price}
//                   </Text>
//                 </CardHeader>
//                 <CardBody>
//                   <List spacing={3}>
//                     {pkg.features.map((feature, idx) => (
//                       <ListItem key={idx} color="gray.600">
//                         <ListIcon as={CheckCircleIcon} color="brand.500" />
//                         {feature}
//                       </ListItem>
//                     ))}
//                   </List>
//                 </CardBody>
//                 <CardFooter justifyContent="center">
//                 <Button
//   colorScheme="brand"
//   size="lg"
//   onClick={() => {
//     const payload = {
//       code: "funeral-service", // fixed code for this service type
//       variant_code: pkg.slug, // slug acts like variant
//       quantity: 1, // funeral package is always one
//       name: pkg.name, // package name
//       unitPrice: pkg.price.replace(/[^\d]/g, ""), // extract numeric part
//       category: "funeral", // category
//     };

//     navigate(`/booking?service=funeral`, { state: { services: [payload] } });
//   }}
// >
//   Book Now
// </Button>

//                 </CardFooter>
//               </Card>
//             ))}
//           </SimpleGrid>
//         </Container>
  
//         {/* Final CTA */}
//         <Box textAlign="center" py={20} bgGradient="linear(to-t, white, brand.50)">
//           <Heading as="h2" size="xl" mb={6} color="brand.600">
//             Need Immediate Support?
//           </Heading>
//           <Text fontSize="lg" mb={6} color="gray.600">
//             Call our 24/7 helpline to get instant assistance from our team.
//           </Text>
//           <Button
//             size="lg"
//             colorScheme="brand"
//             leftIcon={<FiPhone />}
//             onClick={() => (window.location.href = "tel:+911234567890")}
//           >
//             Call Now
//           </Button>

//           <Button size="lg" variant="ghost" ml={4} onClick={() => navigate('/services')}>Other Services (Music, Flowers, Priest...)</Button>
//         </Box>
//       </Box>
//     );
//   }


// Version 3 : 1 is the working version

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FuneralServicePage() {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Classic Goodbye",
      slug: "classic-goodbye",
      price: "₹25,000",
      subtitle: "A simple, dignified farewell for your loved one.",
      features: [
        "Freezer Box",
        "Simple Floral Decorations",
        "Funeral Ground Bookings",
        "Funeral Rituals",
        "Funeral Van",
        "Cremation",
        "Death Certificate Registration & Support",
      ],
    },
    {
      name: "Premium Goodbye",
      slug: "premium-goodbye",
      price: "₹45,000",
      subtitle: "Balanced care and arrangements with added comfort.",
      features: [
        "Freezer Box",
        "Moderate Floral Decorations",
        "Funeral Ground Bookings",
        "Funeral Rituals",
        "Funeral Van",
        "Cremation",
        "Drinking Water",
        "Pandal & Chair Arrangements",
        "Funeral Music Arrangements",
        "Death Certificate Registration & Support",
        "Complimentary Doctor-Led Counseling Session for Family",
      ],
    },
    {
      name: "Grand Goodbye",
      slug: "grand-goodbye",
      price: "₹75,000",
      subtitle: "Comprehensive arrangements for a large gathering.",
      features: [
        "Freezer Box",
        "Grand Floral Decorations",
        "Funeral Ground Bookings",
        "Funeral Rituals",
        "Funeral Van",
        "Cremation",
        "Drinking Water",
        "Pandal & Chair Arrangements",
        "Funeral Music Arrangements",
        "Cracker Firings",
        "Coffee/Tea for 50 People",
        "Breakfast for 50 People",
        "Death Certificate Registration & Support",
        "Complimentary Doctor-Led Counseling Session for Family",
      ],
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="gray.50" py={{ base: 10, md: 16 }}>
        <Container maxW="5xl" textAlign="center">
          <Heading as="h1" size="2xl" color="brand.600" mb={4}>
            Funeral Service Packages
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
            Compassionate, professional, and hassle-free arrangements —
            choose a package that provides dignity and peace of mind for
            your family.
          </Text>
        </Container>
      </Box>

      {/* Packages Section */}
      <Container maxW="7xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {packages.map((pkg, i) => (
            <Card
              key={i}
              shadow="sm"
              borderRadius="xl"
              borderWidth="1px"
              bg="white"
              _hover={{ shadow: "md" }}
              transition="all 0.2s"
            >
              <CardHeader textAlign="center" pb={2}>
                <Heading size="lg" color="brand.600">
                  {pkg.name}
                </Heading>
                <Text fontSize="xl" fontWeight="bold" mt={1} color="gray.700">
                  {pkg.price}
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {pkg.subtitle}
                </Text>
              </CardHeader>
              <Divider />
              <CardBody>
                <List spacing={2}>
                  {pkg.features.map((feature, idx) => (
                    <ListItem key={idx} color="gray.600" fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="brand.500" />
                      {feature}
                    </ListItem>
                  ))}
                </List>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
              <Button
              colorScheme="brand"
              size="md"
              onClick={() => {
                navigate(`/booking?service=custom-services`, {
                  state: {
                    services: [
                      {
                        code: "funeral",               // your service_packages table code
                        variant_code: pkg.slug,        // service_variants table slug
                        quantity: 1,
                        name: `${pkg.name}`,           // package name
                        unitPrice: Number(pkg.price.replace(/[^\d]/g, "")),
                        category: "funeral",
                      },
                    ],
                  },
                });
              }}
            >
              Book Now
            </Button>

              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Final CTA */}
      <Box textAlign="center" py={16} bg="gray.50">
        <Heading as="h2" size="lg" mb={4} color="brand.600">
          Need Immediate Support?
        </Heading>
        <Text fontSize="md" mb={6} color="gray.600">
          Our team is available 24/7 to assist you with compassionate care.
        </Text>
        <Button
          size="lg"
          colorScheme="brand"
          leftIcon={<FiPhone />}
          onClick={() => (window.location.href = "tel:+911234567890")}
        >
          Call Now
        </Button>
        <Button
          size="lg"
          variant="ghost"
          ml={4}
          onClick={() => navigate("/services")}
        >
          Other Services (Music, Flowers, Priest…)
        </Button>
      </Box>
    </Box>
  );
}
