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
    Select,
    Textarea,
    Button,
    VStack,
    HStack,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  
  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  }
  
  export default function VendorFormModal({ isOpen, onClose, onSuccess }: Props) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
  
    const [form, setForm] = useState({
      name: "",
      type: "",
      contact_name: "",
      phone: "",
      city: "",
      address: "",
      payment_mode: "bank",
      base_rate: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = () => {
      if (!form.name || !form.type) {
        toast({ title: "Name and Type required", status: "warning" });
        return;
      }
      setLoading(true);
      axios
        .post("/api/tfc/vendors", form)
        .then(() => {
          toast({ title: "Vendor added successfully", status: "success" });
          onSuccess();
          onClose();
        })
        .catch((err) =>
          toast({ title: "Error adding vendor", description: err.message, status: "error" })
        )
        .finally(() => setLoading(false));
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader color="brand.700">Add New Vendor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Vendor Name</FormLabel>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Enter vendor name" />
              </FormControl>
  
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select name="type" value={form.type} onChange={handleChange} placeholder="Select type">
                    <option value="service">Service</option>
                    <option value="product">Product</option>
                    <option value="transport">Transport</option>
                    <option value="ground">Ground</option>
                    <option value="music">Music</option>
                    <option value="coffin">Coffin</option>
                  </Select>
                </FormControl>
  
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input name="city" value={form.city} onChange={handleChange} />
                </FormControl>
              </HStack>
  
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Contact Person</FormLabel>
                  <Input name="contact_name" value={form.contact_name} onChange={handleChange} />
                </FormControl>
  
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input name="phone" value={form.phone} onChange={handleChange} />
                </FormControl>
              </HStack>
  
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Textarea name="address" value={form.address} onChange={handleChange} />
              </FormControl>
  
              <FormControl>
                <FormLabel>Payment Mode</FormLabel>
                <Select name="payment_mode" value={form.payment_mode} onChange={handleChange}>
                  <option value="bank">Bank Transfer</option>
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                </Select>
              </FormControl>
  
              <FormControl>
                <FormLabel>Base Rate (₹)</FormLabel>
                <Input type="number" name="base_rate" value={form.base_rate} onChange={handleChange} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSubmit} isLoading={loading}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  