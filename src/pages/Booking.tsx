// Version 1

// import React, { useEffect, useState } from "react";
// import {
//   Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea,
//   Button, useToast, SimpleGrid, HStack, NumberInput,
//   NumberInputField, NumberInputStepper, NumberIncrementStepper,
//   NumberDecrementStepper, Badge, Stack,
// } from "@chakra-ui/react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// type Variant = { variant_code?: string; label: string; price: number; image?: string };
// type ServiceRow = {
//   code: string; name: string; price: number; description?: string;
//   category?: string; image?: string | null; images?: string[];
//   pricingType?: string; variants?: Variant[];
// };
// type SelectedService = {
//   code: string; name: string; unitPrice: number; quantity: number;
//   variant_code?: string | null;
// };

// export default function Booking() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toast = useToast();

//   const serviceQuery = searchParams.get("service") || "general";
//   const packageType = searchParams.get("package") || "";

//   const [availableServices, setAvailableServices] = useState<ServiceRow[]>([]);
//   const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
//   const [formData, setFormData] = useState({
//     name: "", phone: "", email: "",
//     address: "", date: "", pickup: "", drop: "", notes: "",
//     service: serviceQuery, package: packageType,
//   });
//   const [loading, setLoading] = useState(false);

//   // --- Fetch services ---
//   useEffect(() => {
//     if (serviceQuery === "custom-services" || serviceQuery === "general") {
//       axios
//         .get("https://admee.in:3003/api/services/list?category=standalone")
//         .then((resp) => mergeAvailableWithSelected(resp.data?.services || []))
//         .catch(() => {
//           const fallback: ServiceRow[] = [
//             { code: "music-basic", name: "Music Band - Basic", price: 5000, description: "Basic 3-person band (1 hr)" } as ServiceRow,
//             { code: "flower-garland", name: "Garlands / Flowers (per piece)", price: 500, description: "Fresh garlands per piece" } as ServiceRow,
//           ];
//           mergeAvailableWithSelected(fallback);
//         });
//     }
//   }, [serviceQuery, location.state]);

//   // --- Normalize incoming services ---
//   useEffect(() => {
//     const raw = (location.state as any)?.services;
//     if (!raw) return;
//     const normalized: SelectedService[] = raw.map((it: any) => ({
//       code: it.code,
//       name: it.name,
//       unitPrice: Number(it.unitPrice ?? it.price ?? 0),
//       quantity: Number(it.quantity ?? 1),
//       variant_code: it.variant_code ?? null,
//     }));
//     setSelectedServices(normalized);
//   }, [location.state]);

//   const mergeAvailableWithSelected = (base: ServiceRow[]) => {
//     const raw = (location.state as any)?.services || [];
//     const normalized: SelectedService[] = raw.map((it: any) => ({
//       code: it.code,
//       name: it.name,
//       unitPrice: Number(it.unitPrice ?? it.price ?? 0),
//       quantity: Number(it.quantity ?? 1),
//       variant_code: it.variant_code ?? null,
//     }));

//     const copy = [...base];
//     normalized.forEach((sel) => {
//       const idx = copy.findIndex((svc) => svc.code === sel.code);
//       if (idx >= 0) {
//         const svc = { ...copy[idx] };
//         if (sel.variant_code) {
//           if (!svc.variants) svc.variants = [];
//           const exists = svc.variants.find((v) => v.variant_code === sel.variant_code);
//           if (!exists) {
//             svc.variants.push({
//               variant_code: sel.variant_code,
//               label: sel.name.includes("—") ? sel.name.split("—")[1].trim() : sel.name,
//               price: sel.unitPrice,
//             });
//           }
//         }
//         copy[idx] = svc;
//       } else {
//         copy.push({
//           code: sel.code,
//           name: sel.name,
//           price: sel.unitPrice,
//           variants: sel.variant_code
//             ? [{ variant_code: sel.variant_code, label: sel.name, price: sel.unitPrice }]
//             : [],
//         } as ServiceRow);
//       }
//     });

//     setAvailableServices(copy);
//   };

//   // --- Toggle base service ---
//   const toggleService = (svc: ServiceRow) => {
//     setSelectedServices((prev) => {
//       const exists = prev.find((s) => s.code === svc.code && !s.variant_code);
//       return exists ? prev.filter((s) => !(s.code === svc.code && !s.variant_code))
//         : [...prev, { code: svc.code, name: svc.name, unitPrice: svc.price, quantity: 1, variant_code: null }];
//     });
//   };

//   // --- Toggle variant ---
//   const toggleVariant = (svc: ServiceRow, v: Variant) => {
//     setSelectedServices((prev) => {
//       const exists = prev.find((s) => s.code === svc.code && s.variant_code === v.variant_code);
//       return exists ? prev.filter((s) => !(s.code === svc.code && s.variant_code === v.variant_code))
//         : [...prev, { code: svc.code, name: `${svc.name} — ${v.label}`, unitPrice: v.price, quantity: 1, variant_code: v.variant_code }];
//     });
//   };

//   const updateQuantity = (code: string, variant_code: string | null, qty: number) => {
//     setSelectedServices((prev) =>
//       prev.map((s) => s.code === code && s.variant_code === variant_code ? { ...s, quantity: Math.max(1, qty) } : s)
//     );
//   };

//   const calcSelectedTotal = () =>
//     selectedServices.reduce((sum, s) => sum + s.unitPrice * s.quantity, 0);

//   // --- FORM SUBMIT ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload: any = {
//         customer: { name: formData.name, phone: formData.phone, email: formData.email },
//         serviceDate: formData.date,         // ✅ required
//         address: formData.address || null,  // ✅ required
//         pickupLocation: formData.pickup || null,
//         dropLocation: formData.drop || null,
//         notes: formData.notes,
//       };
//       if (formData.package) {
//         payload.packageCode = formData.package;
//       } else if (selectedServices.length) {
//         payload.services = selectedServices.map((s) => ({
//           code: s.code, quantity: s.quantity, variant_code: s.variant_code,
//         }));
//       } else {
//         toast({ title: "Select package or services", status: "error" });
//         return;
//       }
//       const { data } = await axios.post(`https://admee.in:3003/api/services/book`, payload);
//       toast({ title: "Booking successful", status: "success" });
//       navigate(`/booking/success?bookingId=${data.orderId}`, { state: data });
//     } catch (err: any) {
//       toast({ title: "Error", description: err.response?.data?.error || err.message, status: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box py={{ base: 10, md: 20 }} bg="gray.50">
//       <Container maxW="3xl">
//         <Heading as="h1" size="xl" mb={6} color="brand.600" textAlign="center">
//           Book Services
//         </Heading>

//         <form onSubmit={handleSubmit}>
//           <VStack spacing={6} align="stretch">
//             {/* --- Customer Form --- */}
//             <FormControl isRequired>
//               <FormLabel>Name</FormLabel>
//               <Input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Phone</FormLabel>
//               <Input name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Address</FormLabel>
//               <Textarea name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Preferred Date</FormLabel>
//               <Input type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Pickup Location</FormLabel>
//               <Input name="pickup" value={formData.pickup} onChange={(e) => setFormData({ ...formData, pickup: e.target.value })} />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Drop Location</FormLabel>
//               <Input name="drop" value={formData.drop} onChange={(e) => setFormData({ ...formData, drop: e.target.value })} />
//             </FormControl>

//             {/* --- Services --- */}
//             {(serviceQuery === "custom-services" || serviceQuery === "general") && (
//               <Box borderWidth="1px" borderRadius="md" p={4}>
//                 <Heading size="md" mb={3}>Select Services</Heading>
//                 <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
//                   {availableServices.map((svc) => (
//                     <Box key={svc.code} p={3} borderWidth="1px" borderRadius="md">
//                       <Stack spacing={2}>
//                         <Text fontWeight="bold">{svc.name}</Text>
//                         <Text fontSize="sm" color="gray.600">{svc.description}</Text>
//                         <Badge>₹{svc.price}</Badge>

//                         {svc.variants?.length ? (
//                           svc.variants.map((v) => {
//                             const sel = selectedServices.find((s) => s.code === svc.code && s.variant_code === v.variant_code);
//                             return (
//                               <HStack key={v.variant_code} justify="space-between">
//                                 <Text>{v.label} - ₹{v.price}</Text>
//                                 <HStack>
//                                   <Button size="sm" colorScheme={sel ? "red" : "brand"} onClick={() => toggleVariant(svc, v)}>
//                                     {sel ? "Remove" : "Add"}
//                                   </Button>
//                                   {sel && (
//                                     <NumberInput size="sm" maxW="90px" min={1} value={sel.quantity}
//                                       onChange={(val) => updateQuantity(svc.code, v.variant_code ?? null, Number(val))}>
//                                       <NumberInputField /><NumberInputStepper>
//                                         <NumberIncrementStepper /><NumberDecrementStepper />
//                                       </NumberInputStepper>
//                                     </NumberInput>
//                                   )}
//                                 </HStack>
//                               </HStack>
//                             );
//                           })
//                         ) : (
//                           (() => {
//                             const sel = selectedServices.find((s) => s.code === svc.code && !s.variant_code);
//                             return (
//                               <Box textAlign="right">
//                                 <Button size="sm" colorScheme={sel ? "red" : "brand"} onClick={() => toggleService(svc)}>
//                                   {sel ? "Remove" : "Add"}
//                                 </Button>
//                                 {sel && (
//                                   <NumberInput size="sm" maxW="90px" mt={2} min={1} value={sel.quantity}
//                                     onChange={(val) => updateQuantity(svc.code, null, Number(val))}>
//                                     <NumberInputField /><NumberInputStepper>
//                                       <NumberIncrementStepper /><NumberDecrementStepper />
//                                     </NumberInputStepper>
//                                   </NumberInput>
//                                 )}
//                               </Box>
//                             );
//                           })()
//                         )}
//                       </Stack>
//                     </Box>
//                   ))}
//                 </SimpleGrid>

//                 {selectedServices.length > 0 && (
//                   <Box mt={4} textAlign="right">
//                     <Text fontWeight="bold">Selected total: ₹{calcSelectedTotal()}</Text>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             <FormControl>
//               <FormLabel>Additional Notes</FormLabel>
//               <Textarea name="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
//             </FormControl>

//             <Button type="submit" colorScheme="brand" size="lg" isLoading={loading}>
//               Confirm Booking
//             </Button>
//           </VStack>
//         </form>
//       </Container>
//     </Box>
//   );
// }



// Version 2 

// import React, { useEffect, useState } from "react";
// import {
//   Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea,
//   Button, useToast, SimpleGrid, HStack, NumberInput,
//   NumberInputField, NumberInputStepper, NumberIncrementStepper,
//   NumberDecrementStepper, Badge, Stack,
// } from "@chakra-ui/react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// type Variant = { variant_code: string; label: string; price: number; image?: string };
// type ServiceRow = {
//   code: string; name: string; price: number; description?: string;
//   category?: string; image?: string | null; images?: string[];
//   pricingType?: string; variants?: Variant[];
// };
// type SelectedService = {
//   code: string; name: string; unitPrice: number; quantity: number;
//   variant_code?: string | null;
// };

// export default function Booking() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toast = useToast();

//   const serviceQuery = searchParams.get("service") || "general";
//   const packageType = searchParams.get("package") || "";

//   const [availableServices, setAvailableServices] = useState<ServiceRow[]>([]);
//   const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
//   const [formData, setFormData] = useState({
//     name: "", phone: "", email: "",
//     address: "", date: "", pickup: "", drop: "", notes: "",
//     service: serviceQuery, package: packageType,
//   });
//   const [loading, setLoading] = useState(false);

//   // --- Fetch services ---
//   useEffect(() => {
//     if (serviceQuery === "custom-services" || serviceQuery === "general") {
//       axios
//         .get("https://admee.in:3003/api/services/list?category=standalone")
//         .then((resp) => mergeAvailableWithSelected(resp.data?.services || []))
//         .catch(() => {
//           const fallback: ServiceRow[] = [
//             { code: "music", name: "Music Band", price: 0, description: "Music options", pricingType: "variant",
//               variants: [
//                 { variant_code: "basic-1hr", label: "Basic Band - 1hr", price: 5000 },
//                 { variant_code: "premium-2hr", label: "Premium Band - 2hr", price: 12000 },
//               ]
//             },
//             { code: "flower-garland", name: "Garlands / Flowers", price: 0, description: "Fresh garlands", pricingType: "variant",
//               variants: [
//                 { variant_code: "marigold", label: "Marigold Garland", price: 500 },
//                 { variant_code: "jasmine", label: "Jasmine Garland", price: 800 },
//               ]
//             },
//           ];
//           mergeAvailableWithSelected(fallback);
//         });
//     }
//   }, [serviceQuery, location.state]);

//   // --- Normalize incoming pre-selected ---
//   useEffect(() => {
//     const raw = (location.state as any)?.services;
//     if (!raw) return;
//     const normalized: SelectedService[] = raw.map((it: any) => ({
//       code: it.code,
//       name: it.name,
//       unitPrice: Number(it.unitPrice ?? it.price ?? 0),
//       quantity: Number(it.quantity ?? 1),
//       variant_code: it.variant_code ?? null,
//     }));
//     setSelectedServices(normalized);
//   }, [location.state]);

//   // Merge available services with pre-selected (so highlight works)
//   const mergeAvailableWithSelected = (base: ServiceRow[]) => {
//     const raw = (location.state as any)?.services || [];
//     const normalized: SelectedService[] = raw.map((it: any) => ({
//       code: it.code,
//       name: it.name,
//       unitPrice: Number(it.unitPrice ?? it.price ?? 0),
//       quantity: Number(it.quantity ?? 1),
//       variant_code: it.variant_code ?? null,
//     }));

//     const copy = [...base];
//     normalized.forEach((sel) => {
//       const idx = copy.findIndex((svc) => svc.code === sel.code);
//       if (idx >= 0) {
//         const svc = { ...copy[idx] };
//         if (sel.variant_code) {
//           if (!svc.variants) svc.variants = [];
//           const exists = svc.variants.find((v) => v.variant_code === sel.variant_code);
//           if (!exists) {
//             svc.variants.push({
//               variant_code: sel.variant_code,
//               label: sel.name.includes("—") ? sel.name.split("—")[1].trim() : sel.name,
//               price: sel.unitPrice,
//             });
//           }
//         }
//         copy[idx] = svc;
//       }
//     });

//     setAvailableServices(copy);
//   };

//   // --- Toggle base service ---
//   const toggleService = (svc: ServiceRow) => {
//     setSelectedServices((prev) => {
//       const exists = prev.find((s) => s.code === svc.code && !s.variant_code);
//       return exists
//         ? prev.filter((s) => !(s.code === svc.code && !s.variant_code))
//         : [...prev, { code: svc.code, name: svc.name, unitPrice: svc.price, quantity: 1, variant_code: null }];
//     });
//   };

//   // --- Toggle variant ---
//   const toggleVariant = (svc: ServiceRow, v: Variant) => {
//     setSelectedServices((prev) => {
//       const exists = prev.find((s) => s.code === svc.code && s.variant_code === v.variant_code);
//       return exists
//         ? prev.filter((s) => !(s.code === svc.code && s.variant_code === v.variant_code))
//         : [...prev, { code: svc.code, name: `${svc.name} — ${v.label}`, unitPrice: v.price, quantity: 1, variant_code: v.variant_code }];
//     });
//   };

//   const updateQuantity = (code: string, variant_code: string | null, qty: number) => {
//     setSelectedServices((prev) =>
//       prev.map((s) =>
//         s.code === code && s.variant_code === variant_code ? { ...s, quantity: Math.max(1, qty) } : s
//       )
//     );
//   };

//   const calcSelectedTotal = () =>
//     selectedServices.reduce((sum, s) => sum + s.unitPrice * s.quantity, 0);

//   // --- FORM SUBMIT ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload: any = {
//         customer: { name: formData.name, phone: formData.phone, email: formData.email },
//         serviceDate: formData.date,
//         address: formData.address || null,
//         pickupLocation: formData.pickup || null,
//         dropLocation: formData.drop || null,
//         notes: formData.notes,
//       };

//       if (formData.package) {
//         payload.packageCode = formData.package;
//       } else if (selectedServices.length) {
//         payload.services = selectedServices.map((s) => ({
//           code: s.code,             // ✅ always base code (music)
//           variant_code: s.variant_code ?? null, // ✅ variant if selected
//           quantity: s.quantity,
//         }));
//       } else {
//         toast({ title: "Select package or services", status: "error" });
//         return;
//       }

//       const { data } = await axios.post(`https://admee.in:3003/api/services/book`, payload);
//       toast({ title: "Booking successful", status: "success" });
//       navigate(`/booking/success?bookingId=${data.orderId}`, { state: data });
//     } catch (err: any) {
//       toast({ title: "Error", description: err.response?.data?.error || err.message, status: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box py={{ base: 10, md: 20 }} bg="gray.50">
//       <Container maxW="3xl">
//         <Heading as="h1" size="xl" mb={6} color="brand.600" textAlign="center">
//           Book Services
//         </Heading>

//         <form onSubmit={handleSubmit}>
//           <VStack spacing={6} align="stretch">
//             {/* --- Customer Form --- */}
//             <FormControl isRequired>
//               <FormLabel>Name</FormLabel>
//               <Input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Phone</FormLabel>
//               <Input name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Address</FormLabel>
//               <Textarea name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Preferred Date</FormLabel>
//               <Input type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
//             </FormControl>

//             {/* --- Services --- */}
//             {(serviceQuery === "custom-services" || serviceQuery === "general") && (
//               <Box borderWidth="1px" borderRadius="md" p={4}>
//                 <Heading size="md" mb={3}>Select Services</Heading>
//                 <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
//                   {availableServices.map((svc) => (
//                     <Box key={svc.code} p={3} borderWidth="1px" borderRadius="md">
//                       <Stack spacing={2}>
//                         <Text fontWeight="bold">{svc.name}</Text>
//                         <Text fontSize="sm" color="gray.600">{svc.description}</Text>
//                         {svc.pricingType !== "variant" && <Badge>₹{svc.price}</Badge>}

//                         {svc.variants?.length ? (
//                           svc.variants.map((v) => {
//                             const sel = selectedServices.find((s) => s.code === svc.code && s.variant_code === v.variant_code);
//                             return (
//                               <HStack key={v.variant_code} justify="space-between">
//                                 <Text>{v.label} - ₹{v.price}</Text>
//                                 <HStack>
//                                   <Button size="sm" colorScheme={sel ? "red" : "brand"} onClick={() => toggleVariant(svc, v)}>
//                                     {sel ? "Remove" : "Add"}
//                                   </Button>
//                                   {sel && (
//                                     <NumberInput size="sm" maxW="90px" min={1} value={sel.quantity}
//                                       onChange={(val) => updateQuantity(svc.code, v.variant_code, Number(val))}>
//                                       <NumberInputField />
//                                       <NumberInputStepper>
//                                         <NumberIncrementStepper />
//                                         <NumberDecrementStepper />
//                                       </NumberInputStepper>
//                                     </NumberInput>
//                                   )}
//                                 </HStack>
//                               </HStack>
//                             );
//                           })
//                         ) : (
//                           (() => {
//                             const sel = selectedServices.find((s) => s.code === svc.code && !s.variant_code);
//                             return (
//                               <Box textAlign="right">
//                                 <Button size="sm" colorScheme={sel ? "red" : "brand"} onClick={() => toggleService(svc)}>
//                                   {sel ? "Remove" : "Add"}
//                                 </Button>
//                                 {sel && (
//                                   <NumberInput size="sm" maxW="90px" mt={2} min={1} value={sel.quantity}
//                                     onChange={(val) => updateQuantity(svc.code, null, Number(val))}>
//                                     <NumberInputField />
//                                     <NumberInputStepper>
//                                       <NumberIncrementStepper />
//                                       <NumberDecrementStepper />
//                                     </NumberInputStepper>
//                                   </NumberInput>
//                                 )}
//                               </Box>
//                             );
//                           })()
//                         )}
//                       </Stack>
//                     </Box>
//                   ))}
//                 </SimpleGrid>

//                 {selectedServices.length > 0 && (
//                   <Box mt={4} textAlign="right">
//                     <Text fontWeight="bold">Selected total: ₹{calcSelectedTotal()}</Text>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             <FormControl>
//               <FormLabel>Additional Notes</FormLabel>
//               <Textarea name="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
//             </FormControl>

//             <Button type="submit" colorScheme="brand" size="lg" isLoading={loading}>
//               Confirm Booking
//             </Button>
//           </VStack>
//         </form>
//       </Container>
//     </Box>
//   );
// }


// version 3

import React, { useEffect, useState } from "react";
import {
  Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea,
  Button, useToast, SimpleGrid, HStack, NumberInput,
  NumberInputField, NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, Badge, Stack,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

type Variant = { variant_code: string; label: string; price: number; image?: string };
type ServiceRow = {
  code: string; name: string; price: number; description?: string;
  category?: string; image?: string | null; images?: string[];
  pricingType?: string; variants?: Variant[];
};
type SelectedService = {
  code: string; name: string; unitPrice: number; quantity: number;
  variant_code?: string | null;
};

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const serviceQuery = searchParams.get("service") || "general";
  const packageType = searchParams.get("package") || "";

  const [availableServices, setAvailableServices] = useState<ServiceRow[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    address: "", date: "", pickup: "", drop: "", notes: "",
    service: serviceQuery, package: packageType,
  });
  const [loading, setLoading] = useState(false);

  // --- Fetch services ---
  useEffect(() => {
    if (serviceQuery === "custom-services" || serviceQuery === "general") {

      const categoryCode =
      (location.state as any)?.services?.[0]?.category || "standalone";
      axios
        .get(`https://admee.in:3003/api/services/list?category=${categoryCode}`)
        .then((resp) => mergeAvailableWithSelected(resp.data?.services || []))
        .catch(() => {
          const fallback: ServiceRow[] = [
            {
              code: "music", name: "Music Band", price: 0,
              description: "Music options", pricingType: "variant",
              variants: [
                { variant_code: "basic-1hr", label: "Basic Band - 1hr", price: 5000 },
                { variant_code: "premium-2hr", label: "Premium Band - 2hr", price: 12000 },
              ]
            },
            {
              code: "flower-garland", name: "Garlands / Flowers", price: 0,
              description: "Fresh garlands", pricingType: "variant",
              variants: [
                { variant_code: "marigold", label: "Marigold Garland", price: 500 },
                { variant_code: "jasmine", label: "Jasmine Garland", price: 800 },
              ]
            },
          ];
          mergeAvailableWithSelected(fallback);
        });
    }
  }, [serviceQuery, location.state]);

  // --- Normalize incoming pre-selected ---
  useEffect(() => {
    const raw = (location.state as any)?.services;
    if (!raw) return;
    const normalized: SelectedService[] = raw.map((it: any) => ({
      code: it.code, // base service code (e.g. music)
      name: it.name,
      unitPrice: Number(it.unitPrice ?? it.price ?? 0),
      quantity: Number(it.quantity ?? 1),
      variant_code: it.variant_code ?? null,
    }));
    setSelectedServices(normalized);
  }, [location.state]);

  // --- Merge API services with preselected ---
  const mergeAvailableWithSelected = (base: ServiceRow[]) => {
    const raw = (location.state as any)?.services || [];
    const normalized: SelectedService[] = raw.map((it: any) => ({
      code: it.code,
      name: it.name,
      unitPrice: Number(it.unitPrice ?? it.price ?? 0),
      quantity: Number(it.quantity ?? 1),
      variant_code: it.variant_code ?? null,
    }));

    const copy = [...base];
    normalized.forEach((sel) => {
      const idx = copy.findIndex((svc) => svc.code === sel.code);
      if (idx >= 0) {
        const svc = { ...copy[idx] };
        if (sel.variant_code) {
          if (!svc.variants) svc.variants = [];
          const exists = svc.variants.find((v) => v.variant_code === sel.variant_code);
          if (!exists) {
            svc.variants.push({
              variant_code: sel.variant_code,
              label: sel.name.includes("—") ? sel.name.split("—")[1].trim() : sel.name,
              price: sel.unitPrice,
            });
          }
        }
        copy[idx] = svc;
      } else {
        copy.push({
          code: sel.code,
          name: sel.name,
          price: sel.unitPrice,
          variants: sel.variant_code
            ? [{ variant_code: sel.variant_code, label: sel.name, price: sel.unitPrice }]
            : [],
        } as ServiceRow);
      }
    });

    setAvailableServices(copy);
  };

  // --- Toggle base service ---
  const toggleService = (svc: ServiceRow) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.code === svc.code && !s.variant_code);
      return exists
        ? prev.filter((s) => !(s.code === svc.code && !s.variant_code))
        : [...prev, { code: svc.code, name: svc.name, unitPrice: svc.price, quantity: 1, variant_code: null }];
    });
  };

  // --- Toggle variant ---
  const toggleVariant = (svc: ServiceRow, v: Variant) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.code === svc.code && s.variant_code === v.variant_code);
      return exists
        ? prev.filter((s) => !(s.code === svc.code && s.variant_code === v.variant_code))
        : [...prev, {
            code: svc.code,
            name: `${svc.name} — ${v.label}`,
            unitPrice: v.price,
            quantity: 1,
            variant_code: v.variant_code,
          }];
    });
  };

  const updateQuantity = (code: string, variant_code: string | null, qty: number) => {
    setSelectedServices((prev) =>
      prev.map((s) =>
        s.code === code && s.variant_code === variant_code ? { ...s, quantity: Math.max(1, qty) } : s
      )
    );
  };

  const calcSelectedTotal = () =>
    selectedServices.reduce((sum, s) => sum + s.unitPrice * s.quantity, 0);

  // --- Submit booking ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = {
        customer: { name: formData.name, phone: formData.phone, email: formData.email },
        serviceDate: formData.date,
        address: formData.address || null,
        pickupLocation: formData.pickup || null,
        dropLocation: formData.drop || null,
        notes: formData.notes,
      };

      if (formData.package) {
        payload.packageCode = formData.package;
      } else if (selectedServices.length) {
        payload.services = selectedServices.map((s) => ({
          code: s.code, // base code
          variant_code: s.variant_code ?? null,
          quantity: s.quantity,
        }));
      } else {
        toast({ title: "Select package or services", status: "error" });
        return;
      }

      const { data } = await axios.post(`https://admee.in:3003/api/services/book`, payload);
      toast({ title: "Booking successful", status: "success" });
      navigate(`/booking/success?bookingId=${data.orderId}`, { state: data });
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.error || err.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={{ base: 10, md: 20 }} bg="gray.50">
      <Container maxW="3xl">
        <Heading as="h1" size="xl" mb={6} color="brand.600" textAlign="center">
          Book Services
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {/* Customer Form */}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Date</FormLabel>
              <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </FormControl>

            {/* Services */}
            {(serviceQuery === "custom-services" || serviceQuery === "general") && (
              <Box borderWidth="1px" borderRadius="md" p={4}>
                <Heading size="md" mb={3}>Select Services</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {availableServices.map((svc) => (
                    <Box key={svc.code} p={3} borderWidth="1px" borderRadius="md">
                      <Stack spacing={2}>
                        <Text fontWeight="bold">{svc.name}</Text>
                        <Text fontSize="sm" color="gray.600">{svc.description}</Text>
                        {svc.pricingType !== "variant" && <Badge>₹{svc.price}</Badge>}

                        {svc.variants?.length ? (
                          svc.variants.map((v) => {
                            const sel = selectedServices.find((s) => s.code === svc.code && s.variant_code === v.variant_code);
                            return (
                              <HStack key={v.variant_code} justify="space-between">
                                <Text>{v.label} - ₹{v.price}</Text>
                                <HStack>
                                  <Button size="sm" colorScheme={sel ? "red" : "brand"} onClick={() => toggleVariant(svc, v)}>
                                    {sel ? "Remove" : "Add"}
                                  </Button>
                                  {sel && (
                                    <NumberInput size="sm" maxW="90px" min={1} value={sel.quantity}
                                      onChange={(val) => updateQuantity(svc.code, v.variant_code, Number(val))}>
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                  )}
                                </HStack>
                              </HStack>
                            );
                          })
                        ) : (
                          (() => {
                            const sel = selectedServices.find((s) => s.code === svc.code && !s.variant_code);
                            return (
                              <Box textAlign="right">
                                <Button size="sm" colorScheme={sel ? "red" : "brand"} onClick={() => toggleService(svc)}>
                                  {sel ? "Remove" : "Add"}
                                </Button>
                                {sel && (
                                  <NumberInput size="sm" maxW="90px" mt={2} min={1} value={sel.quantity}
                                    onChange={(val) => updateQuantity(svc.code, null, Number(val))}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                )}
                              </Box>
                            );
                          })()
                        )}
                      </Stack>
                    </Box>
                  ))}
                </SimpleGrid>

                {selectedServices.length > 0 && (
                  <Box mt={4} textAlign="right">
                    <Text fontWeight="bold">Selected total: ₹{calcSelectedTotal()}</Text>
                  </Box>
                )}
              </Box>
            )}

            <FormControl>
              <FormLabel>Additional Notes</FormLabel>
              <Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
            </FormControl>

            <Button type="submit" colorScheme="brand" size="lg" isLoading={loading}>
              Confirm Booking
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
}


