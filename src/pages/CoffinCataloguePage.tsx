// Version 1

// CoffinCataloguePage.tsx (React + TypeScript + Chakra UI)
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   GridItem,
//   Heading,
//   Text,
//   Image,
//   Stack,
//   Button,
//   Badge,
//   Spinner,
//   Center
// } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// // Type for coffin product
// type Coffin = {
//   id: string;
//   name: string;
//   basePrice: number;
//   thumbnail: string;
//   shortDescription: string;
// };

// export const CoffinCataloguePage: React.FC = () => {
//   const navigate = useNavigate();
//   const [coffins, setCoffins] = useState<Coffin[]>([]);
//   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchCoffins() {
// //       try {
// //         // Replace with your backend API endpoint
// //         const res = await fetch('/api/coffins');
// //         const data = await res.json();
// //         setCoffins(data);
// //       } catch (err) {
// //         console.error('Error fetching coffins', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchCoffins();
// //   }, []);

// useEffect(() => {
//     // TEMP SAMPLE DATA FOR TESTING
//     const sampleCoffins: Coffin[] = [
//       {
//         id: "coffin-elm-01",
//         name: "Regal Elm Coffin",
//         basePrice: 12500,
//         thumbnail: "https://placehold.co/400x250?text=Regal+Elm",
//         shortDescription: "Handcrafted elm coffin with satin interior."
//       },
//       {
//         id: "coffin-rosewood-02",
//         name: "Rosewood Deluxe",
//         basePrice: 18500,
//         thumbnail: "https://placehold.co/400x250?text=Rosewood+Deluxe",
//         shortDescription: "Elegant rosewood coffin with velvet lining."
//       },
//       {
//         id: "coffin-oak-03",
//         name: "Classic Oak",
//         basePrice: 15500,
//         thumbnail: "https://placehold.co/400x250?text=Classic+Oak",
//         shortDescription: "Traditional oak coffin with brass handles."
//       }
//     ];
  
//     setCoffins(sampleCoffins);
//     setLoading(false);
//   }, []);
  

//   if (loading) {
//     return (
//       <Center h="60vh">
//         <Spinner size="xl" color="brand.500" />
//       </Center>
//     );
//   }

//   return (
//     <Box maxW="7xl" mx="auto" px={4} py={8}>
//       <Heading mb={6} textAlign="center" color="brand.700">
//         Choose Your Coffin
//       </Heading>

//       <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
//         {coffins.map((coffin) => (
//           <GridItem
//             key={coffin.id}
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             _hover={{ shadow: 'md', transform: 'scale(1.02)', transition: '0.2s' }}
//             cursor="pointer"
//             onClick={() => navigate(`/coffins/${coffin.id}`)}
//           >
//             <Image src={coffin.thumbnail} alt={coffin.name} w="100%" h="200px" objectFit="cover" />
//             <Box p={4}>
//               <Heading size="md" color="brand.600">{coffin.name}</Heading>
//               <Text mt={2} noOfLines={2}>{coffin.shortDescription}</Text>
//               <Badge mt={2} colorScheme="blue">From ₹{coffin.basePrice.toLocaleString()}</Badge>
//             </Box>
//           </GridItem>
//         ))}

//         {/* Special card for Customised Coffin */}
//         <GridItem
//           borderWidth="2px"
//           borderStyle="dashed"
//           borderRadius="lg"
//           p={6}
//           textAlign="center"
//           cursor="pointer"
//           _hover={{ shadow: 'md', transform: 'scale(1.02)', transition: '0.2s', borderColor: 'brand.400' }}
//           onClick={() => navigate('/coffins/customise')}
//         >
//           <Stack spacing={3} align="center" justify="center" h="100%">
//             <Image src="https://placehold.co/200x150?text=Custom" alt="Custom Coffin" borderRadius="md" />
//             <Heading size="md" color="brand.600">Customised Coffin</Heading>
//             <Text fontSize="sm" color="gray.600">Design your own coffin with fabric, engravings, and personal touches.</Text>
//             <Button colorScheme="brand">Start Customising</Button>
//           </Stack>
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// };


// Version 2 


import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  Badge,
  Spinner,
  Center
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Type for coffin product
type Coffin = {
  id: string;
  name: string;
  basePrice: number;
  thumbnail: string;
  shortDescription: string;
};

export const CoffinCataloguePage: React.FC = () => {
  const navigate = useNavigate();
  const [coffins, setCoffins] = useState<Coffin[]>([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCoffins() {
//       try {
//         // Replace with your backend API endpoint
//         const res = await fetch('/api/coffins');
//         const data = await res.json();
//         setCoffins(data);
//       } catch (err) {
//         console.error('Error fetching coffins', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCoffins();
//   }, []);

useEffect(() => {
  async function fetchCoffins() {
    try {
      const res = await fetch("https://admee.in:3003/api/tfc/products");
      const data = await res.json();

      // Map backend fields -> frontend type
      const mapped = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        basePrice: Number(item.base_price),   // 👈 fix
        thumbnail: item.thumbnail,
        shortDescription: item.shortDescription,
      }));

      setCoffins(mapped);
    } catch (err) {
      console.error("❌ Error fetching coffins", err);
    } finally {
      setLoading(false);
    }
  }
  fetchCoffins();
}, []);


if (loading) {
  return (
    <Center h="60vh">
      <Spinner size="xl" color="brand.500" />
    </Center>
  );
}
  
  return (
    <Box maxW="7xl" mx="auto" px={4} py={8}>
      <Heading mb={6} textAlign="center" color="brand.700">
        Choose Your Coffin
      </Heading>

      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
        {coffins.map((coffin) => (
          <GridItem
            key={coffin.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ shadow: 'md', transform: 'scale(1.02)', transition: '0.2s' }}
            cursor="pointer"
            onClick={() => navigate(`/coffins/${coffin.id}`)}
          >
            <Image src={coffin.thumbnail} alt={coffin.name} w="100%" h="200px" objectFit="cover" />
            <Box p={4}>
              <Heading size="md" color="brand.600">{coffin.name}</Heading>
              <Text mt={2} noOfLines={2}>{coffin.shortDescription}</Text>
              <Badge mt={2} colorScheme="blue">From ₹{coffin.basePrice.toLocaleString()}</Badge>
            </Box>
          </GridItem>
        ))}

        {/* Special card for Customised Coffin */}
        {/* <GridItem
          borderWidth="2px"
          borderStyle="dashed"
          borderRadius="lg"
          p={6}
          textAlign="center"
          cursor="pointer"
          _hover={{ shadow: 'md', transform: 'scale(1.02)', transition: '0.2s', borderColor: 'brand.400' }}
          onClick={() => navigate('/coffins/customise')}
        >
          <Stack spacing={3} align="center" justify="center" h="100%">
            <Image src="https://placehold.co/200x150?text=Custom" alt="Custom Coffin" borderRadius="md" />
            <Heading size="md" color="brand.600">Customised Coffin</Heading>
            <Text fontSize="sm" color="gray.600">Design your own coffin with fabric, engravings, and personal touches.</Text>
            <Button colorScheme="brand">Start Customising</Button>
          </Stack>
        </GridItem> */}
      </Grid>
    </Box>
  );
};

