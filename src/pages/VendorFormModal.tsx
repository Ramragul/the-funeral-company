
  


// Version 1 : Mobile Friendly


// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalCloseButton,
//     ModalBody,
//     ModalFooter,
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     Button,
//     VStack,
//     HStack,
//     useToast,
//     Select,
//     Box,
//     Text,
//     Stack,
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import axios from "axios";
//   import SelectMulti from "react-select";
  
//   interface Props {
//     isOpen: boolean;
//     onClose: () => void;
//     onSuccess: () => void;
//   }
  
//   const serviceOptions = [
//     { value: "van", label: "Funeral Van" },
//     { value: "freezer", label: "Freezer Box" },
//     { value: "floral", label: "Floral Decoration" },
//     { value: "music", label: "Music / Band" },
//     { value: "priest", label: "Priest / Rituals" },
//     { value: "coffin", label: "Coffin / Accessories" },
//     { value: "food", label: "Food & Refreshments" },
//     { value: "ground", label: "Funeral Ground Services" },
//   ];
  
//   export default function VendorFormModal({ isOpen, onClose, onSuccess }: Props) {
//     const toast = useToast();
//     const [loading, setLoading] = useState(false);
//     const [selectedServices, setSelectedServices] = useState<any[]>([]);
//     const [rates, setRates] = useState<{ [key: string]: string }>({});
  
//     const [form, setForm] = useState({
//       name: "",
//       contact_name: "",
//       phone: "",
//       city: "",
//       address: "",
//       payment_mode: "bank",
//     });
  
//     const handleChange = (
//       e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//     ) => {
//       const { name, value } = e.target;
//       setForm((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleRateChange = (service: string, value: string) => {
//       setRates((prev) => ({ ...prev, [service]: value }));
//     };
  
//     const handleSubmit = async () => {
//       if (!form.name || selectedServices.length === 0) {
//         toast({
//           title: "Missing fields",
//           description: "Vendor name and at least one service are required.",
//           status: "warning",
//         });
//         return;
//       }
  
//       const vendorPayload = {
//         ...form,
//         type: selectedServices.map((s) => s.value).join(","),
//       };
  
//       const catalogData = selectedServices.map((s) => ({
//         service_code: s.value,
//         base_rate: parseFloat(rates[s.value] || "0"),
//       }));
  
//       setLoading(true);
//       try {
//         const res = await axios.post("https://admee.in:3003/api/tfc/vendors", vendorPayload);
//         const vendorId = res.data.vendor_id;
  
//         await axios.post(`https://admee.in:3003/api/tfc/vendors/${vendorId}/catalog`, {
//           services: catalogData,
//         });
  
//         toast({ title: "Vendor added successfully", status: "success" });
//         onSuccess();
//         onClose();
//       } catch (err: any) {
//         toast({
//           title: "Error adding vendor",
//           description: err.message,
//           status: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return (
//       <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }} scrollBehavior="inside" isCentered>
//         <ModalOverlay />
//         <ModalContent borderRadius="2xl" mx={{ base: 3, md: 0 }}>
//           <ModalHeader color="brand.700" textAlign="center" fontSize={{ base: "xl", md: "2xl" }}>
//             Add New Vendor
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <VStack spacing={4} align="stretch">
//               <FormControl isRequired>
//                 <FormLabel>Vendor Name</FormLabel>
//                 <Input name="name" value={form.name} onChange={handleChange} placeholder="Vendor name" />
//               </FormControl>
  
//               <FormControl isRequired>
//                 <FormLabel>Services Provided</FormLabel>
//                 <SelectMulti
//                   isMulti
//                   options={serviceOptions}
//                   value={selectedServices}
//                   onChange={(selected) => setSelectedServices(selected as any[])}
//                   placeholder="Select one or more services..."
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       borderColor: "#87CEFA",
//                       borderRadius: "8px",
//                       minHeight: "40px",
//                     }),
//                   }}
//                 />
//               </FormControl>
  
//               {selectedServices.length > 0 && (
//                 <Box bg="brand.50" p={3} borderRadius="md">
//                   <Text fontWeight="medium" mb={2}>
//                     Enter Base Rate for Each Service:
//                   </Text>
//                   <VStack align="stretch" spacing={3}>
//                     {selectedServices.map((s) => (
//                       <Stack key={s.value} direction={{ base: "column", sm: "row" }} align="center">
//                         <Text flex="1">{s.label}</Text>
//                         <Input
//                           flex="1"
//                           type="number"
//                           placeholder="Rate (₹)"
//                           value={rates[s.value] || ""}
//                           onChange={(e) => handleRateChange(s.value, e.target.value)}
//                         />
//                       </Stack>
//                     ))}
//                   </VStack>
//                 </Box>
//               )}
  
//               <Stack direction={{ base: "column", md: "row" }} spacing={4}>
//                 <FormControl>
//                   <FormLabel>Contact Person</FormLabel>
//                   <Input name="contact_name" value={form.contact_name} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Phone</FormLabel>
//                   <Input name="phone" value={form.phone} onChange={handleChange} />
//                 </FormControl>
//               </Stack>
  
//               <Stack direction={{ base: "column", md: "row" }} spacing={4}>
//                 <FormControl>
//                   <FormLabel>City</FormLabel>
//                   <Input name="city" value={form.city} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Payment Mode</FormLabel>
//                   <Select name="payment_mode" value={form.payment_mode} onChange={handleChange}>
//                     <option value="bank">Bank Transfer</option>
//                     <option value="upi">UPI</option>
//                     <option value="cash">Cash</option>
//                   </Select>
//                 </FormControl>
//               </Stack>
  
//               <FormControl>
//                 <FormLabel>Address</FormLabel>
//                 <Textarea name="address" value={form.address} onChange={handleChange} />
//               </FormControl>
//             </VStack>
//           </ModalBody>
  
//           <ModalFooter>
//             <Button
//               colorScheme="brand"
//               mr={3}
//               onClick={handleSubmit}
//               isLoading={loading}
//               w={{ base: "100%", md: "auto" }}
//             >
//               Save
//             </Button>
//             <Button variant="ghost" onClick={onClose} w={{ base: "100%", md: "auto" }}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     );
//   }


// Version 2 : Additional Fields

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    VStack,
    HStack,
    useToast,
    Select,
    Box,
    Text,
    Stack,
    Divider,
    Heading,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  import SelectMulti from "react-select";
  
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
  
  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  }
  
  export default function VendorFormModal({ isOpen, onClose, onSuccess }: Props) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [rates, setRates] = useState<{ [key: string]: string }>({});
  
    const [form, setForm] = useState({
      name: "",
      contact_name: "",
      contact_designation: "",
      phone: "",
      alternate_phone: "",
      city: "",
      address: "",
      pincode: "",
      google_location_url: "",
      payment_mode: "bank",
      operational_hours: "",
      available_days: "",
      conditions: "",
      remarks: "",
    });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleRateChange = (service: string, value: string) => {
      setRates((prev) => ({ ...prev, [service]: value }));
    };
  
    const handleSubmit = async () => {
      if (!form.name || selectedServices.length === 0) {
        toast({
          title: "Missing fields",
          description: "Vendor name and at least one service are required.",
          status: "warning",
        });
        return;
      }
  
      const vendorPayload = {
        ...form,
        type: selectedServices.map((s) => s.value).join(","),
      };
  
      const catalogData = selectedServices.map((s) => ({
        service_code: s.value,
        base_rate: parseFloat(rates[s.value] || "0"),
      }));
  
      setLoading(true);
      try {
        const res = await axios.post("https://admee.in:3003/api/tfc/vendors", vendorPayload);
        const vendorId = res.data.vendor_id;
  
        await axios.post(`https://admee.in:3003/api/tfc/vendors/${vendorId}/catalog`, {
          services: catalogData,
        });
  
        toast({ title: "Vendor added successfully", status: "success" });
        onSuccess();
        onClose();
      } catch (err: any) {
        toast({
          title: "Error adding vendor",
          description: err.message,
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx={{ base: 3, md: 0 }}>
          <ModalHeader color="brand.700" textAlign="center" fontSize={{ base: "xl", md: "2xl" }}>
            Add New Vendor
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              {/* Basic Info */}
              <Box>
                <Heading size="sm" color="brand.600" mb={3}>Basic Details</Heading>
                <FormControl isRequired>
                  <FormLabel>Vendor Name</FormLabel>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Vendor name" />
                </FormControl>
  
                <FormControl isRequired mt={3}>
                  <FormLabel>Services Provided</FormLabel>
                  <SelectMulti
                    isMulti
                    options={serviceOptions}
                    value={selectedServices}
                    onChange={(selected) => setSelectedServices(selected as any[])}
                    placeholder="Select one or more services..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: "#87CEFA",
                        borderRadius: "8px",
                        minHeight: "40px",
                      }),
                    }}
                  />
                </FormControl>
  
                {selectedServices.length > 0 && (
                  <Box bg="brand.50" p={3} mt={3} borderRadius="md">
                    <Text fontWeight="medium" mb={2}>
                      Enter Base Rate for Each Service:
                    </Text>
                    <VStack align="stretch" spacing={3}>
                      {selectedServices.map((s) => (
                        <Stack key={s.value} direction={{ base: "column", sm: "row" }} align="center">
                          <Text flex="1">{s.label}</Text>
                          <Input
                            flex="1"
                            type="number"
                            placeholder="Rate (₹)"
                            value={rates[s.value] || ""}
                            onChange={(e) => handleRateChange(s.value, e.target.value)}
                          />
                        </Stack>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Box>
  
              <Divider />
  
              {/* Contact Info */}
              <Box>
                <Heading size="sm" color="brand.600" mb={3}>Contact Information</Heading>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <FormControl>
                    <FormLabel>Contact Person</FormLabel>
                    <Input name="contact_name" value={form.contact_name} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Designation</FormLabel>
                    <Input name="contact_designation" value={form.contact_designation} onChange={handleChange} />
                  </FormControl>
                </Stack>
  
                <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={3}>
                  <FormControl>
                    <FormLabel>Primary Phone</FormLabel>
                    <Input name="phone" value={form.phone} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Alternate / WhatsApp</FormLabel>
                    <Input name="alternate_phone" value={form.alternate_phone} onChange={handleChange} />
                  </FormControl>
                </Stack>
              </Box>
  
              <Divider />
  
              {/* Operational Info */}
              <Box>
                <Heading size="sm" color="brand.600" mb={3}>Operational Details</Heading>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <FormControl>
                    <FormLabel>Operational Hours</FormLabel>
                    <Input name="operational_hours" value={form.operational_hours} onChange={handleChange} placeholder="e.g. 6 AM - 10 PM" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Available Days</FormLabel>
                    <Input name="available_days" value={form.available_days} onChange={handleChange} placeholder="e.g. Mon - Sat" />
                  </FormControl>
                </Stack>
  
                <FormControl mt={3}>
                  <FormLabel>Special Conditions</FormLabel>
                  <Textarea name="conditions" value={form.conditions} onChange={handleChange} placeholder="Mention any special conditions..." />
                </FormControl>
              </Box>
  
              <Divider />
  
              {/* Address & Payment */}
              <Box>
                <Heading size="sm" color="brand.600" mb={3}>Address & Payment</Heading>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input name="city" value={form.city} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Payment Mode</FormLabel>
                    <Select name="payment_mode" value={form.payment_mode} onChange={handleChange}>
                      <option value="bank">Bank Transfer</option>
                      <option value="upi">UPI</option>
                      <option value="cash">Cash</option>
                    </Select>
                  </FormControl>
                </Stack>
  
                <FormControl mt={3}>
                  <FormLabel>Full Address</FormLabel>
                  <Textarea name="address" value={form.address} onChange={handleChange} />
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Pincode</FormLabel>
                  <Input name="pincode" value={form.pincode} onChange={handleChange} />
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Google Location URL</FormLabel>
                  <Input name="google_location_url" value={form.google_location_url} onChange={handleChange} />
                </FormControl>
              </Box>
  
              <Divider />
  
              {/* Remarks */}
              <Box>
                <Heading size="sm" color="brand.600" mb={3}>Remarks / Notes</Heading>
                <FormControl>
                  <Textarea name="remarks" value={form.remarks} onChange={handleChange} placeholder="Internal notes about this vendor..." />
                </FormControl>
              </Box>
            </VStack>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSubmit} isLoading={loading} w={{ base: "100%", md: "auto" }}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose} w={{ base: "100%", md: "auto" }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  