// Version 1

// import {
//     Box,
//     Container,
//     Heading,
//     Text,
//     SimpleGrid,
//     Stack,
//     Divider,
//     Badge,
//     Button,
//     HStack,
//     VStack,
//     Spinner,
//     useToast,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Tag,
//   } from "@chakra-ui/react";
//   import { useParams } from "react-router-dom";
//   import { useEffect, useState } from "react";
//   import axios from "axios";
//   import { AddIcon } from "@chakra-ui/icons";
  
//   interface Vendor {
//     id: number;
//     name: string;
//     type: string;
//     contact_name: string;
//     phone: string;
//     email: string;
//     address: string;
//     city: string;
//     payment_mode: string;
//     base_rate: number;
//     status: string;
//     created_at: string;
//   }
  
//   interface Payment {
//     id: number;
//     amount: number;
//     payment_date: string;
//     payment_mode: string;
//     status: string;
//   }
  
//   export default function VendorDetailsPage() {
//     const { id } = useParams();
//     const [vendor, setVendor] = useState<Vendor | null>(null);
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [loading, setLoading] = useState(true);
//     const toast = useToast();
  
//     const fetchData = () => {
//       setLoading(true);
//       axios
//         .get(`https://admee.in:3003/api/tfc/vendors/${id}`)
//         .then((res) => setVendor(res.data))
//         .catch((err) =>
//           toast({ title: "Error fetching vendor", description: err.message, status: "error" })
//         )
//         .finally(() => setLoading(false));
  
//       axios
//         .get(`https://admee.in:3003/api/tfc/vendor-payments?vendor_id=${id}`)
//         .then((res) => setPayments(res.data))
//         .catch(() => {});
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, [id]);
  
//     if (loading)
//       return (
//         <Box py={20} textAlign="center">
//           <Spinner size="xl" color="brand.500" />
//         </Box>
//       );
  
//     if (!vendor)
//       return (
//         <Box py={20} textAlign="center">
//           <Text>No vendor found.</Text>
//         </Box>
//       );
  
//     return (
//       <Container maxW="6xl" py={10}>
//         <Heading mb={6} color="brand.700">
//           Vendor Details
//         </Heading>
  
//         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
//           {/* Left: Vendor Profile */}
//           <Box p={6} borderWidth="1px" borderRadius="xl" shadow="sm">
//             <Heading size="md" color="brand.600" mb={4}>
//               {vendor.name}
//             </Heading>
//             <Stack spacing={2}>
//               <Text><b>Type:</b> {vendor.type}</Text>
//               <Text><b>Contact:</b> {vendor.contact_name || "-"} ({vendor.phone || "N/A"})</Text>
//               {vendor.email && <Text><b>Email:</b> {vendor.email}</Text>}
//               <Text><b>City:</b> {vendor.city || "-"}</Text>
//               <Text><b>Payment Mode:</b> {vendor.payment_mode}</Text>
//               <Text><b>Base Rate:</b> ₹{vendor.base_rate || 0}</Text>
//               <Text><b>Status:</b>{" "}
//                 <Tag
//                   colorScheme={
//                     vendor.status === "active"
//                       ? "green"
//                       : vendor.status === "inactive"
//                       ? "red"
//                       : "gray"
//                   }
//                 >
//                   {vendor.status}
//                 </Tag>
//               </Text>
//               <Text color="gray.500" fontSize="sm">
//                 Added on{" "}
//                 {new Date(vendor.created_at).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </Text>
//             </Stack>
//             <Divider my={4} />
//             <HStack>
//               <Button colorScheme="brand" size="sm" leftIcon={<AddIcon />}>
//                 Add Payment
//               </Button>
//               <Button size="sm" variant="outline">
//                 Edit Vendor
//               </Button>
//             </HStack>
//           </Box>
  
//           {/* Right: Payment History */}
//           <Box p={6} borderWidth="1px" borderRadius="xl" shadow="sm">
//             <Heading size="md" color="brand.600" mb={4}>
//               Payment History
//             </Heading>
//             {payments.length === 0 ? (
//               <Text color="gray.500">No payments recorded yet.</Text>
//             ) : (
//               <Box overflowX="auto">
//                 <Table size="sm">
//                   <Thead bg="brand.50">
//                     <Tr>
//                       <Th>ID</Th>
//                       <Th>Date</Th>
//                       <Th>Amount</Th>
//                       <Th>Mode</Th>
//                       <Th>Status</Th>
//                     </Tr>
//                   </Thead>
//                   <Tbody>
//                     {payments.map((p) => (
//                       <Tr key={p.id}>
//                         <Td>{p.id}</Td>
//                         <Td>
//                           {new Date(p.payment_date).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })}
//                         </Td>
//                         <Td>₹{p.amount.toFixed(2)}</Td>
//                         <Td>{p.payment_mode}</Td>
//                         <Td>
//                           <Badge
//                             colorScheme={
//                               p.status === "released"
//                                 ? "green"
//                                 : p.status === "pending"
//                                 ? "orange"
//                                 : "red"
//                             }
//                           >
//                             {p.status}
//                           </Badge>
//                         </Td>
//                       </Tr>
//                     ))}
//                   </Tbody>
//                 </Table>
//               </Box>
//             )}
//           </Box>
//         </SimpleGrid>
//       </Container>
//     );
//   }


// Version 2 

// import {
//     Box,
//     Container,
//     Heading,
//     Text,
//     Stack,
//     Divider,
//     Button,
//     HStack,
//     VStack,
//     Spinner,
//     useToast,
//     Tag,
//     AlertDialog,
//     AlertDialogOverlay,
//     AlertDialogContent,
//     AlertDialogHeader,
//     AlertDialogBody,
//     AlertDialogFooter,
//     useDisclosure,
//   } from "@chakra-ui/react";
//   import { useParams, useNavigate } from "react-router-dom";
//   import { useEffect, useState, useRef } from "react";
//   import axios from "axios";
//   import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
//   import VendorFormModal from "./VendorFormModal";
  
//   interface Vendor {
//     id: number;
//     name: string;
//     type: string;
//     contact_name: string;
//     phone: string;
//     email: string;
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     payment_mode: string;
//     bank_name: string;
//     account_no: string;
//     ifsc_code: string;
//     upi_id: string;
//     payment_terms: string;
//     commission_percent: number;
//     base_rate: number;
//     advance_allowed: number;
//     status: string;
//     created_at: string;
//   }
  
//   export default function VendorDetailsPage() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [vendor, setVendor] = useState<Vendor | null>(null);
//     const [loading, setLoading] = useState(true);
//     const toast = useToast();
  
//     const { isOpen, onOpen, onClose } = useDisclosure(); // Delete dialog
//     const cancelRef = useRef<any>();
//     const [isDeleting, setIsDeleting] = useState(false);
  
//     const [editOpen, setEditOpen] = useState(false);
  
//     const fetchVendor = () => {
//       setLoading(true);
//       axios
//         .get(`https://admee.in:3003/api/tfc/vendors/${id}`)
//         .then((res) => setVendor(res.data))
//         .catch((err) =>
//           toast({ title: "Error fetching vendor", description: err.message, status: "error" })
//         )
//         .finally(() => setLoading(false));
//     };
  
//     useEffect(() => {
//       fetchVendor();
//     }, [id]);
  
//     const handleDelete = () => {
//       setIsDeleting(true);
//       axios
//         .delete(`https://admee.in:3003/api/tfc/vendors/${id}`)
//         .then(() => {
//           toast({ title: "Vendor deleted successfully", status: "success" });
//           navigate("/vendors");
//         })
//         .catch((err) =>
//           toast({ title: "Delete failed", description: err.message, status: "error" })
//         )
//         .finally(() => setIsDeleting(false));
//     };
  
//     if (loading)
//       return (
//         <Box py={20} textAlign="center">
//           <Spinner size="xl" color="brand.500" />
//         </Box>
//       );
  
//     if (!vendor)
//       return (
//         <Box py={20} textAlign="center">
//           <Text>No vendor found.</Text>
//         </Box>
//       );
  
//     return (
//       <Container maxW="6xl" py={10}>
//         <Heading mb={6} color="brand.700">
//           Vendor Details
//         </Heading>
  
//         <Box
//           p={6}
//           borderWidth="1px"
//           borderRadius="xl"
//           shadow="sm"
//           bg="white"
//           _hover={{ shadow: "md" }}
//         >
//           <Stack spacing={4}>
//             {/* Basic Info */}
//             <Box>
//               <Heading size="md" color="brand.600" mb={2}>
//                 {vendor.name}
//               </Heading>
//               <VStack align="start" spacing={1} fontSize="sm">
//                 <Text><b>Type:</b> {vendor.type}</Text>
//                 <Text><b>Contact:</b> {vendor.contact_name || "-"} ({vendor.phone || "N/A"})</Text>
//                 {vendor.email && <Text><b>Email:</b> {vendor.email}</Text>}
//                 <Text><b>City:</b> {vendor.city || "-"}</Text>
//                 {vendor.address && <Text><b>Address:</b> {vendor.address}</Text>}
//                 <Text>
//                   <b>Status:</b>{" "}
//                   <Tag
//                     colorScheme={
//                       vendor.status === "active"
//                         ? "green"
//                         : vendor.status === "inactive"
//                         ? "red"
//                         : "gray"
//                     }
//                   >
//                     {vendor.status}
//                   </Tag>
//                 </Text>
//                 <Text color="gray.500" fontSize="sm">
//                   Added on{" "}
//                   {new Date(vendor.created_at).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </Text>
//               </VStack>
//             </Box>
  
//             <Divider />
  
//             {/* Payment Details */}
//             <Box>
//               <Heading size="sm" mb={2} color="brand.600">
//                 Payment & Banking Info
//               </Heading>
//               <VStack align="start" spacing={1} fontSize="sm">
//                 <Text><b>Payment Mode:</b> {vendor.payment_mode || "-"}</Text>
//                 {vendor.bank_name && (
//                   <Text>
//                     <b>Bank:</b> {vendor.bank_name} ({vendor.account_no || "-"})
//                   </Text>
//                 )}
//                 {vendor.ifsc_code && <Text><b>IFSC:</b> {vendor.ifsc_code}</Text>}
//                 {vendor.upi_id && <Text><b>UPI ID:</b> {vendor.upi_id}</Text>}
//                 {vendor.payment_terms && <Text><b>Payment Terms:</b> {vendor.payment_terms}</Text>}
//               </VStack>
//             </Box>
  
//             <Divider />
  
//             {/* Business Info */}
//             <Box>
//               <Heading size="sm" mb={2} color="brand.600">
//                 Business & Rate Info
//               </Heading>
//               <VStack align="start" spacing={1} fontSize="sm">
//                 <Text><b>Commission %:</b> {vendor.commission_percent || 0}%</Text>
//                 <Text><b>Base Rate:</b> ₹{vendor.base_rate || 0}</Text>
//                 <Text><b>Advance Allowed:</b> {vendor.advance_allowed ? "Yes" : "No"}</Text>
//               </VStack>
//             </Box>
  
//             <Divider />
  
//             <HStack>
//               <Button
//                 colorScheme="brand"
//                 size="sm"
//                 leftIcon={<EditIcon />}
//                 onClick={() => setEditOpen(true)}
//               >
//                 Edit Vendor
//               </Button>


//               <Button
//                 size="sm"
//                 variant="outline"
//                 colorScheme="red"
//                 leftIcon={<DeleteIcon />}
//                 onClick={onOpen}
//               >
//                 Delete Vendor
//               </Button>
//             </HStack>
//           </Stack>
//         </Box>
  
//         {/* Delete Confirmation */}
//         <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
//           <AlertDialogOverlay>
//             <AlertDialogContent>
//               <AlertDialogHeader>Delete Vendor</AlertDialogHeader>
//               <AlertDialogBody>
//                 Are you sure? This will permanently delete the vendor record.
//               </AlertDialogBody>
//               <AlertDialogFooter>
//                 <Button ref={cancelRef} onClick={onClose}>
//                   Cancel
//                 </Button>
//                 <Button colorScheme="red" ml={3} onClick={handleDelete} isLoading={isDeleting}>
//                   Delete
//                 </Button>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialogOverlay>
//         </AlertDialog>
  
//         {/* Edit Vendor Modal */}
//         {editOpen && (
//           <VendorFormModal
//             isOpen={editOpen}
//             onClose={() => setEditOpen(false)}
//             onSuccess={fetchVendor}
//           />
//         )}
//       </Container>
//     );
//   }


// Version 3 

import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Divider,
    Button,
    HStack,
    VStack,
    Spinner,
    useToast,
    Tag,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Input,
    Textarea,
    Select,
    Switch,
    Wrap,
    WrapItem,
    Badge,
  } from "@chakra-ui/react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
  import SelectMulti from "react-select";
  
  // ---- service options (used in multi-select) ----
  const serviceOptions = [
    { value: "van", label: "Funeral Van" },
    { value: "freezer", label: "Freezer Box" },
    { value: "floral", label: "Floral Decoration" },
    { value: "music", label: "Music / Band" },
    { value: "priest", label: "Priest / Rituals" },
    { value: "coffin", label: "Coffin / Accessories" },
    { value: "food", label: "Food & Refreshments" },
    { value: "ground", label: "Funeral Ground Services" },
  ];
  
  interface Vendor {
    id: number;
    name: string;
    type: string;                 // comma-separated services in DB
    contact_name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    google_location_url: string;
    payment_mode: string;
    bank_name: string;
    account_no: string;
    ifsc_code: string;
    upi_id: string;
    payment_terms: string;
    commission_percent: number | null;
    base_rate: number | null;     // (kept for global fallback)
    advance_allowed: number;      // 0/1 in DB
    status: string;               // 'active' | 'inactive'
    created_at: string;
  }
  
  export default function VendorDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
  
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
  
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [draft, setDraft] = useState<Vendor | null>(null); // local editable copy
    const [selectedServices, setSelectedServices] = useState<any[]>([]); // for multi-select
  
    // delete dialog
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const [isDeleting, setIsDeleting] = useState(false);
  
    // ----- fetch -----
    const fetchVendor = () => {
      setLoading(true);
      axios
        .get(`https://admee.in:3003/api/tfc/vendors/${id}`)
        .then((res) => {
          const v: Vendor = res.data;
          setVendor(v);
          setDraft(v); // initialize editable copy
  
          // prefill multi-select from comma-separated type
          const types = (v.type || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
          const sel = types.map((val) => ({
            value: val,
            label: serviceOptions.find((s) => s.value === val)?.label || val,
          }));
          setSelectedServices(sel);
        })
        .catch((err) =>
          toast({ title: "Error fetching vendor", description: err.message, status: "error" })
        )
        .finally(() => setLoading(false));
    };
  
    useEffect(() => {
      fetchVendor();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
    // ----- handlers -----
    const handleDelete = () => {
      setIsDeleting(true);
      axios
        .delete(`https://admee.in:3003/api/tfc/vendors/${id}`)
        .then(() => {
          toast({ title: "Vendor deleted successfully", status: "success" });
          navigate("/vendors");
        })
        .catch((err) =>
          toast({ title: "Delete failed", description: err.message, status: "error" })
        )
        .finally(() => setIsDeleting(false));
    };
  
    const startEdit = () => {
      setDraft(vendor); // sync current to draft
      // ensure multi-select is in sync
      const types = (vendor?.type || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const sel = types.map((val) => ({
        value: val,
        label: serviceOptions.find((s) => s.value === val)?.label || val,
      }));
      setSelectedServices(sel);
      setEditMode(true);
    };
  
    const cancelEdit = () => {
      setDraft(vendor); // revert changes
      // revert services too
      const types = (vendor?.type || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const sel = types.map((val) => ({
        value: val,
        label: serviceOptions.find((s) => s.value === val)?.label || val,
      }));
      setSelectedServices(sel);
      setEditMode(false);
    };
  
    const onChangeField = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type, checked } = e.target;
      setDraft((prev) =>
        prev
          ? {
              ...prev,
              [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
            }
          : prev
      );
    };
  
    const saveChanges = () => {
      if (!draft) return;
  
      // map selected services back to comma-separated string
      const typeStr = selectedServices.map((s: any) => s.value).join(",");
  
      const payload = {
        ...draft,
        type: typeStr,
        // ensure numeric fields are numbers or null
        commission_percent:
          draft.commission_percent === null || draft.commission_percent === ("" as any)
            ? null
            : Number(draft.commission_percent),
        base_rate:
          draft.base_rate === null || draft.base_rate === ("" as any)
            ? null
            : Number(draft.base_rate),
        advance_allowed: draft.advance_allowed ? 1 : 0,
      };
  
      setSaving(true);
      axios
        .put(`https://admee.in:3003/api/tfc/vendors/${draft.id}`, payload)
        .then(() => {
          toast({ title: "Vendor updated", status: "success" });
          setEditMode(false);
          fetchVendor();
        })
        .catch((err) =>
          toast({ title: "Update failed", description: err.message, status: "error" })
        )
        .finally(() => setSaving(false));
    };
  
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
  
        <Box p={6} borderWidth="1px" borderRadius="xl" shadow="sm" bg="white">
          <Stack spacing={6}>
            {/* Header + Actions */}
            <HStack justify="space-between" align="center">
              <Heading size="md" color="brand.600">
                {editMode ? "Edit Vendor" : vendor.name}
              </Heading>
              <HStack>
                {editMode ? (
                  <>
                    <Button
                      colorScheme="brand"
                      leftIcon={<CheckIcon />}
                      onClick={saveChanges}
                      isLoading={saving}
                    >
                      Save
                    </Button>
                    <Button leftIcon={<CloseIcon />} onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button colorScheme="brand" leftIcon={<EditIcon />} onClick={startEdit}>
                      Edit
                    </Button>
                    <Button variant="outline" colorScheme="red" leftIcon={<DeleteIcon />} onClick={onOpen}>
                      Delete
                    </Button>
                  </>
                )}
              </HStack>
            </HStack>
  
            {/* Services */}
            <Box>
              <Heading size="sm" color="brand.600" mb={2}>
                Services Provided
              </Heading>
              {editMode ? (
                <Box>
                  <SelectMulti
                    isMulti
                    options={serviceOptions}
                    value={selectedServices}
                    onChange={(sel) => setSelectedServices(sel as any[])}
                    placeholder="Select one or more services..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: "#87CEFA",
                        borderRadius: 8,
                        minHeight: 40,
                      }),
                    }}
                  />
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    These map to the comma-separated <i>type</i> field in DB.
                  </Text>
                </Box>
              ) : (
                <Wrap>
                  {(vendor.type || "")
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <WrapItem key={t}>
                        <Badge variant="subtle" colorScheme="blue">
                          {serviceOptions.find((s) => s.value === t)?.label || t}
                        </Badge>
                      </WrapItem>
                    ))}
                  {(!vendor.type || vendor.type.trim() === "") && (
                    <Text color="gray.500">No services added.</Text>
                  )}
                </Wrap>
              )}
            </Box>
  
            <Divider />
  
            {/* General Info */}
            <Box>
              <Heading size="sm" color="brand.600" mb={2}>
                General Information
              </Heading>
              <VStack align="stretch" spacing={3}>
                {editMode ? (
                  <>
                    <Input name="name" value={draft?.name || ""} onChange={onChangeField} placeholder="Vendor Name" />
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Input name="contact_name" value={draft?.contact_name || ""} onChange={onChangeField} placeholder="Contact Person" />
                      <Input name="phone" value={draft?.phone || ""} onChange={onChangeField} placeholder="Phone" />
                    </HStack>
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Input name="email" value={draft?.email || ""} onChange={onChangeField} placeholder="Email" />
                      <Input name="city" value={draft?.city || ""} onChange={onChangeField} placeholder="City" />
                    </HStack>
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Input name="state" value={draft?.state || ""} onChange={onChangeField} placeholder="State" />
                      <Input name="country" value={draft?.country || ""} onChange={onChangeField} placeholder="Country" />
                      <Input name="pincode" value={draft?.pincode || ""} onChange={onChangeField} placeholder="Pincode" />
                      <Input name="google_location_url" value={draft?.google_location_url || ""} onChange={onChangeField} placeholder="Google Location URL" />
                    </HStack>
                    <Textarea name="address" value={draft?.address || ""} onChange={onChangeField} placeholder="Address" />
                  </>
                ) : (
                  <>
                    <Text><b>Contact:</b> {vendor.contact_name || "-"} ({vendor.phone || "N/A"})</Text>
                    <Text><b>Email:</b> {vendor.email || "-"}</Text>
                    <Text><b>Location:</b> {[vendor.city, vendor.state, vendor.country, vendor.pincode].filter(Boolean).join(", ") || "-"}</Text>
                    <Text><b>Address:</b> {vendor.address || "-"}</Text>
                    <Text><b>Google Location URL</b> {vendor.google_location_url} </Text>
                  </>
                )}
              </VStack>
            </Box>
  
            <Divider />
  
            {/* Payment & Banking */}
            <Box>
              <Heading size="sm" color="brand.600" mb={2}>
                Payment & Banking Info
              </Heading>
              <VStack align="stretch" spacing={3}>
                {editMode ? (
                  <>
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Select name="payment_mode" value={draft?.payment_mode || "bank"} onChange={onChangeField}>
                        <option value="bank">Bank Transfer</option>
                        <option value="upi">UPI</option>
                        <option value="cash">Cash</option>
                      </Select>
                      <Select name="status" value={draft?.status || "active"} onChange={onChangeField}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Select>
                    </HStack>
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Input name="bank_name" value={draft?.bank_name || ""} onChange={onChangeField} placeholder="Bank Name" />
                      <Input name="account_no" value={draft?.account_no || ""} onChange={onChangeField} placeholder="Account No" />
                    </HStack>
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Input name="ifsc_code" value={draft?.ifsc_code || ""} onChange={onChangeField} placeholder="IFSC Code" />
                      <Input name="upi_id" value={draft?.upi_id || ""} onChange={onChangeField} placeholder="UPI ID" />
                    </HStack>
                    <Textarea name="payment_terms" value={draft?.payment_terms || ""} onChange={onChangeField} placeholder="Payment Terms" />
                  </>
                ) : (
                  <>
                    <Text><b>Payment Mode:</b> {vendor.payment_mode || "-"}</Text>
                    <Text><b>Status:</b> <Tag colorScheme={vendor.status === "active" ? "green" : "red"}>{vendor.status}</Tag></Text>
                    <Text><b>Bank:</b> {vendor.bank_name || "-"} ({vendor.account_no || "-"})</Text>
                    <Text><b>IFSC:</b> {vendor.ifsc_code || "-"}</Text>
                    <Text><b>UPI ID:</b> {vendor.upi_id || "-"}</Text>
                    <Text><b>Terms:</b> {vendor.payment_terms || "-"}</Text>
                  </>
                )}
              </VStack>
            </Box>
  
            <Divider />
  
            {/* Business & Rates */}
            <Box>
              <Heading size="sm" color="brand.600" mb={2}>
                Business & Rates
              </Heading>
              <VStack align="stretch" spacing={3}>
                {editMode ? (
                  <>
                    <HStack flexDir={{ base: "column", md: "row" }} spacing={4}>
                      <Input
                        name="commission_percent"
                        value={draft?.commission_percent ?? ""}
                        onChange={onChangeField}
                        placeholder="Commission %"
                      />
                      <Input
                        name="base_rate"
                        value={draft?.base_rate ?? ""}
                        onChange={onChangeField}
                        placeholder="Base Rate (₹)"
                      />
                    </HStack>
                    <HStack align="center" spacing={3}>
                      <Switch
                        isChecked={!!draft?.advance_allowed}
                        onChange={(e) =>
                          setDraft((prev) => (prev ? { ...prev, advance_allowed: e.target.checked ? 1 : 0 } : prev))
                        }
                      />
                      <Text>Advance Allowed</Text>
                    </HStack>
                  </>
                ) : (
                  <>
                    <Text><b>Commission %:</b> {vendor.commission_percent ?? 0}</Text>
                    <Text><b>Base Rate:</b> ₹{vendor.base_rate ?? 0}</Text>
                    <Text><b>Advance Allowed:</b> {vendor.advance_allowed ? "Yes" : "No"}</Text>
                  </>
                )}
              </VStack>
            </Box>
  
            <Divider />
  
            <Text color="gray.500" fontSize="sm">
              Added on {new Date(vendor.created_at).toLocaleDateString("en-IN")}
            </Text>
          </Stack>
        </Box>
  
        {/* Delete Confirmation */}
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Delete Vendor</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? This will permanently delete the vendor record.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" ml={3} onClick={handleDelete} isLoading={isDeleting}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    );
  }
  