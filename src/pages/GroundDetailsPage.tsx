// Version 1 

// import React, { useEffect, useState } from "react";
// import { Box, Heading, Text, Image, Stack, Button, Badge, SimpleGrid, List, ListItem, ListIcon, Spinner, Center } from "@chakra-ui/react";
// import { CheckIcon } from "@chakra-ui/icons";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function GroundDetailsPage() {
//   const { id } = useParams();
//   const [ground, setGround] = useState<any>(null);
//   const [images, setImages] = useState<any[]>([]);
//   const [requirements, setRequirements] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();



// useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     axios.get(`https://admee.in:3003/api/tfc/grounds/${id}`)
//       .then(res => {
//         setGround(res.data); // entire ground object
//         setImages(res.data.images || []);
//         // procedures is text, split into array by comma/line break
//         const reqs = res.data.procedures 
//           ? res.data.procedures.split(/[,;\n]/).map((r: string, idx: number) => ({
//               id: idx,
//               title: r.trim(),
//               description: ""
//             }))
//           : [];
//         setRequirements(reqs);
//       })
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);
  

//   if (loading) return <Center py={20}><Spinner size="xl" /></Center>;
//   if (!ground) return <Box p={6}><Text>Not found</Text></Box>;

//   return (
//     <Box p={6} maxW="7xl" mx="auto">
//       <Button mb={4} onClick={() => navigate(-1)}>Back</Button>
//       <Heading>{ground.name} <Badge ml={3}>Funeral Ground</Badge></Heading>
//       <Text color="gray.600" mt={2}>{ground.address}, {ground.city} {ground.pincode}</Text>
//       <Text mt={2}>Phone: {ground.phone || "—"}</Text>
//       <Text mt={2}>Hours: {ground.operating_hours || "24/7"}</Text>
//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
//         {images.length ? images.map(img => (
//           <Box key={img.id} borderWidth="1px" borderRadius="md" overflow="hidden">
//             <Image src={img.url} w="100%" h="220px" objectFit="cover" />
//           </Box>
//         )) : <Box>No images</Box>}
//       </SimpleGrid>

//       <Stack spacing={3} mt={6}>
//         <Heading size="md">Facilities</Heading>
//         <Text>Parking: {ground.parking ? "Yes" : "No"} • Water: {ground.water_facility ? "Yes" : "No"} • Capacity: {ground.capacity || "—"}</Text>

//         <Heading size="md" mt={4}>Procedure & Requirements</Heading>
//         <List spacing={2} mt={2}>
//           {requirements.length ? requirements.map(r => (
//             <ListItem key={r.id}>
//               <ListIcon as={CheckIcon} color="green.500" />
//               <strong>{r.title}</strong> — {r.description || ""}
//             </ListItem>
//           )) : <Text>No special requirements published.</Text>}
//         </List>
//       </Stack>
//     </Box>
//   );
// }



// Version 2 


import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  Badge,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Spinner,
  Center,
  Link,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function GroundDetailsPage() {
  const { id } = useParams();
  const [ground, setGround] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [requirements, setRequirements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://admee.in:3003/api/tfc/grounds/${id}`)
      .then((res) => {
        setGround(res.data); // entire ground object
        setImages(res.data.images || []);
        // convert procedures text into array
        const reqs = res.data.procedures
          ? res.data.procedures
              .split(/[,;\n]/)
              .map((r: string, idx: number) => ({
                id: idx,
                title: r.trim(),
                description: "",
              }))
          : [];
        setRequirements(reqs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Center py={20}>
        <Spinner size="xl" />
      </Center>
    );
  if (!ground)
    return (
      <Box p={6}>
        <Text>Not found</Text>
      </Box>
    );

  return (
    <Box p={6} maxW="7xl" mx="auto">
      <Button mb={4} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Heading>
        {ground.name} <Badge ml={3}>Funeral Ground</Badge>
      </Heading>
      <Text color="gray.600" mt={2}>
        {ground.address}, {ground.city} {ground.pincode}
      </Text>
      <Text mt={2}>Phone: {ground.phone || "—"}</Text>
      <Text mt={2}>Email: {ground.email || "—"}</Text>
      <Text mt={2}>Hours: {ground.operating_hours || "24/7"}</Text>
      {ground.google_map_url && (
        <Text mt={2}>
          Map:{" "}
          <Link
            href={ground.google_map_url}
            color="blue.500"
            isExternal
          >
            View on Google Maps
          </Link>
        </Text>
      )}

      {/* --- Images --- */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
        {images.length ? (
          images.map((img) => (
            <Box
              key={img.id}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={img.url}
                w="100%"
                h="220px"
                objectFit="cover"
              />
            </Box>
          ))
        ) : (
          <Box>No images</Box>
        )}
      </SimpleGrid>

      {/* --- Facilities --- */}
      <Stack spacing={3} mt={6}>
        <Heading size="md">Facilities</Heading>
        <Text>
          Parking: {ground.parking ? "Yes" : "No"} • Water:{" "}
          {ground.water_facility ? "Yes" : "No"} • Capacity:{" "}
          {ground.capacity || "—"}
        </Text>

        {/* --- Religions Supported --- */}
        {ground.religions_supported?.length > 0 && (
          <>
            <Heading size="md" mt={4}>
              Religions Supported
            </Heading>
            <List spacing={2} mt={2}>
              {ground.religions_supported.map(
                (rel: string, idx: number) => (
                  <ListItem key={idx}>
                    <ListIcon as={CheckIcon} color="green.500" />
                    {rel}
                  </ListItem>
                )
              )}
            </List>
          </>
        )}

        {/* --- Services (Burial, Cremation etc.) --- */}
        {ground.services?.length > 0 && (
          <>
            <Heading size="md" mt={4}>
              Services Available
            </Heading>
            <List spacing={2} mt={2}>
              {ground.services.map((s: any, idx: number) => {
                if (typeof s === "string") {
                  return (
                    <ListItem key={idx}>
                      <ListIcon as={CheckIcon} color="green.500" />
                      {s}
                    </ListItem>
                  );
                } else if (s.type) {
                  // Cremation with methods
                  return (
                    <ListItem key={idx}>
                      <ListIcon as={CheckIcon} color="green.500" />
                      {s.type} ({(s.methods || []).join(", ")})
                    </ListItem>
                  );
                }
                return null;
              })}
            </List>
          </>
        )}

        {/* --- Procedures & Requirements --- */}
        <Heading size="md" mt={4}>
          Procedure & Requirements
        </Heading>
        <List spacing={2} mt={2}>
          {requirements.length ? (
            requirements.map((r) => (
              <ListItem key={r.id}>
                <ListIcon as={CheckIcon} color="green.500" />
                {r.title}
              </ListItem>
            ))
          ) : (
            <Text>No special requirements published.</Text>
          )}
        </List>
      </Stack>
    </Box>
  );
}
