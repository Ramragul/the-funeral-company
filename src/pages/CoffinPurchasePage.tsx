// Version 1 

// import {
//     Box,
//     Container,
//     Heading,
//     Text,
//     VStack,
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     Button,
//     Alert,
//     AlertIcon,
//     HStack,
//   } from "@chakra-ui/react";
//   import { useLocation, useNavigate } from "react-router-dom";
//   import { useState } from "react";
  
//   export default function CoffinPurchasePage() {
//     const navigate = useNavigate();
//     const location = useLocation();
  
//     // ✅ Get coffin details passed from CoffinDetailPage
//     const coffinData = location.state as any;
  
//     const [formData, setFormData] = useState({
//       name: "",
//       phone: "",
//       email: "",
//       address: "",
//       deliveryDate: coffinData?.deliveryDate || "",
//       notes: "",
//     });
  
//     const handleChange = (
//       e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
  
//       // ✅ Mock order ID
//       const orderId = Math.floor(100000 + Math.random() * 900000);
  
//       // Navigate to success page
//       navigate(`/purchase/success?orderId=${orderId}`, { state: { coffinData } });
//     };
  
//     return (
//       <Box py={{ base: 10, md: 20 }} bgGradient="linear(to-b, white, brand.50)">
//         <Container maxW="3xl">
//           <Heading as="h1" size="xl" mb={4} color="brand.600" textAlign="center">
//             Confirm Coffin Purchase
//           </Heading>
//           <Text color="gray.600" textAlign="center" mb={10}>
//             Please provide delivery details to complete your purchase.
//           </Text>
  
//           {/* Order Summary */}
//           {coffinData && (
//             <Alert status="info" borderRadius="md" mb={8} flexDirection="column" alignItems="flex-start">
//               <HStack>
//                 <AlertIcon />
//                 <Text>
//                   You are purchasing:{" "}
//                   <strong>
//                     {coffinData.name} (₹{coffinData.total.toLocaleString()})
//                   </strong>
//                 </Text>
//               </HStack>
//               <Text mt={2} fontSize="sm" color="gray.700">
//                 Size: {coffinData.size} | Qty: {coffinData.quantity}
//               </Text>
//               {coffinData.customizations?.length > 0 && (
//                 <Text mt={1} fontSize="sm" color="gray.700">
//                   Customizations: {coffinData.customizations.join(", ")}
//                 </Text>
//               )}
//             </Alert>
//           )}
  
//           <form onSubmit={handleSubmit}>
//             <VStack spacing={6} align="stretch">
//               <FormControl isRequired>
//                 <FormLabel>Full Name</FormLabel>
//                 <Input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                 />
//               </FormControl>
  
//               <FormControl isRequired>
//                 <FormLabel>Phone Number</FormLabel>
//                 <Input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+91 98765 43210"
//                 />
//               </FormControl>
  
//               <FormControl>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                 />
//               </FormControl>
  
//               <FormControl isRequired>
//                 <FormLabel>Delivery Address</FormLabel>
//                 <Textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Enter delivery address"
//                 />
//               </FormControl>
  
//               <FormControl isRequired>
//                 <FormLabel>Preferred Delivery Date</FormLabel>
//                 <Input
//                   type="date"
//                   name="deliveryDate"
//                   value={formData.deliveryDate}
//                   onChange={handleChange}
//                 />
//               </FormControl>
  
//               <FormControl>
//                 <FormLabel>Additional Notes</FormLabel>
//                 <Textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   placeholder="Any special requests or instructions"
//                 />
//               </FormControl>
  
//               {/* Buttons */}
//               <HStack justify="space-between">
//                 <Button variant="outline" onClick={() => navigate(-1)}>
//                   Back
//                 </Button>
//                 <Button type="submit" colorScheme="brand" size="lg">
//                   Confirm Purchase
//                 </Button>
//               </HStack>
//             </VStack>
//           </form>
//         </Container>
//       </Box>
//     );
//   }


// Version 2 - connection with backend api



import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Alert,
    AlertIcon,
    HStack,
    useToast,
  } from "@chakra-ui/react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import axios from "axios";
  
  export default function CoffinPurchasePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
  
    const coffinData = location.state as any;
  
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      deliveryDate: coffinData?.deliveryDate || "",
      notes: "",
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const { data } = await axios.post(`https://admee.in:3003/api/coffins/purchase`, {
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
          shippingAddress: formData.address,
          productId: coffinData.productId,
          size: coffinData.size,
          customizations: coffinData.customizations,
          quantity: coffinData.quantity,
          deliveryDate: formData.deliveryDate,
          collectionDate: coffinData.collectionDate || null,
          notes: formData.notes,
        });
  
        toast({ title: "Purchase successful", status: "success" });
  
        navigate(`/purchase/success?orderId=${data.orderId}`, {
          state: { ...coffinData, orderId: data.orderId },
        });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.response?.data?.error || err.message,
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box py={{ base: 10, md: 20 }} bgGradient="linear(to-b, white, brand.50)">
        <Container maxW="3xl">
          <Heading as="h1" size="xl" mb={4} color="brand.600" textAlign="center">
            Confirm Coffin Purchase
          </Heading>
          <Text color="gray.600" textAlign="center" mb={10}>
            Please provide delivery details to complete your purchase.
          </Text>
  
          {coffinData && (
            <Alert
              status="info"
              borderRadius="md"
              mb={8}
              flexDirection="column"
              alignItems="flex-start"
            >
              <HStack>
                <AlertIcon />
                <Text>
                  You are purchasing:{" "}
                  <strong>
                    {coffinData.name} (₹{coffinData.total.toLocaleString()})
                  </strong>
                </Text>
              </HStack>
              <Text mt={2} fontSize="sm" color="gray.700">
                Size: {coffinData.size} | Qty: {coffinData.quantity}
              </Text>
              {coffinData.customizations?.length > 0 && (
                <Text mt={1} fontSize="sm" color="gray.700">
                  Customizations: {coffinData.customizations.join(", ")}
                </Text>
              )}
            </Alert>
          )}
  
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>
  
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Delivery Address</FormLabel>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Preferred Delivery Date</FormLabel>
                <Input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                />
              </FormControl>
  
              <FormControl>
                <FormLabel>Additional Notes</FormLabel>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </FormControl>
  
              <HStack justify="space-between">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  isLoading={loading}
                >
                  Confirm Purchase
                </Button>
              </HStack>
            </VStack>
          </form>
        </Container>
      </Box>
    );
  }
  