
// Version 1 

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Heading,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Badge,
//   Spinner,
//   useToast,
//   Select,
//   Flex,
//   Input,
//   Checkbox,
//   CheckboxGroup,
//   Stack,
//   SimpleGrid,
//   useBreakpointValue,
// } from "@chakra-ui/react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchId, setSearchId] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [statusFilter, setStatusFilter] = useState<string[]>([]);
//   const toast = useToast();

//   const isMobile = useBreakpointValue({ base: true, md: false }); // ✅ fixed hook

//   async function fetchOrders() {
//     try {
//       const res = await axios.get(`https://admee.in:3003/api/admin/orders`);
//       setOrders(res.data);
//       setFilteredOrders(res.data);
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message,
//         status: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Apply filters whenever search/sort/status changes
//   useEffect(() => {
//     let data = [...orders];

//     // 🔍 Search filter
//     if (searchId.trim() !== "") {
//       data = data.filter((o) => o.id.toString().includes(searchId.trim()));
//     }

//     // ✅ Status filter
//     if (statusFilter.length > 0) {
//       data = data.filter((o) => statusFilter.includes(o.status));
//     }

//     // ⏳ Sorting
//     if (sortBy === "newest") {
//       data.sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );
//     } else if (sortBy === "oldest") {
//       data.sort(
//         (a, b) =>
//           new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//       );
//     } else if (sortBy === "price-high") {
//       data.sort((a, b) => b.total_price - a.total_price);
//     } else if (sortBy === "price-low") {
//       data.sort((a, b) => a.total_price - b.total_price);
//     }

//     setFilteredOrders(data);
//   }, [orders, searchId, sortBy, statusFilter]);

//   // Update API call
//   const updateOrder = async (id: number, field: string, value: string) => {
//     try {
//       await axios.post(`https://admee.in:3003/api/admin/orders/update`, {
//         id,
//         [field]: value,
//       });
//       toast({ title: "Updated", status: "success" });
//       fetchOrders();
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message,
//         status: "error",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <Box textAlign="center" py={20}>
//         <Spinner size="xl" color="brand.500" />
//       </Box>
//     );
//   }

//   return (
//     <Box py={8} bg="gray.50" minH="100vh">
//       <Container maxW="7xl">
//         <Heading size="lg" mb={6} color="brand.600" textAlign="center">
//           Admin Dashboard – Orders
//         </Heading>

//         {/* 🔧 Filters */}
//         <Flex
//           direction={{ base: "column", md: "row" }}
//           gap={4}
//           mb={6}
//           align="center"
//           justify="space-between"
//         >
//           <Input
//             placeholder="Search by Order ID"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             maxW={{ base: "100%", md: "250px" }}
//           />
//           <Select
//             maxW={{ base: "100%", md: "200px" }}
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="price-low">Price: Low to High</option>
//           </Select>
//           <CheckboxGroup
//             colorScheme="brand"
//             value={statusFilter}
//             onChange={(v) => setStatusFilter(v as string[])}
//           >
//             <Stack direction="row" wrap="wrap">
//               <Checkbox value="pending">Pending</Checkbox>
//               <Checkbox value="confirmed">Confirmed</Checkbox>
//               <Checkbox value="shipped">Shipped</Checkbox>
//               <Checkbox value="completed">Completed</Checkbox>
//               <Checkbox value="cancelled">Cancelled</Checkbox>
//             </Stack>
//           </CheckboxGroup>
//         </Flex>

//         {/* 📱 Mobile View: Cards */}
//         {isMobile ? (
//           <SimpleGrid spacing={4}>
//             {filteredOrders.map((o) => (
//               <Box key={o.id} p={4} bg="white" borderRadius="md" shadow="sm">
//                 <Flex justify="space-between" align="center">
//                   <Heading size="sm">Order #{o.id}</Heading>
//                   <Badge
//                     colorScheme={o.order_type === "service" ? "purple" : "blue"}
//                   >
//                     {o.order_type}
//                   </Badge>
//                 </Flex>
//                 <Box mt={2} fontSize="sm" color="gray.700">
//                   <strong>Customer:</strong> {o.customer_name || "Guest"}
//                   <br />
//                   <strong>Phone:</strong> {o.customer_phone}
//                   <br />
//                   <strong>Total:</strong> {o.currency} {o.total_price}
//                   <br />
//                   <strong>Date:</strong>{" "}
//                   {new Date(o.created_at).toLocaleDateString()}
//                 </Box>
//                 <Flex mt={2} gap={2}>
//                   <Select
//                     size="sm"
//                     value={o.status}
//                     onChange={(e) => updateOrder(o.id, "status", e.target.value)}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="completed">Completed</option>
//                     <option value="cancelled">Cancelled</option>
//                   </Select>
//                   <Select
//                     size="sm"
//                     value={o.payment_status}
//                     onChange={(e) =>
//                       updateOrder(o.id, "payment_status", e.target.value)
//                     }
//                   >
//                     <option value="unpaid">Unpaid</option>
//                     <option value="pending">Pending</option>
//                     <option value="paid">Paid</option>
//                     <option value="failed">Failed</option>
//                   </Select>
//                 </Flex>
//               </Box>
//             ))}
//           </SimpleGrid>
//         ) : (
//           // 🖥️ Desktop View: Table
//           <Box overflowX="auto">
//             <Table variant="striped" size="sm">
//               <Thead>
//                 <Tr>
//                   <Th>ID</Th>
//                   <Th>Customer</Th>
//                   <Th>Phone</Th>
//                   <Th>Type</Th>
//                   <Th>Total</Th>
//                   <Th>Status</Th>
//                   <Th>Payment</Th>
//                   <Th>Created</Th>
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {filteredOrders.map((o) => (
//                   <Tr key={o.id}>
//                     <Td>{o.id}</Td>
//                     <Td>{o.customer_name || "Guest"}</Td>
//                     <Td>{o.customer_phone}</Td>
//                     <Td>
//                       <Badge
//                         colorScheme={
//                           o.order_type === "service" ? "purple" : "blue"
//                         }
//                       >
//                         {o.order_type}
//                       </Badge>
//                     </Td>
//                     <Td>
//                       {o.currency} {o.total_price}
//                     </Td>
//                     <Td>
//                       <Select
//                         size="sm"
//                         value={o.status}
//                         onChange={(e) =>
//                           updateOrder(o.id, "status", e.target.value)
//                         }
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="confirmed">Confirmed</option>
//                         <option value="shipped">Shipped</option>
//                         <option value="completed">Completed</option>
//                         <option value="cancelled">Cancelled</option>
//                       </Select>
//                     </Td>
//                     <Td>
//                       <Select
//                         size="sm"
//                         value={o.payment_status}
//                         onChange={(e) =>
//                           updateOrder(o.id, "payment_status", e.target.value)
//                         }
//                       >
//                         <option value="unpaid">Unpaid</option>
//                         <option value="pending">Pending</option>
//                         <option value="paid">Paid</option>
//                         <option value="failed">Failed</option>
//                       </Select>
//                     </Td>
//                     <Td>{new Date(o.created_at).toLocaleString()}</Td>
//                   </Tr>
//                 ))}
//               </Tbody>
//             </Table>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }


// Version 2 

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  useToast,
  Select,
  Flex,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
  SimpleGrid,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

  async function fetchOrders() {
    try {
      const res = await axios.get(`https://admee.in:3003/api/admin/orders`);
      setOrders(res.data);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtering + sorting logic
  function getFilteredOrders(type: "service" | "product") {
    let data = [...orders].filter((o) => o.order_type === type);

    if (searchId.trim() !== "") {
      data = data.filter((o) => o.id.toString().includes(searchId.trim()));
    }

    if (statusFilter.length > 0) {
      data = data.filter((o) => statusFilter.includes(o.status));
    }

    if (sortBy === "newest") {
      data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "oldest") {
      data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sortBy === "price-high") {
      data.sort((a, b) => b.total_price - a.total_price);
    } else if (sortBy === "price-low") {
      data.sort((a, b) => a.total_price - b.total_price);
    }

    return data;
  }

  const updateOrder = async (id: number, field: string, value: string) => {
    try {
      await axios.post(`https://admee.in:3003/api/admin/orders/update`, {
        id,
        [field]: value,
      });
      toast({ title: "Updated", status: "success" });
      fetchOrders();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  // 📦 reusable component for rendering list
  const renderOrders = (ordersList: any[]) =>
    isMobile ? (
      <SimpleGrid spacing={4}>
        {ordersList.map((o) => (
          <Box key={o.id} p={4} bg="white" borderRadius="md" shadow="sm">
            <Flex justify="space-between" align="center">
              <Heading size="sm">Order #{o.id}</Heading>
              <Badge colorScheme={o.order_type === "service" ? "purple" : "blue"}>
                {o.order_type}
              </Badge>
            </Flex>
            <Box mt={2} fontSize="sm" color="gray.700">
              <strong>Customer:</strong> {o.customer_name || "Guest"}
              <br />
              <strong>Phone:</strong> {o.customer_phone}
              <br />
              <strong>Total:</strong> {o.currency} {o.total_price}
              <br />
              <strong>Date:</strong>{" "}
              {new Date(o.created_at).toLocaleDateString()}
            </Box>
            <Flex mt={2} gap={2}>
              <Select
                size="sm"
                value={o.status}
                onChange={(e) => updateOrder(o.id, "status", e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
              <Select
                size="sm"
                value={o.payment_status}
                onChange={(e) =>
                  updateOrder(o.id, "payment_status", e.target.value)
                }
              >
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </Select>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    ) : (
      <Box overflowX="auto">
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer</Th>
              <Th>Phone</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ordersList.map((o) => (
              <Tr key={o.id}>
                <Td>{o.id}</Td>
                <Td>{o.customer_name || "Guest"}</Td>
                <Td>{o.customer_phone}</Td>
                <Td>
                  {o.currency} {o.total_price}
                </Td>
                <Td>
                  <Select
                    size="sm"
                    value={o.status}
                    onChange={(e) =>
                      updateOrder(o.id, "status", e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </Td>
                <Td>
                  <Select
                    size="sm"
                    value={o.payment_status}
                    onChange={(e) =>
                      updateOrder(o.id, "payment_status", e.target.value)
                    }
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </Select>
                </Td>
                <Td>{new Date(o.created_at).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );

  return (
    <Box py={8} bg="gray.50" minH="100vh">
      <Container maxW="7xl">
        <Heading size="lg" mb={6} color="brand.600" textAlign="center">
          Admin Dashboard – Orders
        </Heading>

        {/* Filters */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          mb={6}
          align="center"
          justify="space-between"
        >
          <Input
            placeholder="Search by Order ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            maxW={{ base: "100%", md: "250px" }}
          />
          <Select
            maxW={{ base: "100%", md: "200px" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </Select>
          <CheckboxGroup
            colorScheme="brand"
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as string[])}
          >
            <Stack direction="row" wrap="wrap">
              <Checkbox value="pending">Pending</Checkbox>
              <Checkbox value="confirmed">Confirmed</Checkbox>
              <Checkbox value="shipped">Shipped</Checkbox>
              <Checkbox value="completed">Completed</Checkbox>
              <Checkbox value="cancelled">Cancelled</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Flex>

        {/* Tabs for Service vs Product */}
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Service Orders</Tab>
            <Tab>Product Orders</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>{renderOrders(getFilteredOrders("service"))}</TabPanel>
            <TabPanel>{renderOrders(getFilteredOrders("product"))}</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
