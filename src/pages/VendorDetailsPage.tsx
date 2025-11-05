import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Divider,
    Badge,
    Button,
    HStack,
    VStack,
    Spinner,
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tag,
  } from "@chakra-ui/react";
  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { AddIcon } from "@chakra-ui/icons";
  
  interface Vendor {
    id: number;
    name: string;
    type: string;
    contact_name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    payment_mode: string;
    base_rate: number;
    status: string;
    created_at: string;
  }
  
  interface Payment {
    id: number;
    amount: number;
    payment_date: string;
    payment_mode: string;
    status: string;
  }
  
  export default function VendorDetailsPage() {
    const { id } = useParams();
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
  
    const fetchData = () => {
      setLoading(true);
      axios
        .get(`/api/tfc/vendors/${id}`)
        .then((res) => setVendor(res.data))
        .catch((err) =>
          toast({ title: "Error fetching vendor", description: err.message, status: "error" })
        )
        .finally(() => setLoading(false));
  
      axios
        .get(`/api/tfc/vendor-payments?vendor_id=${id}`)
        .then((res) => setPayments(res.data))
        .catch(() => {});
    };
  
    useEffect(() => {
      fetchData();
    }, [id]);
  
    if (loading)
      return (
        <Box py={20} textAlign="center">
          <Spinner size="xl" color="brand.500" />
        </Box>
      );
  
    if (!vendor)
      return (
        <Box py={20} textAlign="center">
          <Text>No vendor found.</Text>
        </Box>
      );
  
    return (
      <Container maxW="6xl" py={10}>
        <Heading mb={6} color="brand.700">
          Vendor Details
        </Heading>
  
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* Left: Vendor Profile */}
          <Box p={6} borderWidth="1px" borderRadius="xl" shadow="sm">
            <Heading size="md" color="brand.600" mb={4}>
              {vendor.name}
            </Heading>
            <Stack spacing={2}>
              <Text><b>Type:</b> {vendor.type}</Text>
              <Text><b>Contact:</b> {vendor.contact_name || "-"} ({vendor.phone || "N/A"})</Text>
              {vendor.email && <Text><b>Email:</b> {vendor.email}</Text>}
              <Text><b>City:</b> {vendor.city || "-"}</Text>
              <Text><b>Payment Mode:</b> {vendor.payment_mode}</Text>
              <Text><b>Base Rate:</b> ₹{vendor.base_rate || 0}</Text>
              <Text><b>Status:</b>{" "}
                <Tag
                  colorScheme={
                    vendor.status === "active"
                      ? "green"
                      : vendor.status === "inactive"
                      ? "red"
                      : "gray"
                  }
                >
                  {vendor.status}
                </Tag>
              </Text>
              <Text color="gray.500" fontSize="sm">
                Added on{" "}
                {new Date(vendor.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </Stack>
            <Divider my={4} />
            <HStack>
              <Button colorScheme="brand" size="sm" leftIcon={<AddIcon />}>
                Add Payment
              </Button>
              <Button size="sm" variant="outline">
                Edit Vendor
              </Button>
            </HStack>
          </Box>
  
          {/* Right: Payment History */}
          <Box p={6} borderWidth="1px" borderRadius="xl" shadow="sm">
            <Heading size="md" color="brand.600" mb={4}>
              Payment History
            </Heading>
            {payments.length === 0 ? (
              <Text color="gray.500">No payments recorded yet.</Text>
            ) : (
              <Box overflowX="auto">
                <Table size="sm">
                  <Thead bg="brand.50">
                    <Tr>
                      <Th>ID</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>Mode</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {payments.map((p) => (
                      <Tr key={p.id}>
                        <Td>{p.id}</Td>
                        <Td>
                          {new Date(p.payment_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </Td>
                        <Td>₹{p.amount.toFixed(2)}</Td>
                        <Td>{p.payment_mode}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              p.status === "released"
                                ? "green"
                                : p.status === "pending"
                                ? "orange"
                                : "red"
                            }
                          >
                            {p.status}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </Container>
    );
  }
  