// Version 1 

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Heading,
//   SimpleGrid,
//   Card,
//   CardBody,
//   Image,
//   Text,
//   Button,
//   Stack,
//   Badge,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
//   HStack,
//   VStack,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// type Service = {
//   code: string;
//   name: string;
//   price: number; // base unit price (per piece or per person)
//   description?: string;
//   image?: string;
//   images?: string[];
//   variants?: { label: string; price: number }[];
//   category?: string;
//   pricingType?: "per_person" | "per_piece" | "flat"; // optional hint
// };

// export default function ServiceCategory() {
//   const { category } = useParams<{ category: string }>();
//   const navigate = useNavigate();
//   const [items, setItems] = useState<Service[]>([]);
//   const [qtyMap, setQtyMap] = useState<Record<string, number>>({});

//   useEffect(() => {
//     axios
//       .get(`https://admee.in:3003/api/services/list?category=${category}`)
//       .then((r) => setItems(r.data.services || []))
//       .catch(() => setItems([]));
//   }, [category]);

//   const setQty = (code: string, val: number) => {
//     setQtyMap((p) => ({ ...p, [code]: Math.max(1, val) }));
//   };

//   const getTotal = (s: Service) => {
//     const q = qtyMap[s.code] || 1;
//     // If service.pricingType is per_person, total = unit * q
//     // if per_piece same logic. if flat -> unit price only
//     if (s.pricingType === "flat") return s.price;
//     return s.price * q;
//   };

//   return (
//     <Box py={12} bgGradient="linear(to-b, white, brand.50)">
//       <Container maxW="7xl">
//         <Heading as="h1" size="xl" color="brand.600" mb={6} textTransform="capitalize">
//           {category} Services
//         </Heading>

//         <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//           {items.map((s) => (
//             <Card key={s.code} borderRadius="xl" shadow="md">
//               <Box h="200px" bg="gray.50">
//                 <Image src={s.image || (s.images && s.images[0]) || undefined} alt={s.name} objectFit="cover" w="100%" h="100%" />
//               </Box>

//               <CardBody>
//                 <VStack align="start" spacing={3}>
//                   <HStack w="100%" justify="space-between">
//                     <Stack spacing={0}>
//                       <Text fontWeight="bold" color="brand.600">{s.name}</Text>
//                       <Text fontSize="sm" color="gray.600" noOfLines={2}>{s.description}</Text>
//                     </Stack>
//                     <Badge>₹{s.price}{s.pricingType === "per_person" ? "/person" : s.pricingType === "per_piece" ? "/piece" : ""}</Badge>
//                   </HStack>

//                   {/* quantity control for per_person/per_piece */}
//                   {s.pricingType !== "flat" && (
//                     <HStack>
//                       <Text fontSize="sm">Qty:</Text>
//                       <NumberInput size="sm" maxW="120px" min={1} defaultValue={1} onChange={(v) => setQty(s.code, Number(v))}>
//                         <NumberInputField />
//                         <NumberInputStepper>
//                           <NumberIncrementStepper />
//                           <NumberDecrementStepper />
//                         </NumberInputStepper>
//                       </NumberInput>
//                       <Text fontWeight="bold">Total: ₹{getTotal(s)}</Text>
//                     </HStack>
//                   )}

//                   <HStack w="100%">
//                     <Button
//                       colorScheme="brand"
//                       onClick={() => navigate(`/services/${s.code}`, { state: { service: s } })}
//                     >
//                       View
//                     </Button>

//                     <Button
//                       variant="outline"
//                       onClick={() =>
//                         navigate(`/booking?service=custom-services`, {
//                           state: {
//                             services: [
//                               {
//                                 code: s.code,
//                                 variant_code: null, 
//                                 quantity: qtyMap[s.code] || 1,
//                                 name: s.name,
//                                 unitPrice: s.price,
//                               },
//                             ],
//                           },
//                         })
//                       }
//                     >
//                       Book
//                     </Button>
//                   </HStack>
//                 </VStack>
//               </CardBody>
//             </Card>
//           ))}
//         </SimpleGrid>

//         {items.length === 0 && (
//           <Box mt={12} textAlign="center" color="gray.600">
//             No items found in this category.
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }



// Version 2  Working version

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Text,
  Button,
  Stack,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

type Service = {
  code: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[];
  variants?: { label: string; price: number; variant_code?: string }[];
  category?: string;
  pricingType?: "per_person" | "per_piece" | "flat";
};

export default function ServiceCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<Service[]>([]);
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});

  useEffect(() => {
    axios
      .get(`https://admee.in:3003/api/services/list?category=${category}`)
      .then((r) => setItems(r.data.services || []))
      .catch(() => setItems([]));
  }, [category]);

  const setQty = (code: string, val: number) => {
    setQtyMap((p) => ({ ...p, [code]: Math.max(1, val) }));
  };

  const getTotal = (s: Service) => {
    const q = qtyMap[s.code] || 1;
    if (s.pricingType === "flat") return s.price;
    return s.price * q;
  };

  return (
    <Box py={12} bgGradient="linear(to-b, white, brand.50)">
      <Container maxW="7xl">
        <Heading as="h1" size="xl" color="brand.600" mb={6} textTransform="capitalize">
          {category} Services
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {items.map((s) => (
            <Card key={s.code} borderRadius="xl" shadow="md">
              <Box h="200px" bg="gray.50">
                {/* <Image src={s.image || (s.images && s.images[0].url)} alt={s.name} objectFit="cover" w="100%" h="100%" /> */}
                <Image
                  src={s.image || s.images?.[0]?.url || ""}
                  alt={s.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />

              </Box>

              <CardBody>
                <VStack align="start" spacing={3}>
                  <HStack w="100%" justify="space-between">
                    <Stack spacing={0}>
                      <Text fontWeight="bold" color="brand.600">{s.name}</Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>{s.description}</Text>
                    </Stack>
                    <Badge>
                      ₹{s.price}
                      {s.pricingType === "per_person" ? "/person" : s.pricingType === "per_piece" ? "/piece" : ""}
                    </Badge>
                  </HStack>

                  {s.pricingType !== "flat" && (
                    <HStack>
                      <Text fontSize="sm">Qty:</Text>
                      <NumberInput size="sm" maxW="120px" min={1} defaultValue={1} onChange={(v) => setQty(s.code, Number(v))}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text fontWeight="bold">Total: ₹{getTotal(s)}</Text>
                    </HStack>
                  )}

                  <HStack w="100%">
                    <Button
                      colorScheme="brand"
                      onClick={() => navigate(`/services/${s.code}`, { state: { service: s } })}
                    >
                      View
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(`/booking?service=custom-services`, {
                          state: {
                            services: [
                              {
                                code: s.code,
                                variant_code: null,
                                quantity: qtyMap[s.code] || 1,
                                name: s.name,
                                unitPrice: s.price,
                              },
                            ],
                          },
                        })
                      }
                    >
                      Book
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {items.length === 0 && (
          <Box mt={12} textAlign="center" color="gray.600">
            No items found in this category.
          </Box>
        )}
      </Container>
    </Box>
  );
}
