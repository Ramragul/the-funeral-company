
// Version 1 : udpated service page . 


// src/pages/Services.tsx
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   SimpleGrid,
//   Card,
//   CardBody,
//   VStack,
//   Button,
//   Image,
//   Badge,
//   HStack,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiPhone,
//   FiMapPin,
//   FiBox,
//   FiTruck,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";

// export default function Services() {
//   const navigate = useNavigate();

//   const services = [
//     {
//       title: "End-to-End Funeral Services",
//       desc: "Complete management of all rituals, arrangements, and documentation.",
//       icon: FiUsers,
//       path: "/services/end-to-end", // your package/listing page
//       img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200",
//       type: "package",
//       category: "package",
//     },
//     {
//       title: "Funeral Ground Booking",
//       desc: "Book cremation/burial grounds with paperwork support.",
//       icon: FiMapPin,
//       path: "/services/funeral-ground-booking",
//       img: "https://images.unsplash.com/photo-1596204976717-1a47f88cd2a4?w=1200",
//       type: "detail",
//       category: "funeral-ground",
//       code: "funeral-ground-basic",
//     },
//     {
//       title: "Casket & Essentials",
//       desc: "Caskets, linens, and ceremonial essentials (purchase / customization).",
//       icon: FiBox,
//       path: "/products/caskets",
//       img: "https://images.unsplash.com/photo-1524492449090-1a065f2f00b5?w=1200",
//       type: "product",
//     },
//     {
//       title: "Flowers & Garlands",
//       desc: "Marigold, jasmine, mixed bouquets and garlands — per piece pricing.",
//       icon: FiClock,
//       path: "/services/category/flower-garland",
//       img: "https://images.unsplash.com/photo-1528150177500-9a0b1d5b8e5b?w=1200",
//       type: "catalog",
//       category: "flowers",
//     },
//     {
//       title: "Catering (Tea/Coffee / Snacks)",
//       desc: "Tea/coffee + snacks packages for gatherings (priced per person).",
//       icon: FiTruck,
//       path: "/services/category/catering",
//       img: "https://images.unsplash.com/photo-1512470876302-4c0b2d0b7fbb?w=1200",
//       type: "catalog",
//       category: "catering",
//     },
//     {
//       title: "Music & Priests",
//       desc: "Bands, devotional singers, priests / purohits for rituals.",
//       icon: FiUsers,
//       path: "/services/category/music",
//       img: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200",
//       type: "catalog",
//       category: "music",
//     },
//     {
//       title: "24/7 Assistance",
//       desc: "Round-the-clock help to manage urgent needs.",
//       icon: FiPhone,
//       path: "/services/247-support",
//       img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
//       type: "detail",
//       category: "support",
//       code: "247-support",
//     },
//   ];

//   const handleClick = (s: any) => {
//     if (s.type === "package") {
//       // navigate to your existing package page (EndToEndServices)
//       navigate(s.path);
//       return;
//     }
//     if (s.type === "product") {
//       navigate(s.path); // coffins/products
//       return;
//     }
//     if (s.type === "catalog") {
//       // go to category listing (ServiceCategory)
//       navigate(`/services/category/${s.category}`);
//       return;
//     }
//     if (s.type === "detail") {
//       // single service detail page with code
//       navigate(`/services/${s.code}`, { state: { backFromServices: true } });
//       return;
//     }
//     // fallback
//     navigate(s.path);
//   };

//   return (
//     <Box>
//       <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
//         <Container maxW="6xl" textAlign="center">
//           <Heading as="h1" size="2xl" color="brand.600" mb={4}>
//             Our Services
//           </Heading>
//           <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
//             Comprehensive, professional, and hassle-free funeral arrangements.
//           </Text>
//         </Container>
//       </Box>

//       <Container maxW="7xl" py={12}>
//         <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
//           {services.map((service, i) => (
//             <Card
//               key={i}
//               shadow="md"
//               borderRadius="xl"
//               overflow="hidden"
//               _hover={{ shadow: "xl", transform: "translateY(-6px)" }}
//               transition="all 0.18s"
//               cursor="pointer"
//               onClick={() => handleClick(service)}
//             >
//               <Box h="180px" bg="gray.50">
//                 <Image src={service.img} alt={service.title} objectFit="cover" w="100%" h="100%" />
//               </Box>

//               <CardBody>
//                 <VStack align="start" spacing={2}>
//                   <HStack justify="space-between" w="100%">
//                     <Heading size="md" color="brand.600">
//                       <service.icon style={{ display: "inline", marginRight: 8 }} />
//                       {service.title}
//                     </Heading>
//                     <Badge colorScheme="pink" variant="subtle">{service.type.toUpperCase()}</Badge>
//                   </HStack>

//                   <Text color="gray.600" fontSize="sm">
//                     {service.desc}
//                   </Text>

//                   <Button size="sm" colorScheme="brand" onClick={(e) => { e.stopPropagation(); handleClick(service); }}>
//                     View
//                   </Button>
//                 </VStack>
//               </CardBody>
//             </Card>
//           ))}
//         </SimpleGrid>
//       </Container>

//       <Box textAlign="center" py={20} bgGradient="linear(to-t, white, brand.50)">
//         <Heading as="h2" size="xl" mb={6} color="brand.600">
//           Need Help Immediately?
//         </Heading>
//         <Text fontSize="lg" mb={6} color="gray.600">
//           Our 24/7 support team is always here to assist you.
//         </Text>
//         <Button size="lg" colorScheme="brand" onClick={() => (window.location.href = "tel:+911234567890")}>
//           Call Now
//         </Button>
//       </Box>
//     </Box>
//   );
// }



// Version 2 , categories dynamic fetch

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  Button,
  Image,
  Badge,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  code: string;
  name: string;
  image?: string;
};

export default function Services() {
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
    console.log("Category value " +JSON.stringify(cat));
    // navigate using category code (safer than name)

    if (cat.code == 'package' || cat.code == 'coffin' || cat.code == 'funeralground') 
      {
        navigate(`/services/${cat.code}`)
      }
      else
      {
    navigate(`/services/category/${cat.code}`);
      }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box>
      <Box bgGradient="linear(to-b, white, brand.50)" py={{ base: 12, md: 20 }}>
        <Container maxW="6xl" textAlign="center">
          <Heading as="h1" size="2xl" color="brand.600" mb={4}>
            Our Services
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
            Comprehensive, professional, and hassle-free funeral arrangements.
          </Text>
        </Container>
      </Box>

      <Container maxW="7xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {categories.map((cat) => (
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
      </Container>

      <Box textAlign="center" py={20} bgGradient="linear(to-t, white, brand.50)">
        <Heading as="h2" size="xl" mb={6} color="brand.600">
          Need Help Immediately?
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.600">
          Our 24/7 support team is always here to assist you.
        </Text>
        <Button
          size="lg"
          colorScheme="brand"
          onClick={() => (window.location.href = "tel:+911234567890")}
        >
          Call Now
        </Button>
      </Box>
    </Box>
  );
}
