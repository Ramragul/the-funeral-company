// CoffinPage.tsx (React + TypeScript + Chakra UI)x/
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Radio,
  RadioGroup,
  HStack,
  Badge,
  Divider,
  useToast,
  IconButton
} from '@chakra-ui/react';


import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

type Coffin = {
  id: string;
  name: string;
  basePrice: number;
  images: string[];
  description: string;
  sizes: { id: string; label: string; multiplier: number }[];
  customizations: { id: string; label: string; price: number }[];
};

const SAMPLE_COFFIN: Coffin = {
  id: 'coffin-elm-01',
  name: 'Regal Elm Coffin',
  basePrice: 12500,
  images: [
    'https://placehold.co/900x600?text=Regal+Elm+1',
    'https://placehold.co/900x600?text=Regal+Elm+2',
    'https://placehold.co/900x600?text=Regal+Elm+3'
  ],
  description:
    'Handcrafted elm coffin with satin interior. Available in standard and oversized widths. Personalization and custom fabrics available.',
  sizes: [
    { id: 'standard', label: 'Standard (up to 6 ft)', multiplier: 1 },
    { id: 'oversize', label: 'Oversize (+10% price)', multiplier: 1.1 }
  ],
  customizations: [
    { id: 'embroidered-panel', label: 'Embroidered Head Panel', price: 1499 },
    { id: 'velvet-interior', label: 'Upgrade Velvet Interior', price: 2499 },
    { id: 'engraving', label: 'Engraving (name/short msg)', price: 999 }
  ]
};

export const CoffinPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [product] = useState<Coffin>(SAMPLE_COFFIN);
  const [mainIndex, setMainIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].id);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [collectionDate, setCollectionDate] = useState('');

  const sizeObj = product.sizes.find((s) => s.id === selectedSize)!;
  const customsTotal = selectedCustomizations.reduce((acc, id) => {
    const c = product.customizations.find((x) => x.id === id);
    return acc + (c ? c.price : 0);
  }, 0);

  const total = Math.round((product.basePrice * sizeObj.multiplier + customsTotal) * quantity);

  function goBack() {
    navigate(-1);
  }

  function handleToggleCustomization(id: string) {
    setSelectedCustomizations((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  function handleBookNow() {
    if (!deliveryDate) return toast({ status: 'error', title: 'Select delivery date' });
    if (!collectionDate) return toast({ status: 'error', title: 'Select collection/return date' });
    if (new Date(collectionDate) < new Date(deliveryDate))
      return toast({ status: 'error', title: 'Return date must be after delivery date' });

    navigate('/booking', {
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

  function handleAddToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ productId: product.id, name: product.name, quantity, size: selectedSize, customizations: selectedCustomizations, total });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast({ status: 'success', title: 'Added to cart' });
  }

  return (
    <Box maxW="container.lg" mx="auto" p={4}>
      <Flex align="center" mb={4}>
        <IconButton aria-label="Back" icon={<ArrowBackIcon />} onClick={goBack} mr={3} />
        <Heading size="lg">{product.name}</Heading>
        <Badge ml={4} colorScheme="pink">New</Badge>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex="1">
          <Image src={product.images[mainIndex]} alt={product.name} borderRadius="md" boxShadow="md" w="100%" h="400px" objectFit="cover" />

          <HStack mt={3} spacing={3} overflowX="auto">
            {product.images.map((src, idx) => (
              <Box key={src} minW="80px" cursor="pointer" onClick={() => setMainIndex(idx)} borderWidth={mainIndex === idx ? '2px' : '1px'} borderColor={mainIndex === idx ? 'pink.400' : 'gray.200'} borderRadius="md">
                <Image src={src} alt={`thumb-${idx}`} boxSize="80px" objectFit="cover" borderRadius="md" />
              </Box>
            ))}
          </HStack>

          <Box mt={4}>
            <Heading size="md">Description</Heading>
            <Text mt={2}>{product.description}</Text>
          </Box>
        </Box>

        <Box w={{ base: '100%', md: '380px' }} borderWidth="1px" borderRadius="md" p={4} boxShadow="sm">
          <Stack spacing={3}>
            <Text fontSize="xl" fontWeight="semibold">Price: ₹{product.basePrice.toLocaleString()}</Text>
            <Divider />

            <Box>
              <Text fontWeight="medium">Size</Text>
              <RadioGroup value={selectedSize} onChange={(v) => setSelectedSize(v)}>
                <Stack>
                  {product.sizes.map((s) => (
                    <Radio key={s.id} value={s.id}>{s.label} {s.multiplier !== 1 ? `(+${Math.round((s.multiplier - 1) * 100)}%)` : ''}</Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>

            <Box>
              <Text fontWeight="medium">Customizations</Text>
              <Stack>
                {product.customizations.map((c) => (
                  <Button key={c.id} variant={selectedCustomizations.includes(c.id) ? 'solid' : 'outline'} onClick={() => handleToggleCustomization(c.id)} justifyContent="space-between">
                    <Text>{c.label}</Text>
                    <Text>₹{c.price}</Text>
                  </Button>
                ))}
              </Stack>
            </Box>

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

            <Box>
              <Text fontWeight="medium">Delivery Date</Text>
              <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </Box>

            <Box>
              <Text fontWeight="medium">Collection/Return Date</Text>
              <Input type="date" value={collectionDate} onChange={(e) => setCollectionDate(e.target.value)} />
            </Box>

            <Box>
              <Text fontWeight="medium">Total</Text>
              <Heading size="md">₹{total.toLocaleString()}</Heading>
            </Box>

            <Flex gap={2}>
              <Button colorScheme="pink" flex={1} onClick={handleBookNow}>Book Now</Button>
              <Button variant="outline" flex={1} onClick={handleAddToCart}>Add to Cart</Button>
            </Flex>

            <Button variant="ghost" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
