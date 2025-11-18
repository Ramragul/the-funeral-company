import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Select,
  Button,
  useToast,
  Spinner,
  Divider,
  Flex,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Booking {
  booking_id: number;
  order_id: number;
  package_code: string;
  service_date: string;
  customer_name: string;
  customer_phone: string;
  address: string;
}

export default function ScheduleCreation() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Fetch unassigned bookings
  useEffect(() => {
    axios
      .get("https://admee.in:3003/api/bookings/unassigned")
      .then((res) => {
        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          toast({ title: "Failed to load bookings", status: "error" });
        }
      })
      .catch(() =>
        toast({ title: "Error fetching bookings", status: "error" })
      )
      .finally(() => setLoading(false));
  }, []);

  // Generate Schedule API
  const handleGenerate = async () => {
    if (!selectedBookingId) {
      toast({ title: "Please select a booking first", status: "warning" });
      return;
    }

    const booking = bookings.find((b) => b.booking_id === selectedBookingId);
    if (!booking) return;

    try {
      const res = await axios.post("https://admee.in:3003/api/schedule/generate", {
        booking_id: booking.booking_id,
        package_code: booking.package_variant,
      });

      if (res.data.success) {
        toast({
          title: "Schedule Created Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // navigate(`/schedule/editor/${res.data.schedule_id}`);
        navigate(`/schedule/editor/${res.data.schedule_id}`, {
          state: { scheduleId: res.data.schedule_id },
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error creating schedule",
        description: "Something went wrong. Try again.",
        status: "error",
      });
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" h="60vh">
        <Spinner size="xl" color="blue.400" />
      </Flex>
    );
  }

  return (
    <Box
      p={8}
      maxW="700px"
      mx="auto"
      mt={10}
      bg="white"
      shadow="md"
      borderRadius="2xl"
    >
      <Heading
        size="lg"
        textAlign="center"
        color="blue.600"
        mb={6}
        fontWeight="bold"
      >
        Create New Schedule
      </Heading>

      {bookings.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          🎉 All bookings have schedules assigned!
        </Text>
      ) : (
        <VStack spacing={6} align="stretch">
          <Box>
            <Text mb={2} fontWeight="semibold" color="gray.700">
              Select a Booking
            </Text>
            <Select
              placeholder="Select a booking..."
              onChange={(e) => setSelectedBookingId(Number(e.target.value))}
              borderColor="blue.300"
              focusBorderColor="blue.500"
            >
              {bookings.map((b) => (
                <option key={b.booking_id} value={b.booking_id}>
                  #{b.booking_id} • {b.package_code} • {b.customer_name}
                </option>
              ))}
            </Select>
          </Box>

          {selectedBookingId && (
            <>
              <Divider />
              {(() => {
                const b = bookings.find(
                  (bk) => bk.booking_id === selectedBookingId
                );
                if (!b) return null;
                return (
                  <Box bg="gray.50" p={4} rounded="lg" shadow="xs">
                    <Text fontSize="sm">
                      <b>Customer:</b> {b.customer_name} ({b.customer_phone})
                    </Text>
                    <Text fontSize="sm">
                      <b>Address:</b> {b.address || "—"}
                    </Text>
                    <Text fontSize="sm">
                      <b>Package:</b>{" "}
                      <Badge colorScheme="blue">{b.package_code}</Badge>
                    </Text>
                    <Text fontSize="sm">
                      <b>Service Date:</b>{" "}
                      {new Date(b.service_date).toLocaleString()}
                    </Text>
                  </Box>
                );
              })()}
            </>
          )}

          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            onClick={handleGenerate}
            isDisabled={!selectedBookingId}
          >
            Generate Schedule
          </Button>
        </VStack>
      )}
    </Box>
  );
}
