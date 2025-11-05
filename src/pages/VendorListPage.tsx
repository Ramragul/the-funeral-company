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
    Spinner,
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
  
    const fetchVendors = () => {
      setLoading(true);
      axios
        .get("/api/tfc/vendors")
        .then((res) => setVendors(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };
  
    useEffect(() => {
      fetchVendors();
    }, []);
  
    return (
      <Container maxW="7xl" py={10}>
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
  
        {loading ? (
          <Flex justify="center" py={20}>
            <Spinner size="xl" color="brand.500" />
          </Flex>
        ) : vendors.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="lg" color="gray.500">
              No vendors found. Click “Add Vendor” to create one.
            </Text>
          </Box>
        ) : (
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
                {vendors.map((v) => (
                  <Tr key={v.id}>
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
        <VendorFormModal isOpen={isOpen} onClose={onClose} onSuccess={fetchVendors} />
      </Container>
    );
  }
  