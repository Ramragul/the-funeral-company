import {
    Box,
    Button,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tag,
    Skeleton,
    useDisclosure,
    Container,
    Flex,
    Text,
    IconButton,
    Tooltip,
  } from "@chakra-ui/react";
  import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import VendorFormModal from "./VendorFormModal";
  
  interface Vendor {
    id: number;
    name: string;
    type: string;
    city: string;
    phone: string;
    status: string;
    created_at: string;
  }
  
  export default function VendorListPage() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
  
    // ✅ Safe fetch function with fallback
    const fetchVendors = () => {
      setLoading(true);
      axios
        .get("https://admee.in:3003/api/tfc/vendors")
        .then((res) => {
          const data = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data.data)
            ? res.data.data
            : [];
          setVendors(data);
        })
        .catch((err) => console.error("Error fetching vendors:", err))
        .finally(() => setLoading(false));
    };
  
    useEffect(() => {
      fetchVendors();
    }, []);
  
    return (
      <Container maxW="7xl" py={10}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6}>
          <Heading color="brand.700" size="lg">
            Vendor Management
          </Heading>
          <Flex gap={3}>
            <Tooltip label="Refresh List">
              <IconButton
                aria-label="refresh"
                icon={<RepeatIcon />}
                colorScheme="brand"
                variant="outline"
                onClick={fetchVendors}
              />
            </Tooltip>
            <Button
              colorScheme="brand"
              leftIcon={<AddIcon />}
              onClick={onOpen}
              borderRadius="xl"
            >
              Add Vendor
            </Button>
          </Flex>
        </Flex>
  
        {/* Loading State */}
        {loading ? (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="sm">
            <Table variant="simple" size="md">
              <Thead bg="brand.50">
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>City</Th>
                  <Th>Phone</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[...Array(5)].map((_, i) => (
                  <Tr key={i}>
                    <Td colSpan={7}>
                      <Skeleton height="20px" my={2} borderRadius="md" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : vendors.length === 0 ? (
          // Empty State
          <Box textAlign="center" py={20}>
            <Heading size="md" mb={2} color="brand.700">
              No Vendors Yet
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Once you add vendors, they’ll appear here for assignment and tracking.
            </Text>
            <Button colorScheme="brand" onClick={onOpen}>
              + Add Your First Vendor
            </Button>
          </Box>
        ) : (
          // Vendor Table
          <Box borderWidth="1px" borderRadius="lg" overflowX="auto" shadow="sm">
            <Table variant="simple" size="md">
              <Thead bg="brand.50">
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>City</Th>
                  <Th>Phone</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(vendors) &&
                  vendors.map((v) => (
                    <Tr
                      key={v.id}
                      _hover={{ bg: "brand.50", cursor: "pointer" }}
                      onClick={() => navigate(`/vendors/${v.id}`)}
                    >
                      <Td>{v.id}</Td>
                      <Td fontWeight="semibold" color="brand.700">
                        {v.name}
                      </Td>
                      <Td textTransform="capitalize">{v.type}</Td>
                      <Td>{v.city || "-"}</Td>
                      <Td>{v.phone || "-"}</Td>
                      <Td>
                        <Tag
                          colorScheme={
                            v.status === "active"
                              ? "green"
                              : v.status === "inactive"
                              ? "red"
                              : "gray"
                          }
                          borderRadius="full"
                          px={3}
                        >
                          {v.status}
                        </Tag>
                      </Td>
                      <Td>
                        {new Date(v.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        )}
  
        {/* Add Vendor Modal */}
        <VendorFormModal
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={fetchVendors}
        />
      </Container>
    );
  }
  