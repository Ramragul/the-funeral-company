// Version 1 : 


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Flex,
//   Heading,
//   Text,
//   Image,
//   Stack,
//   Button,
//   RadioGroup,
//   Radio,
//   Input,
//   HStack,
//   Badge,
//   Divider,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
//   useToast,
//   IconButton,
//   Spinner,
//   Center
// } from '@chakra-ui/react';
// import { ArrowBackIcon } from '@chakra-ui/icons';
// import { useNavigate, useParams } from 'react-router-dom';

// type CoffinDetail = {
//   id: string;
//   name: string;
//   basePrice: number;
//   images: string[];
//   description: string;
//   sizes: { id: string; label: string; multiplier: number }[];
//   customizations: { id: string; label: string; price: number }[];
// };

// const SAMPLE_COFFINS: Record<string, CoffinDetail> = {
//     "coffin-elm-01": {
//       id: "coffin-elm-01",
//       name: "Regal Elm Coffin",
//       basePrice: 12500,
//       images: [
//         "https://placehold.co/800x500?text=Regal+Elm+Front",
//         "https://placehold.co/800x500?text=Regal+Elm+Side",
//         "https://placehold.co/800x500?text=Regal+Elm+Interior"
//       ],
//       description: "A handcrafted elm coffin with satin interior and polished brass handles. Designed with dignity and tradition in mind.",
//       sizes: [
//         { id: "standard", label: "Standard (up to 6 ft)", multiplier: 1 },
//         { id: "oversize", label: "Oversize (+10% price)", multiplier: 1.1 }
//       ],
//       customizations: [
//         { id: "embroidered-panel", label: "Embroidered Head Panel", price: 1499 },
//         { id: "velvet-interior", label: "Velvet Interior Upgrade", price: 2499 },
//         { id: "engraving", label: "Engraving (Name / Short Msg)", price: 999 }
//       ]
//     },
//     "coffin-rosewood-02": {
//       id: "coffin-rosewood-02",
//       name: "Rosewood Deluxe",
//       basePrice: 18500,
//       images: [
//         "https://placehold.co/800x500?text=Rosewood+Front",
//         "https://placehold.co/800x500?text=Rosewood+Detail",
//         "https://placehold.co/800x500?text=Rosewood+Interior"
//       ],
//       description: "Elegant rosewood coffin with premium velvet lining and ornate handles. A refined choice for a dignified farewell.",
//       sizes: [
//         { id: "standard", label: "Standard (up to 6 ft)", multiplier: 1 },
//         { id: "oversize", label: "Oversize (+15% price)", multiplier: 1.15 }
//       ],
//       customizations: [
//         { id: "custom-panel", label: "Custom Embroidered Panel", price: 1999 },
//         { id: "gold-handles", label: "Gold-plated Handles", price: 2999 },
//         { id: "engraving", label: "Engraving (Cross / Symbol)", price: 1299 }
//       ]
//     },
//     "coffin-oak-03": {
//       id: "coffin-oak-03",
//       name: "Classic Oak",
//       basePrice: 15500,
//       images: [
//         "https://placehold.co/800x500?text=Classic+Oak+Front",
//         "https://placehold.co/800x500?text=Classic+Oak+Handles",
//         "https://placehold.co/800x500?text=Classic+Oak+Interior"
//       ],
//       description: "Traditional oak coffin with brass handles and satin lining. A timeless option with understated elegance.",
//       sizes: [
//         { id: "standard", label: "Standard (up to 6 ft)", multiplier: 1 },
//         { id: "extra-wide", label: "Extra Wide (+12% price)", multiplier: 1.12 }
//       ],
//       customizations: [
//         { id: "engraving", label: "Name Engraving", price: 899 },
//         { id: "luxury-lining", label: "Luxury Satin Lining", price: 2199 },
//         { id: "rosary-holder", label: "Built-in Rosary Holder", price: 1299 }
//       ]
//     }
//   };
  

// export const CoffinDetailPage: React.FC = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const { id } = useParams();

//   const [product, setProduct] = useState<CoffinDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [mainIndex, setMainIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
//   const [deliveryDate, setDeliveryDate] = useState('');
//   const [collectionDate, setCollectionDate] = useState('');



// // useEffect(() => {
// //     // TEMP MOCK DATA until API is ready
// //     const data = SAMPLE_COFFINS[id || ""];
// //     if (data) {
// //       setProduct(data);
// //       setSelectedSize(data.sizes[0]?.id);
// //     }
// //     setLoading(false);
// //   }, [id]);


// useEffect(() => {
//   async function fetchProduct() {
//     try {
//       const res = await fetch(`https://admee.in:3003/api/tfc/products/${id}`);
//       const data = await res.json();

//       setProduct({
//         id: data.product.id,
//         name: data.product.name,
//         basePrice: Number(data.product.base_price),
//         description: data.product.description,
//         images: data.images.map((i: any) => i.url),
//         sizes: data.sizes.map((s: any) => ({
//           id: s.id || s.label, 
//           label: s.label,
//           multiplier: Number(s.multiplier)
//         })),
//         customizations: data.customizations.map((c: any) => ({
//           id: c.id || c.label,
//           label: c.label,
//           price: Number(c.price)
//         }))
//       });

//       setSelectedSize(data.sizes[0]?.id);
//     } catch (err) {
//       console.error("❌ Error fetching coffin:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (id) fetchProduct();
// }, [id]);

  

//   if (loading) {
//     return (
//       <Center h="60vh">
//         <Spinner size="xl" color="brand.500" />
//       </Center>
//     );
//   }

//   if (!product) {
//     return <Text>Product not found</Text>;
//   }

//   const sizeObj = product.sizes.find((s) => s.id === selectedSize)!;
//   const customsTotal = selectedCustomizations.reduce((acc, id) => {
//     const c = product.customizations.find((x) => x.id === id);
//     return acc + (c ? c.price : 0);
//   }, 0);
//   const total = Math.round((product.basePrice * sizeObj.multiplier + customsTotal) * quantity);

//   function goBack() {
//     navigate(-1);
//   }

//   function handleToggleCustomization(id: string) {
//     setSelectedCustomizations((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
//   }

//   function handleBookNow() {
//     if (!deliveryDate) return toast({ status: 'error', title: 'Select delivery date' });
//     if (!collectionDate) return toast({ status: 'error', title: 'Select collection date' });
//     if (new Date(collectionDate) < new Date(deliveryDate)) return toast({ status: 'error', title: 'Return date must be after delivery' });

// //     navigate('/booking', {
// //       state: {
// //         productId: product.id,
// //         name: product.name,
// //         basePrice: product.basePrice,
// //         size: selectedSize,
// //         customizations: selectedCustomizations,
// //         quantity,
// //         deliveryDate,
// //         collectionDate,
// //         total
// //       }
// //     });


// navigate('/coffin/purchase', {
//     state: {
//       productId: product.id,
//       name: product.name,
//       basePrice: product.basePrice,
//       size: selectedSize,
//       customizations: selectedCustomizations,
//       quantity,
//       deliveryDate,
//       collectionDate,
//       total
//     }
//   });
  
//   }

//   return (
//     <Box maxW="7xl" mx="auto" p={4}>
//       <Flex align="center" mb={4}>
//         <IconButton aria-label="Back" icon={<ArrowBackIcon />} onClick={goBack} mr={3} />
//         <Heading size="lg" color="brand.700">{product.name}</Heading>
//         <Badge ml={4} colorScheme="blue">Coffin</Badge>
//       </Flex>

//       <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
//         <Box flex="1">
//           <Image src={product.images[mainIndex]} alt={product.name} borderRadius="md" boxShadow="md" w="100%" h="400px" objectFit="cover" />

//           <HStack mt={3} spacing={3} overflowX="auto">
//             {product.images.map((src, idx) => (
//               <Box
//                 key={src}
//                 minW="80px"
//                 cursor="pointer"
//                 onClick={() => setMainIndex(idx)}
//                 borderWidth={mainIndex === idx ? '2px' : '1px'}
//                 borderColor={mainIndex === idx ? 'brand.500' : 'gray.200'}
//                 borderRadius="md"
//               >
//                 <Image src={src} alt={`thumb-${idx}`} boxSize="80px" objectFit="cover" borderRadius="md" />
//               </Box>
//             ))}
//           </HStack>

//           <Box mt={4}>
//             <Heading size="md">Description</Heading>
//             <Text mt={2}>{product.description}</Text>
//           </Box>
//         </Box>

//         <Box w={{ base: '100%', md: '380px' }} borderWidth="1px" borderRadius="md" p={4} boxShadow="sm">
//           <Stack spacing={3}>
//             <Text fontSize="xl" fontWeight="semibold">Price: ₹{product.basePrice.toLocaleString()}</Text>
//             <Divider />

//             <Box>
//               <Text fontWeight="medium">Size</Text>
//               <RadioGroup value={selectedSize} onChange={(v) => setSelectedSize(v)}>
//                 <Stack>
//                   {product.sizes.map((s) => (
//                     <Radio key={s.id} value={s.id}>{s.label} {s.multiplier !== 1 ? `(+${Math.round((s.multiplier - 1) * 100)}%)` : ''}</Radio>
//                   ))}
//                 </Stack>
//               </RadioGroup>
//             </Box>

//             <Box>
//               <Text fontWeight="medium">Customizations</Text>
//               <Stack>
//                 {product.customizations.map((c) => (
//                   <Button
//                     key={c.id}
//                     variant={selectedCustomizations.includes(c.id) ? 'solid' : 'outline'}
//                     onClick={() => handleToggleCustomization(c.id)}
//                     justifyContent="space-between"
//                   >
//                     <Text>{c.label}</Text>
//                     <Text>₹{c.price}</Text>
//                   </Button>
//                 ))}
//               </Stack>
//             </Box>

//             <Box>
//               <Text fontWeight="medium">Quantity</Text>
//               <NumberInput value={quantity} min={1} max={5} onChange={(v) => setQuantity(Number(v))}>
//                 <NumberInputField />
//                 <NumberInputStepper>
//                   <NumberIncrementStepper />
//                   <NumberDecrementStepper />
//                 </NumberInputStepper>
//               </NumberInput>
//             </Box>

//             <Box>
//               <Text fontWeight="medium">Delivery Date</Text>
//               <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
//             </Box>

//             <Box>
//               <Text fontWeight="medium">Collection/Return Date</Text>
//               <Input type="date" value={collectionDate} onChange={(e) => setCollectionDate(e.target.value)} />
//             </Box>

//             <Box>
//               <Text fontWeight="medium">Total</Text>
//               <Heading size="md">₹{total.toLocaleString()}</Heading>
//             </Box>

//             <Flex gap={2}>
//               <Button colorScheme="brand" flex={1} onClick={handleBookNow}>Book Now</Button>
//               <Button variant="outline" flex={1}>Add to Cart</Button>
//             </Flex>
//           </Stack>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };



// Version 2 

import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  RadioGroup,
  Radio,
  Input,
  HStack,
  Badge,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  IconButton,
  Spinner,
  Center
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

type CoffinDetail = {
  id: string;
  name: string;
  basePrice: number;
  images: string[];
  description: string;
  sizes: { id: string | number; label: string; multiplier: number }[];
  customizations: { id: string; label: string; price: number }[];
};

export const CoffinDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const [product, setProduct] = useState<CoffinDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [mainIndex, setMainIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [collectionDate, setCollectionDate] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://admee.in:3003/api/tfc/products/${id}`);
        const data = await res.json();

        const sizes = data.sizes.map((s: any) => ({
          id: String(s.id),  // ✅ use backend id as string
          label: s.label,
          multiplier: Number(s.multiplier)
        }));

        const customizations = data.customizations.map((c: any) => ({
          id: String(c.id), // ✅ backend already provides unique id
          label: c.label,
          price: Number(c.price)
        }));

        setProduct({
          id: data.product.id,
          name: data.product.name,
          basePrice: Number(data.product.base_price),
          description: data.product.description,
          images: data.images.map((i: any) => i.url),
          sizes,
          customizations
        });

        if (sizes.length > 0) {
          setSelectedSize(String(sizes[0].id)); // ✅ default to first size
        }
      } catch (err) {
        console.error("❌ Error fetching coffin:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const sizeObj = product.sizes.find((s) => String(s.id) === selectedSize) || product.sizes[0];
  const multiplier = sizeObj ? sizeObj.multiplier : 1;

  const customsTotal = selectedCustomizations.reduce((acc, cid) => {
    const c = product.customizations.find((x) => String(x.id) === cid);
    return acc + (c ? c.price : 0);
  }, 0);

  const total = Math.round((product.basePrice * multiplier + customsTotal) * quantity);

  function goBack() {
    navigate(-1);
  }

  function handleToggleCustomization(cid: string) {
    setSelectedCustomizations((prev) =>
      prev.includes(cid) ? prev.filter((p) => p !== cid) : [...prev, cid]
    );
  }

  function handleBookNow() {
    if (!deliveryDate) return toast({ status: 'error', title: 'Select delivery date' });
    if (!collectionDate) return toast({ status: 'error', title: 'Select collection date' });
    if (new Date(collectionDate) < new Date(deliveryDate))
      return toast({ status: 'error', title: 'Return date must be after delivery' });

    navigate('/coffin/purchase', {
      state: {
        productId: product.id,
        name: product.name,
        basePrice: product.basePrice,
        size: selectedSize,
        customizations: selectedCustomizations,
        quantity,
        deliveryDate,
        collectionDate,
        total
      }
    });
  }

  return (
    <Box maxW="7xl" mx="auto" p={4}>
      <Flex align="center" mb={4}>
        <IconButton aria-label="Back" icon={<ArrowBackIcon />} onClick={goBack} mr={3} />
        <Heading size="lg" color="brand.700">{product.name}</Heading>
        <Badge ml={4} colorScheme="blue">Coffin</Badge>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        {/* Left side */}
        <Box flex="1">
          <Image
            src={product.images[mainIndex]}
            alt={product.name}
            borderRadius="md"
            boxShadow="md"
            w="100%"
            h="400px"
            objectFit="cover"
          />

          <HStack mt={3} spacing={3} overflowX="auto">
            {product.images.map((src, idx) => (
              <Box
                key={src}
                minW="80px"
                cursor="pointer"
                onClick={() => setMainIndex(idx)}
                borderWidth={mainIndex === idx ? '2px' : '1px'}
                borderColor={mainIndex === idx ? 'brand.500' : 'gray.200'}
                borderRadius="md"
              >
                <Image src={src} alt={`thumb-${idx}`} boxSize="80px" objectFit="cover" borderRadius="md" />
              </Box>
            ))}
          </HStack>

          <Box mt={4}>
            <Heading size="md">Description</Heading>
            <Text mt={2}>{product.description}</Text>
          </Box>
        </Box>

        {/* Right side */}
        <Box w={{ base: '100%', md: '380px' }} borderWidth="1px" borderRadius="md" p={4} boxShadow="sm">
          <Stack spacing={3}>
            <Text fontSize="xl" fontWeight="semibold">Price: ₹{product.basePrice.toLocaleString()}</Text>
            <Divider />

            {/* Sizes */}
            <Box>
              <Text fontWeight="medium">Size</Text>
              <RadioGroup value={selectedSize} onChange={(v) => setSelectedSize(v)}>
                <Stack>
                  {product.sizes.map((s) => (
                    <Radio key={s.id} value={String(s.id)}>
                      {s.label} {s.multiplier !== 1 ? `(+${Math.round((s.multiplier - 1) * 100)}%)` : ''}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>

            {/* Customizations */}
            <Box>
              <Text fontWeight="medium">Customizations</Text>
              <Stack>
                {product.customizations.map((c) => (
                  <Button
                    key={c.id}
                    variant={selectedCustomizations.includes(String(c.id)) ? 'solid' : 'outline'}
                    onClick={() => handleToggleCustomization(String(c.id))}
                    justifyContent="space-between"
                  >
                    <Text>{c.label}</Text>
                    <Text>₹{c.price}</Text>
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* Quantity */}
            <Box>
              <Text fontWeight="medium">Quantity</Text>
              <NumberInput value={quantity} min={1} max={5} onChange={(v) => setQuantity(Number(v))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            {/* Dates */}
            <Box>
              <Text fontWeight="medium">Expected Delivery Date</Text>
              <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </Box>

            <Box>
              <Text fontWeight="medium">Event Date</Text>
              <Input type="date" value={collectionDate} onChange={(e) => setCollectionDate(e.target.value)} />
            </Box>

            {/* Total */}
            <Box>
              <Text fontWeight="medium">Total</Text>
              <Heading size="md">₹{total.toLocaleString()}</Heading>
            </Box>

            <Flex gap={2}>
              <Button colorScheme="brand" flex={1} onClick={handleBookNow}>Book Now</Button>
              <Button variant="outline" flex={1}>Add to Cart</Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
