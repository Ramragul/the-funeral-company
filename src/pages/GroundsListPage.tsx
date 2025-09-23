// Version 1 

// import React, { useEffect, useState } from "react";
// import { Box, Input, Grid, GridItem, Image, Heading, Text, Badge, Spinner, Center } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// type Ground = {
//   id: string;
//   name: string;
//   city?: string;
//   pincode?: string;
//   thumbnail?: string | null;
// };

// export default function GroundsListPage() {
//   const [q, setQ] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [grounds, setGrounds] = useState<Ground[]>([]);
//   const navigate = useNavigate();

//   async function fetchData() {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://admee.in:3003/api/tfc/grounds", { params: { q, city, pincode } });
//       setGrounds(res.data.grounds || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { fetchData(); }, []);

//   return (
//     <Box p={6} maxW="7xl" mx="auto">
//       <Heading mb={4}>Funeral Grounds</Heading>
//       <Box display="flex" gap={3} mb={4}>
//         <Input placeholder="Search by name or address" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key==='Enter' && fetchData()} />
//         <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key==='Enter' && fetchData()} />
//         <Input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} onKeyDown={(e) => e.key==='Enter' && fetchData()} />
//       </Box>

//       {loading ? (
//         <Center py={20}><Spinner size="xl" /></Center>
//       ) : (
//         <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
//           {grounds.map(g => (
//             <GridItem key={g.id} borderWidth="1px" borderRadius="md" overflow="hidden" cursor="pointer"
//               onClick={() => navigate(`/grounds/${g.id}`)}>
//               <Image src={g.thumbnail || "https://placehold.co/600x300?text=No+Image"} alt={g.name} objectFit="cover" w="100%" h="200px" />
//               <Box p={3}>
//                 <Heading size="sm">{g.name}</Heading>
//                 <Text fontSize="sm" color="gray.600">{g.city} {g.pincode ? `• ${g.pincode}` : ""}</Text>
//                 <Badge mt={2} colorScheme="blue">View details</Badge>
//               </Box>
//             </GridItem>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }


// Version 2 - Enhanced Filter 

import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Grid,
  GridItem,
  Image,
  Heading,
  Text,
  Badge,
  Spinner,
  Center,
  HStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Ground = {
  id: string;
  name: string;
  city?: string;
  pincode?: string;
  thumbnail?: string | null;
};

export default function GroundsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get("https://admee.in:3003/api/tfc/grounds");
      setGrounds(res.data.grounds || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // 🔎 Filter grounds on frontend (partial match by id, name, city, pincode)
  const filteredGrounds = grounds.filter((g) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      (g.id && g.id.toLowerCase().includes(term)) ||
      (g.name && g.name.toLowerCase().includes(term)) ||
      (g.city && g.city.toLowerCase().includes(term)) ||
      (g.pincode && g.pincode.toLowerCase().includes(term))
    );
  });

  return (
    <Box p={6} maxW="7xl" mx="auto">
      <Heading mb={6} textAlign="center" color="blue.600">
        Find Funeral Grounds
      </Heading>

      {/* 🔎 Search Bar */}
      <HStack mb={6} spacing={3} justify="center">
        <Input
          placeholder="Search by ID, Name, City or Pincode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
          bg="white"
          maxW="400px"
          borderColor="blue.400"
          focusBorderColor="blue.600"
        />
        {searchTerm && (
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </Button>
        )}
      </HStack>

      {loading ? (
        <Center py={20}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : filteredGrounds.length > 0 ? (
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {filteredGrounds.map((g) => (
            <GridItem
              key={g.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              _hover={{
                shadow: "md",
                transform: "scale(1.02)",
                transition: "0.2s",
                borderColor: "blue.400",
              }}
              onClick={() => navigate(`/grounds/${g.id}`)}
            >
              <Image
                src={g.thumbnail || "https://placehold.co/600x300?text=No+Image"}
                alt={g.name}
                objectFit="cover"
                w="100%"
                h="200px"
              />
              <Box p={4}>
                <Heading size="sm" color="blue.700">
                  {g.name}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {g.city} {g.pincode ? `• ${g.pincode}` : ""}
                </Text>
                <Badge mt={2} colorScheme="blue">
                  View details
                </Badge>
              </Box>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Center py={10}>
          <Text color="gray.500">No grounds found. Try another search.</Text>
        </Center>
      )}
    </Box>
  );
}
