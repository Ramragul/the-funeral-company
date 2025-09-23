// Version 1

// import React, { useEffect, useState } from "react";
// import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner, Center } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function GroundManagerPage() {
//   const [grounds, setGrounds] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://admee.in:3003/api/tfc/grounds")
//       .then(res => setGrounds(res.data.grounds || []))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <Center py={20}><Spinner size="xl" /></Center>;

//   return (
//     <Box p={6}>
//       <Heading mb={4}>Manage Funeral Grounds</Heading>
//       <Table>
//         <Thead><Tr><Th>ID</Th><Th>Name</Th><Th>City</Th><Th>Created</Th><Th>Actions</Th></Tr></Thead>
//         <Tbody>
//           {grounds.map(g => (
//             <Tr key={g.id}>
//               <Td>{g.id}</Td>
//               <Td>{g.name}</Td>
//               <Td>{g.city}</Td>
//               <Td>{new Date(g.created_at).toLocaleString()}</Td>
//               <Td>
//                 <Button size="sm" onClick={() => navigate(`/admin/grounds/edit/${g.id}`)}>Manage</Button>
//                 <Button ml={2} size="sm" variant="ghost" colorScheme="red" onClick={() => {
//                   if (!confirm('Delete?')) return;
//                   axios.delete(`https://admee.in:3003/api/tfc/grounds/${g.id}`).then(()=> setGrounds(gs => gs.filter(x=>x.id!==g.id)));
//                 }}>Delete</Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// }


// Version 2  Search Bar addition


import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Center,
  Input,
  HStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GroundManagerPage() {
  const [grounds, setGrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://admee.in:3003/api/tfc/grounds")
      .then((res) => setGrounds(res.data.grounds || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔎 Filter grounds based on search term
//   const filteredGrounds = grounds.filter((g) => {
//     const term = searchTerm.toLowerCase().trim();
//     if (!term) return true; // no search, return all

//     return (
//       (g.name && g.name.toLowerCase().startsWith(term)) ||
//       (g.city && g.city.toLowerCase().startsWith(term))
//     );
//   });

// 🔎 Filter grounds based on search term (id, name, city)
const filteredGrounds = grounds.filter((g) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true; // no search, return all
  
    return (
      (g.id && g.id.toLowerCase().startsWith(term)) ||
      (g.name && g.name.toLowerCase().startsWith(term)) ||
      (g.city && g.city.toLowerCase().startsWith(term))
    );
  });
  

  if (loading)
    return (
      <Center py={20}>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box p={6}>
      <Heading mb={4}>Manage Funeral Grounds</Heading>

      {/* 🔎 Search Bar */}
      <HStack mb={4} spacing={3}>
        <Input
          placeholder="Search by id or name or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
        />
        {searchTerm && (
          <Button size="sm" variant="outline" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        )}
      </HStack>

      {/* Table */}
      {filteredGrounds.length > 0 ? (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>City</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {/* <Tbody>
            {filteredGrounds.map((g) => (
              <Tr key={g.id} >

                <Td>{g.id}</Td>
                <Td>{g.name}</Td>
                <Td>{g.city}</Td>
                <Td>{new Date(g.created_at).toLocaleString()}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/admin/grounds/edit/${g.id}`)}
                  >
                    Manage
                  </Button>
                  <Button
                    ml={2}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => {
                      if (!confirm("Delete?")) return;
                      axios
                        .delete(`https://admee.in:3003/api/tfc/grounds/${g.id}`)
                        .then(() =>
                          setGrounds((gs) => gs.filter((x) => x.id !== g.id))
                        );
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody> */}

<Tbody>
  {filteredGrounds.map((g, idx) => (
    <Tr
      key={g.id}
      borderBottom="2px solid"
      borderBottomColor={idx % 2 === 0 ? "blackAlpha.800" : "blackAlpha.800"} // alternate colors
      _hover={{ borderBottomColor: "blue.500" }} // stylish hover
    >
      <Td>{g.id}</Td>
      <Td>{g.name}</Td>
      <Td>{g.city}</Td>
      <Td>{new Date(g.created_at).toLocaleString()}</Td>
      <Td>
        <Button
          size="sm"
          colorScheme="green"
          onClick={() => navigate(`/admin/grounds/edit/${g.id}`)}
        >
          Manage
        </Button>
        <Button
          ml={2}
          size="sm"
          variant="ghost"
          colorScheme="red"
          onClick={() => {
            if (!confirm("Delete?")) return;
            axios
              .delete(`https://admee.in:3003/api/tfc/grounds/${g.id}`)
              .then(() =>
                setGrounds((gs) => gs.filter((x) => x.id !== g.id))
              );
          }}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  ))}
</Tbody>




        </Table>
      ) : (
        <Text mt={4} color="gray.500">
          No results found.
        </Text>
      )}
    </Box>
  );
}
