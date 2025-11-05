import {
    Box,
    Container,
    Heading,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tag,
    HStack,
    Spinner,
    Text,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  interface Payment {
    id: number;
    vendor_name: string;
    amount: number;
    payment_mode: string;
    payment_date: string;
    status: string;
  }
  
  export default function VendorPaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
  
    const filtered = payments.filter((p) =>
      p.vendor_name.toLowerCase().includes(search.toLowerCase())
    );
  
    useEffect(() => {
      setLoading(true);
      axios
        .get("/api/tfc/vendor-payments")
        .then((res) => setPayments(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      <Container maxW="7xl" py={10}>
        <Heading mb={6} color="brand.700">
          Vendor Payments
        </Heading>
  
        <HStack mb={4}>
          <Input
            placeholder="Search vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxW="300px"
            borderRadius="xl"
          />
        </HStack>
  
        {loading ? (
          <Box py={20} textAlign="center">
            <Spinner size="xl" color="brand.500" />
          </Box>
        ) : filtered.length === 0 ? (
          <Box py={20} textAlign="center">
            <Text color="gray.500">No payments found.</Text>
          </Box>
        ) : (
          <Box borderWidth="1px" borderRadius="lg" shadow="sm" overflowX="auto">
            <Table size="md" variant="simple">
              <Thead bg="brand.50">
                <Tr>
                  <Th>ID</Th>
                  <Th>Vendor</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Mode</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filtered.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.id}</Td>
                    <Td>{p.vendor_name}</Td>
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
                      <Tag
                        colorScheme={
                          p.status === "released"
                            ? "green"
                            : p.status === "pending"
                            ? "orange"
                            : "red"
                        }
                        borderRadius="full"
                      >
                        {p.status}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Container>
    );
  }
  