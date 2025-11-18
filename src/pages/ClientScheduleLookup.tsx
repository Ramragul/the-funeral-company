import {
    Box, Input, Button, Text, VStack, Heading, Card, CardBody, CardHeader,
    CardFooter, StackDivider, SimpleGrid, useToast
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  
  export default function ClientScheduleLookup() {
    const [contact, setContact] = useState("");
    const [schedules, setSchedules] = useState<any[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<any[]>([]);
    const [viewingId, setViewingId] = useState<number | null>(null);
    const toast = useToast();
  
    const handleLookup = async () => {
      if (!contact.trim())
        return toast({ title: "Please enter your mobile or email", status: "warning" });
      try {
        const res = await axios.post("https://admee.in:3003/api/client/find-schedules", { contact });
        setSchedules(res.data.schedules || []);
      } catch (err: any) {
        setSchedules([]);
        toast({ title: err?.response?.data?.message || "No schedules found", status: "error" });
      }
    };
  
    const handleView = async (id: number) => {
      try {
        const res = await axios.get(`https://admee.in:3003/api/client/schedule/${id}`);
        setViewingId(id);
        setSelectedSchedule(res.data.schedule || []);
      } catch {
        toast({ title: "Failed to load schedule details", status: "error" });
      }
    };
  
    return (
      <Box p={{ base: 4, md: 8 }} maxW="5xl" mx="auto">
        <Heading size="lg" mb={6} textAlign="center" color="blue.700">
          View Your Funeral Service Schedule
        </Heading>
  
        <VStack spacing={4} align="stretch" mb={6}>
          <Input
            placeholder="Enter your registered mobile number or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleLookup}>
            View My Schedule
          </Button>
        </VStack>
  
        {schedules.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mt={6}>
            {schedules.map((s) => (
              <Card
                key={s.schedule_id}
                borderWidth="1px"
                borderColor="gray.200"
                shadow="sm"
                _hover={{ shadow: "md" }}
              >
                <CardHeader>
                  <Text fontWeight="600">Schedule #{s.schedule_id}</Text>
                  <Text fontSize="sm" color="gray.500">
                    City: {s.city} • Date: {new Date(s.service_date).toLocaleDateString()}
                  </Text>
                </CardHeader>
                <CardFooter>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleView(s.schedule_id)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
  
        {viewingId && selectedSchedule.length > 0 && (
          <Card mt={10} shadow="lg" borderRadius="xl">
            <CardHeader bg="blue.50" borderBottom="1px solid #d9e3f0">
              <Heading size="md" color="blue.700">
                Schedule #{viewingId} — Event Details
              </Heading>
            </CardHeader>
            <CardBody divider={<StackDivider />}>
              {selectedSchedule.map((e: any, idx: number) => (
                <Box key={idx} py={2}>
                  <Text fontWeight="600">{e.event}</Text>
                  <Text fontSize="sm" color="gray.600">
                    Date: {e.date || "-"} • Time: {e.time || "-"}
                  </Text>
                </Box>
              ))}
            </CardBody>
          </Card>
        )}
      </Box>
    );
  }
  