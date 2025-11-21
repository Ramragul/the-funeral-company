
// Version 1 

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Input,
//   Grid,
//   GridItem,
//   Image,
//   Heading,
//   Text,
//   Badge,
//   Spinner,
//   Center,
//   HStack,
//   Button,
// } from "@chakra-ui/react";
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
//   const [searchTerm, setSearchTerm] = useState("");
//   const [grounds, setGrounds] = useState<Ground[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   async function fetchData() {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://admee.in:3003/api/tfc/grounds");
//       setGrounds(res.data.grounds || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔎 Filter grounds on frontend (partial match by id, name, city, pincode)
//   const filteredGrounds = grounds.filter((g) => {
//     const term = searchTerm.toLowerCase().trim();
//     if (!term) return true;
//     return (
//       (g.id && g.id.toLowerCase().includes(term)) ||
//       (g.name && g.name.toLowerCase().includes(term)) ||
//       (g.city && g.city.toLowerCase().includes(term)) ||
//       (g.pincode && g.pincode.toLowerCase().includes(term))
//     );
//   });

//   return (
//     <Box p={6} maxW="7xl" mx="auto">
//       <Heading mb={6} textAlign="center" color="blue.600">
//         Find Funeral Grounds
//       </Heading>

//       {/* 🔎 Search Bar */}
//       <HStack mb={6} spacing={3} justify="center">
//         <Input
//           placeholder="Search by ID, Name, City or Pincode..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && fetchData()}
//           bg="white"
//           maxW="400px"
//           borderColor="blue.400"
//           focusBorderColor="blue.600"
//         />
//         {searchTerm && (
//           <Button
//             size="sm"
//             colorScheme="blue"
//             variant="outline"
//             onClick={() => setSearchTerm("")}
//           >
//             Clear
//           </Button>
//         )}
//       </HStack>

//       {loading ? (
//         <Center py={20}>
//           <Spinner size="xl" color="blue.500" />
//         </Center>
//       ) : filteredGrounds.length > 0 ? (
//         <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
//           {filteredGrounds.map((g) => (
//             <GridItem
//               key={g.id}
//               borderWidth="1px"
//               borderRadius="lg"
//               overflow="hidden"
//               cursor="pointer"
//               _hover={{
//                 shadow: "md",
//                 transform: "scale(1.02)",
//                 transition: "0.2s",
//                 borderColor: "blue.400",
//               }}
//               onClick={() => navigate(`/grounds/${g.id}`)}
//             >
//               <Image
//                 src={g.thumbnail || "https://placehold.co/600x300?text=No+Image"}
//                 alt={g.name}
//                 objectFit="cover"
//                 w="100%"
//                 h="200px"
//               />
//               <Box p={4}>
//                 <Heading size="sm" color="blue.700">
//                   {g.name}
//                 </Heading>
//                 <Text fontSize="sm" color="gray.600">
//                   {g.city} {g.pincode ? `• ${g.pincode}` : ""}
//                 </Text>
//                 <Badge mt={2} colorScheme="blue">
//                   View details
//                 </Badge>
//               </Box>
//             </GridItem>
//           ))}
//         </Grid>
//       ) : (
//         <Center py={10}>
//           <Text color="gray.500">No grounds found. Try another search.</Text>
//         </Center>
//       )}
//     </Box>
//   );
// }



// Version 2 - Enhanced Filter

import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

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
  Checkbox,
  Wrap,
  WrapItem,
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
  const [selectedCity, setSelectedCity] = useState("");
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cityList, setCityList] = useState<string[]>([]);
  const navigate = useNavigate();

  // Fetch list with filters + pagination
  async function fetchData(reset = false) {
    if (reset) {
      setPage(1);
      setGrounds([]);
      setHasMore(true);
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `https://admee.in:3003/api/tfc/grounds?q=${searchTerm}&city=${selectedCity}&page=${reset ? 1 : page}&perPage=20`
      );

      const newData = res.data.grounds || [];

      if (newData.length < 20) setHasMore(false);

      setGrounds((prev) => (reset ? newData : [...prev, ...newData]));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCities() {
    try {
      const res = await axios.get("https://admee.in:3003/api/tfc/grounds/cities");
      setCityList(res.data.cities || []);
    } catch (err) {
      console.error(err);
    }
  }
  

  // Initial load
  // useEffect(() => {
  //   fetchData(true);
  // }, []);

  useEffect(() => {
    fetchCities();   // load full city list
    fetchData(true); // load first page
  }, []);
  

  // When search or city changes → reset list
  useEffect(() => {
    const debounce = setTimeout(() => fetchData(true), 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCity]);

  // Extract unique cities
  const uniqueCities = Array.from(new Set(grounds.map((g) => g.city))).filter(
    (c) => c
  );

  return (
    <Box p={6} maxW="7xl" mx="auto">
      <Heading mb={6} textAlign="center" color="blue.600">
        Find Funeral Grounds
      </Heading>

      {/* 🔎 Search Bar */}
      <HStack mb={4} spacing={3} justify="center">
        <Input
          placeholder="Search by ID, Name, City or Pincode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* City Filter Section */}
      {/* <Heading size="sm" mb={2} color="gray.700" textAlign="center">
        Filter by City
      </Heading>

      <Wrap justify="center" mb={6}>
        {uniqueCities.map((city) => (
          <WrapItem key={city}>
            <Badge
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
              colorScheme={selectedCity === city ? "blue" : "gray"}
              onClick={() =>
                setSelectedCity(selectedCity === city ? "" : city)
              }
              _hover={{ opacity: 0.8 }}
            >
              {city}
            </Badge>
          </WrapItem>
        ))}
      </Wrap> */}

      {/* City Filter Section */}
      <Box mb={6} textAlign="center">
        <Heading size="sm" mb={2} color="gray.700">
          Filter by City
        </Heading>

        {/* <Select
          placeholder="Select City"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
          maxW="300px"
          mx="auto"
          bg="white"
          borderColor="blue.400"
          focusBorderColor="blue.600"
        >
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select> */}

      {/* <Select
        placeholder="Select City"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        maxW="300px"
        mx="auto"
        bg="white"
        borderColor="blue.400"
        focusBorderColor="blue.600"
      >
        {cityList.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </Select> */}

      {/* New Select Box  */}

<Select
  placeholder="Select City"
  value={selectedCity}
  onChange={(e) => setSelectedCity(e.target.value)}
  maxW="320px"
  mx="auto"
  size="lg"
  variant="filled"
  bg="blue.50"
  borderRadius="md"
  _hover={{ bg: "blue.100" }}
  _focus={{ bg: "blue.100", borderColor: "blue.500" }}
>
  {cityList.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</Select>


      

      

      </Box>


      {/* Grounds List */}
      {loading && page === 1 ? (
        <Center py={20}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : grounds.length > 0 ? (
        <>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            {grounds.map((g) => (
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

          {/* Pagination - Load More */}
          {hasMore && (
            <Center mt={8}>
              <Button
                colorScheme="blue"
                onClick={() => {
                  setPage((prev) => prev + 1);
                  fetchData();
                }}
              >
                Load More
              </Button>
            </Center>
          )}

          {!hasMore && (
            <Center mt={6}>
              <Text color="gray.500">You’ve reached the end.</Text>
            </Center>
          )}
        </>
      ) : (
        <Center py={10}>
          <Text color="gray.500">No grounds found. Try another search.</Text>
        </Center>
      )}
    </Box>
  );
}
