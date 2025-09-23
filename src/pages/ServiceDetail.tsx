// Version 1


// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Container,
//   SimpleGrid,
//   Image,
//   Stack,
//   Heading,
//   Text,
//   Badge,
//   VStack,
//   HStack,
//   Button,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
//   useToast,
// } from "@chakra-ui/react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import axios from "axios";

// type Variant = { id?: string; label: string; price: number; image?: string };
// type ServiceFull = {
//   code: string;
//   name: string;
//   price?: number;
//   description?: string;
//   category?: string;
//   image?: string;
//   images?: string[];
//   variants?: Variant[];
//   pricingType?: "per_person" | "per_piece" | "flat";
// };

// function readCart(): Array<{ code: string; quantity: number; name: string; unitPrice: number }> {
//   try {
//     const raw = localStorage.getItem("selectedServices");
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// }
// function writeCart(items: Array<{ code: string; quantity: number; name: string; unitPrice: number }>) {
//   localStorage.setItem("selectedServices", JSON.stringify(items));
// }

// export default function ServiceDetail() {
//   const { code } = useParams<{ code: string }>();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [service, setService] = useState<ServiceFull | null>((location.state as any)?.service || null);
//   const [loading, setLoading] = useState(false);

//   // selected variant (if any) and quantity
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);

//   useEffect(() => {
//     if (service) {
//       if (!selectedVariant && service.variants?.length) setSelectedVariant(service.variants[0]);
//       return;
//     }
//     if (!code) return;
  
//     setLoading(true);
//     axios.get(`https://admee.in:3003/api/services/get?code=${encodeURIComponent(code)}`)
//       .then(resp => {
//         const s = resp.data?.service;
//         if (s) {
//           setService(s);
//           if (s.variants && s.variants.length) setSelectedVariant(s.variants[0]);
//         } else {
//           // handle not found
//         }
//       })
//       .catch(err => {
//         console.error('service detail fetch error', err);
//       })
//       .finally(() => setLoading(false));
//   }, [code, service]);
  

//   const unitPrice = useMemo(() => {
//     if (selectedVariant) return Number(selectedVariant.price);
//     if (service && typeof service.price === "number") return Number(service.price);
//     return 0;
//   }, [selectedVariant, service]);

//   const totalPrice = useMemo(() => {
//     // pricingType flat -> single unit; otherwise unitPrice * quantity
//     if (service?.pricingType === "flat") return unitPrice;
//     return unitPrice * Math.max(1, quantity);
//   }, [unitPrice, quantity, service]);

//   const images = service?.images?.length ? service.images : service?.image ? [service.image] : [];

//   const addToCart = () => {
//     if (!service) return;
//     const codeKey = selectedVariant ? `${service.code}:${selectedVariant.label}` : service.code;
//     const item = {
//       code: codeKey,
//       quantity: Math.max(1, quantity),
//       name: selectedVariant ? `${service.name} — ${selectedVariant.label}` : service.name,
//       unitPrice,
//     };
//     const cart = readCart();
//     const existingIndex = cart.findIndex((c) => c.code === item.code);
//     if (existingIndex >= 0) {
//       cart[existingIndex].quantity += item.quantity;
//     } else {
//       cart.push(item);
//     }
//     writeCart(cart);
//     toast({ title: "Added to cart", description: `${item.name} x${item.quantity}`, status: "success" });
//   };

//   const addAndBook = () => {
//     if (!service) return;
//     const payload = {
//       code: selectedVariant ? `${service.code}:${selectedVariant.label}` : service.code,
//       quantity: Math.max(1, quantity),
//       name: selectedVariant ? `${service.name} — ${selectedVariant.label}` : service.name,
//       unitPrice,
//     };
//     navigate(`/booking?service=custom-services`, { state: { services: [payload] } });
//   };

//   if (!service && !loading) {
//     return (
//       <Box py={16}>
//         <Container maxW="4xl" textAlign="center">
//           <Heading size="lg">Service not found</Heading>
//           <Text color="gray.600" mt={3}>
//             The service you requested could not be loaded. Try browsing the category or contact support.
//           </Text>
//           <Button mt={6} colorScheme="brand" onClick={() => navigate("/services")}>
//             Back to services
//           </Button>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box py={10} bgGradient="linear(to-b, white, brand.50)">
//       <Container maxW="6xl">
//         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
//           {/* Gallery */}
//           <Stack spacing={4}>
//             {images.length ? (
//               <Image src={images[0]} alt={service?.name} objectFit="cover" w="100%" h="360px" borderRadius="md" />
//             ) : (
//               <Box h="360px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
//                 <Text color="gray.400">No image available</Text>
//               </Box>
//             )}

//             {images.length > 1 && (
//               <HStack spacing={3} overflowX="auto">
//                 {images.map((img, i) => (
//                   <Image key={i} src={img} alt={`${service?.name}-${i}`} boxSize="80px" objectFit="cover" borderRadius="md" />
//                 ))}
//               </HStack>
//             )}
//           </Stack>

//           {/* Info & actions */}
//           <VStack align="stretch" spacing={4}>
//             <Heading size="lg" color="brand.600">
//               {service?.name}
//             </Heading>
//             <Text color="gray.600">{service?.description}</Text>

//             <HStack spacing={4}>
//               <Badge colorScheme="pink" fontSize="md">
//                 Unit: ₹{unitPrice}
//                 {service?.pricingType === "per_person" ? "/person" : service?.pricingType === "per_piece" ? "/piece" : ""}
//               </Badge>
//               {service?.category && <Badge>{service.category}</Badge>}
//             </HStack>

//             {/* Variants */}
//             {service?.variants && service.variants.length > 0 ? (
//               <VStack align="stretch" spacing={2}>
//                 <Text fontWeight="semibold">Choose option</Text>
//                 {service.variants.map((v) => (
//                   <HStack key={v.label} justify="space-between" p={3} borderWidth="1px" borderRadius="md">
//                     <Stack spacing={0}>
//                       <Text fontWeight="bold">{v.label}</Text>
//                       <Text fontSize="sm" color="gray.600">₹{v.price}</Text>
//                     </Stack>
//                     <Button
//                       colorScheme={selectedVariant?.label === v.label ? "red" : "brand"}
//                       onClick={() => {
//                         setSelectedVariant(v);
//                         // preserve quantity
//                         if (service.pricingType === "flat") setQuantity(1);
//                       }}
//                     >
//                       {selectedVariant?.label === v.label ? "Selected" : "Select"}
//                     </Button>
//                   </HStack>
//                 ))}
//               </VStack>
//             ) : null}

//             {/* Quantity */}
//             <VStack align="stretch" spacing={2}>
//               <Text fontWeight="semibold">Quantity</Text>
//               <NumberInput
//                 maxW="200px"
//                 min={1}
//                 value={quantity}
//                 onChange={(val) => setQuantity(Math.max(1, Number(val || 1)))}
//                 isDisabled={service?.pricingType === "flat"}
//               >
//                 <NumberInputField />
//                 <NumberInputStepper>
//                   <NumberIncrementStepper />
//                   <NumberDecrementStepper />
//                 </NumberInputStepper>
//               </NumberInput>
//               <HStack justify="space-between" w="100%">
//                 <Text fontWeight="bold">Total</Text>
//                 <Text fontWeight="bold">₹{totalPrice}</Text>
//               </HStack>
//             </VStack>

//             {/* Actions */}
//             <HStack pt={4}>
//               <Button colorScheme="brand" onClick={addAndBook}>
//                 Add & Book
//               </Button>
//               <Button variant="outline" onClick={() => { addToCart(); }}>
//                 Add to Cart
//               </Button>
//               <Button variant="ghost" onClick={() => navigate("/services")}>
//                 Back
//               </Button>
//             </HStack>
//           </VStack>
//         </SimpleGrid>
//       </Container>
//     </Box>
//   );
// }



// Version 2 

// src/pages/ServiceDetail.tsx (updated)
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Container,
//   SimpleGrid,
//   Image,
//   Stack,
//   Heading,
//   Text,
//   Badge,
//   VStack,
//   HStack,
//   Button,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
//   useToast,
// } from "@chakra-ui/react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import axios from "axios";

// type Variant = { id?: string; label: string; price: number; image?: string; variant_code?: string };
// type ServiceFull = {
//   code: string;
//   name: string;
//   price?: number;
//   description?: string;
//   category?: string;
//   image?: string;
//   images?: string[];
//   variants?: Variant[];
//   pricingType?: "per_person" | "per_piece" | "flat";
// };

// function readCart(): Array<{ code: string; quantity: number; name: string; unitPrice: number }> {
//   try {
//     const raw = localStorage.getItem("selectedServices");
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// }
// function writeCart(items: Array<{ code: string; quantity: number; name: string; unitPrice: number }>) {
//   localStorage.setItem("selectedServices", JSON.stringify(items));
// }

// export default function ServiceDetail() {
//   const { code } = useParams<{ code: string }>();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [service, setService] = useState<ServiceFull | null>((location.state as any)?.service || null);
//   const [loading, setLoading] = useState(false);

//   // selected variant and quantity
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);

//   // Fetch service when `code` present and no service loaded
//   useEffect(() => {
//     if (!code) return;
//     // if we already have service from location.state AND its code matches, skip fetch
//     if (service && service.code === code) {
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(`https://admee.in:3003/api/services/get?code=${encodeURIComponent(code)}`)
//       .then((resp) => {
//         console.log("[ServiceDetail] GET /api/services/get response:", resp.data);
//         // API returns { service: {...} } — support both shapes
//         const s = resp.data?.service || resp.data;
//         if (s && s.code) {
//           setService(s);
//         } else {
//           setService(null);
//         }
//       })
//       .catch((err) => {
//         console.error("service detail fetch error", err);
//         toast({ title: "Could not load service", status: "error" });
//       })
//       .finally(() => setLoading(false));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [code]);

//   // When service changes, initialize selectedVariant & quantity
//   useEffect(() => {
//     if (!service) {
//       setSelectedVariant(null);
//       setQuantity(1);
//       return;
//     }
//     if (service.variants && service.variants.length > 0) {
//       // prefer variant_code if present, else first variant
//       setSelectedVariant(service.variants[0]);
//     } else {
//       setSelectedVariant(null);
//     }
//     // If pricingType is flat, ensure quantity is 1
//     if (service.pricingType === "flat") setQuantity(1);
//   }, [service]);

//   const unitPrice = useMemo(() => {
//     if (selectedVariant) return Number(selectedVariant.price);
//     if (service && typeof service.price === "number") return Number(service.price);
//     return 0;
//   }, [selectedVariant, service]);

//   const totalPrice = useMemo(() => {
//     if (service?.pricingType === "flat") return unitPrice;
//     return unitPrice * Math.max(1, quantity);
//   }, [unitPrice, quantity, service]);

//   const images = service?.images?.length ? service.images : service?.image ? [service.image] : [];

//   const addToCart = () => {
//     if (!service) return;
//     const codeKey = selectedVariant ? `${service.code}:${selectedVariant.variant_code || selectedVariant.label}` : service.code;
//     const item = {
//       code: codeKey,
//       quantity: Math.max(1, quantity),
//       name: selectedVariant ? `${service.name} — ${selectedVariant.label}` : service.name,
//       unitPrice,
//     };
//     const cart = readCart();
//     const existingIndex = cart.findIndex((c) => c.code === item.code);
//     if (existingIndex >= 0) {
//       cart[existingIndex].quantity += item.quantity;
//     } else {
//       cart.push(item);
//     }
//     writeCart(cart);
//     toast({ title: "Added to cart", description: `${item.name} x${item.quantity}`, status: "success" });
//   };

//   const addAndBook = () => {
//     if (!service) return;
//     const payload = {
//       code: selectedVariant ? `${service.code}:${selectedVariant.variant_code || selectedVariant.label}` : service.code,
//       variant_code: selectedVariant?.variant_code || null,
//       quantity: Math.max(1, quantity),
//       name: selectedVariant ? `${service.name} — ${selectedVariant.label}` : service.name,
//       unitPrice,
//     };
//     navigate(`/booking?service=custom-services`, { state: { services: [payload] } });
//   };

//   if (!service && !loading) {
//     return (
//       <Box py={16}>
//         <Container maxW="4xl" textAlign="center">
//           <Heading size="lg">Service not found</Heading>
//           <Text color="gray.600" mt={3}>
//             The service you requested could not be loaded. Try browsing the category or contact support.
//           </Text>
//           <Button mt={6} colorScheme="brand" onClick={() => navigate("/services")}>
//             Back to services
//           </Button>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box py={10} bgGradient="linear(to-b, white, brand.50)">
//       <Container maxW="6xl">
//         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
//           {/* Gallery */}
//           <Stack spacing={4}>
//             {images.length ? (
//               <Image src={images[0]} alt={service?.name} objectFit="cover" w="100%" h="360px" borderRadius="md" />
//             ) : (
//               <Box h="360px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
//                 <Text color="gray.400">No image available</Text>
//               </Box>
//             )}

//             {images.length > 1 && (
//               <HStack spacing={3} overflowX="auto">
//                 {images.map((img, i) => (
//                   <Image key={i} src={img} alt={`${service?.name}-${i}`} boxSize="80px" objectFit="cover" borderRadius="md" />
//                 ))}
//               </HStack>
//             )}
//           </Stack>

//           {/* Info & actions */}
//           <VStack align="stretch" spacing={4}>
//             <Heading size="lg" color="brand.600">
//               {service?.name}
//             </Heading>
//             <Text color="gray.600">{service?.description}</Text>

//             <HStack spacing={4}>
//               <Badge colorScheme="pink" fontSize="md">
//                 Unit: ₹{unitPrice}
//                 {service?.pricingType === "per_person" ? "/person" : service?.pricingType === "per_piece" ? "/piece" : ""}
//               </Badge>
//               {service?.category && <Badge>{service.category}</Badge>}
//             </HStack>

//             {/* Variants */}
//             {service?.variants && service.variants.length > 0 ? (
//               <VStack align="stretch" spacing={2}>
//                 <Text fontWeight="semibold">Choose option</Text>
//                 {service.variants.map((v) => (
//                   <HStack key={v.variant_code || v.label} justify="space-between" p={3} borderWidth="1px" borderRadius="md">
//                     <Stack spacing={0}>
//                       <Text fontWeight="bold">{v.label}</Text>
//                       <Text fontSize="sm" color="gray.600">₹{v.price}</Text>
//                     </Stack>
//                     <Button
//                       colorScheme={selectedVariant?.variant_code === v.variant_code ? "red" : "brand"}
//                       onClick={() => {
//                         setSelectedVariant(v);
//                         if (service.pricingType === "flat") setQuantity(1);
//                       }}
//                     >
//                       {selectedVariant?.variant_code === v.variant_code ? "Selected" : "Select"}
//                     </Button>
//                   </HStack>
//                 ))}
//               </VStack>
//             ) : null}

//             {/* Quantity */}
//             <VStack align="stretch" spacing={2}>
//               <Text fontWeight="semibold">Quantity</Text>
//               <NumberInput
//                 maxW="200px"
//                 min={1}
//                 value={quantity}
//                 onChange={(val) => setQuantity(Math.max(1, Number(val || 1)))}
//                 isDisabled={service?.pricingType === "flat"}
//               >
//                 <NumberInputField />
//                 <NumberInputStepper>
//                   <NumberIncrementStepper />
//                   <NumberDecrementStepper />
//                 </NumberInputStepper>
//               </NumberInput>
//               <HStack justify="space-between" w="100%">
//                 <Text fontWeight="bold">Total</Text>
//                 <Text fontWeight="bold">₹{totalPrice}</Text>
//               </HStack>
//             </VStack>

//             {/* Actions */}
//             <HStack pt={4}>
//               <Button colorScheme="brand" onClick={addAndBook}>
//                 Add & Book
//               </Button>
//               <Button variant="outline" onClick={() => { addToCart(); }}>
//                 Add to Cart
//               </Button>
//               <Button variant="ghost" onClick={() => navigate("/services")}>
//                 Back
//               </Button>
//             </HStack>
//           </VStack>
//         </SimpleGrid>
//       </Container>
//     </Box>
//   );
// }



// Version 3 : 

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Stack,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

type Variant = { label: string; price: number; image?: string; variant_code?: string };
type ServiceFull = {
  code: string;
  name: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  images?: string[];
  variants?: Variant[];
  pricingType?: "per_person" | "per_piece" | "flat";
};

export default function ServiceDetail() {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [service, setService] = useState<ServiceFull | null>((location.state as any)?.service || null);
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!code) return;
    if (service && service.code === code) return;

    setLoading(true);
    axios
      .get(`https://admee.in:3003/api/services/get?code=${encodeURIComponent(code)}`)
      .then((resp) => {
        const s = resp.data?.service || resp.data;
        if (s && s.code) setService(s);
        else setService(null);
      })
      .catch(() => toast({ title: "Could not load service", status: "error" }))
      .finally(() => setLoading(false));
  }, [code]);

  useEffect(() => {
    if (!service) return;
    if (service.variants && service.variants.length > 0) {
      setSelectedVariant(service.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    if (service.pricingType === "flat") setQuantity(1);
  }, [service]);

  const unitPrice = useMemo(() => selectedVariant?.price ?? service?.price ?? 0, [selectedVariant, service]);
  const totalPrice = useMemo(
    () => (service?.pricingType === "flat" ? unitPrice : unitPrice * Math.max(1, quantity)),
    [unitPrice, quantity, service]
  );

  const images = service?.images?.length ? service.images : service?.image ? [service.image] : [];

  const addAndBook = () => {
    if (!service) return;
    const payload = {
      code: service.code,
      variant_code: selectedVariant?.variant_code || null,
      quantity: Math.max(1, quantity),
      name: selectedVariant ? `${service.name} — ${selectedVariant.label}` : service.name,
      unitPrice,
      category:service.category,
    };
    navigate(`/booking?service=custom-services`, { state: { services: [payload] } });
  };

  return (
    <Box py={10} bgGradient="linear(to-b, white, brand.50)">
      <Container maxW="6xl">
        {!service ? (
          <Heading size="lg">Service not found</Heading>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Stack spacing={4}>
              {images.length ? (
                <Image src={images[0].url} alt={service?.name} objectFit="cover" w="100%" h="360px" borderRadius="md" />
              ) : (
                <Box h="360px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                  <Text color="gray.400">No image available</Text>
                </Box>
              )}
            </Stack>

            <VStack align="stretch" spacing={4}>
              <Heading size="lg" color="brand.600">{service?.name}</Heading>
              <Text color="gray.600">{service?.description}</Text>

              <HStack spacing={4}>
                <Badge colorScheme="pink">Unit: ₹{unitPrice}</Badge>
                {service?.category && <Badge>{service.category}</Badge>}
              </HStack>

              {service?.variants?.length ? (
                <VStack align="stretch" spacing={2}>
                  {service.variants.map((v) => (
                    <HStack key={v.variant_code || v.label} justify="space-between" p={3} borderWidth="1px" borderRadius="md">
                      <Stack spacing={0}>
                        <Text fontWeight="bold">{v.label}</Text>
                        <Text fontSize="sm" color="gray.600">₹{v.price}</Text>
                      </Stack>
                      <Button
                        colorScheme={selectedVariant?.variant_code === v.variant_code ? "red" : "brand"}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {selectedVariant?.variant_code === v.variant_code ? "Selected" : "Select"}
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              ) : null}

              <VStack align="stretch">
                <Text fontWeight="semibold">Quantity</Text>
                <NumberInput
                  maxW="200px"
                  min={1}
                  value={quantity}
                  onChange={(val) => setQuantity(Math.max(1, Number(val || 1)))}
                  isDisabled={service?.pricingType === "flat"}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <HStack justify="space-between">
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold">₹{totalPrice}</Text>
                </HStack>
              </VStack>

              <HStack pt={4}>
                <Button colorScheme="brand" onClick={addAndBook}>Add & Book</Button>
                <Button variant="ghost" onClick={() => navigate("/services")}>Back</Button>
              </HStack>
            </VStack>
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}

