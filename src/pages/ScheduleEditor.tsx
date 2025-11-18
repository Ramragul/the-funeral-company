
// Version 1

// import {
//     Table, Thead, Tbody, Tr, Th, Td, Button, Input, Select, Box, Flex, Heading, HStack, useToast
//   } from "@chakra-ui/react";
//   import { useEffect, useState } from "react";
//   import axios from "axios";
//   import { useLocation } from "react-router-dom";
  
//   type Vendor = { id:number; name:string; type:string; city?:string };
  
//   function supportsType(v: Vendor, vendorType: string) {
//     if (!v?.type || !vendorType) return false;
//     const types = v.type.toLowerCase().split(",").map(s => s.trim());
//     return types.includes(vendorType.toLowerCase());
//   }
  
//   export default function ScheduleEditor() {
//     const toast = useToast();
//     const location = useLocation();
//     const [scheduleId, setScheduleId] = useState<string>((location.state as any)?.scheduleId || "");
//     const [searchId, setSearchId] = useState<string>("");
//     const [bookingCity, setBookingCity] = useState<string>("");
//     const [tasks, setTasks] = useState<any[]>([]);
//     const [vendorsInCity, setVendorsInCity] = useState<Vendor[]>([]);
  
//     // Load schedule details (tasks + booking city)
//     useEffect(() => {
//       if (!scheduleId) return;
//       axios.get(`https://admee.in:3003/api/schedule/${scheduleId}/details`)
//         .then(res => {
//           if (res.data.success) {
//             setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
//             setBookingCity(res.data.booking_city || "");
//           } else {
//             setTasks([]); setBookingCity("");
//           }
//         })
//         .catch(() => { setTasks([]); setBookingCity(""); });
//     }, [scheduleId]);
  
//     // Load vendors by booking city (once city is known)
//     useEffect(() => {
//       if (!bookingCity) return;
//       axios.get(`https://admee.in:3003/api/vendors/by-city/${encodeURIComponent(bookingCity)}`)
//         .then(res => setVendorsInCity(res.data?.vendors || []))
//         .catch(() => setVendorsInCity([]));
//     }, [bookingCity]);
  
//     // Manual search
//     const handleSearch = () => {
//       if (!searchId.trim()) { toast({title:"Enter Schedule ID", status:"warning"}); return; }
//       setScheduleId(searchId.trim());
//     };
  
//     const handleSave = async (taskId: number) => {
//       const vendorSel = document.getElementById(`vendor-${taskId}`) as HTMLSelectElement;
//       const dateInp = document.getElementById(`date-${taskId}`) as HTMLInputElement;
//       const timeInp = document.getElementById(`time-${taskId}`) as HTMLInputElement;
  
//       const vendor_id = vendorSel?.value ?? "";
//       const scheduled_date = dateInp?.value || null;
//       const scheduled_time = timeInp?.value || null;
  
//       try {
//         await axios.patch(`https://admee.in:3003/api/schedule/update-task/${taskId}`, {
//           vendor_id: vendor_id, // may be "", backend treats as unassign if empty/null
//           scheduled_date,
//           scheduled_time
//         });
//         toast({ title: vendor_id ? "Assigned & Saved" : "Vendor Unassigned", status: "success" });
//       } catch {
//         toast({ title: "Save failed", status: "error" });
//       }
//     };
  
//     return (
//       <Box p={6}>
//         <Heading size="md" mb={4} color="blue.600">Schedule Editor</Heading>
  
//         <HStack spacing={3} mb={4}>
//           <Input
//             placeholder="Enter Schedule ID"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             maxW="300px"
//           />
//           <Button colorScheme="blue" onClick={handleSearch}>Search</Button>
//         </HStack>
  
//         {scheduleId && (
//           <Box mb={4}>
//             <Heading size="sm" color="gray.600">
//               Viewing Schedule ID: {scheduleId} {bookingCity ? `• City: ${bookingCity}` : ""}
//             </Heading>
//           </Box>
//         )}
  
//         <Table variant="striped" colorScheme="blue">
//           <Thead>
//             <Tr>
//               <Th>Event</Th>
//               <Th>Vendor Type</Th>
//               <Th>Vendor</Th>
//               <Th>Date</Th>
//               <Th>Time</Th>
//               <Th>Action</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {tasks.length ? tasks.map((t) => {
//               const eligible = vendorsInCity.filter(v => supportsType(v, t.vendor_type));
//               return (
//                 <Tr key={t.id}>
//                   <Td>{t.action_item}</Td>
//                   <Td>{t.vendor_type}</Td>
//                   <Td>
//                     <Select
//                       placeholder={eligible.length ? "Select Vendor" : "No vendors in city/type"}
//                       defaultValue={t.vendor_id || ""}
//                       id={`vendor-${t.id}`}
//                     >
//                       {/* Allow unassign */}
//                       <option value="">— Unassigned —</option>
//                       {eligible.map(v => (
//                         <option key={v.id} value={v.id}>{v.name}</option>
//                       ))}
//                     </Select>
//                   </Td>
//                   <Td>
//                     <Input type="date" id={`date-${t.id}`} defaultValue={t.scheduled_date || ""} />
//                   </Td>
//                   <Td>
//                     <Input type="time" id={`time-${t.id}`} defaultValue={t.scheduled_time || ""} />
//                   </Td>
//                   <Td>
//                     <HStack>
//                       <Button colorScheme="blue" onClick={() => handleSave(t.id)}>Save</Button>
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           const sel = document.getElementById(`vendor-${t.id}`) as HTMLSelectElement;
//                           if (sel) sel.value = "";
//                           handleSave(t.id);
//                         }}
//                       >
//                         Unassign
//                       </Button>
//                     </HStack>
//                   </Td>
//                 </Tr>
//               );
//             }) : (
//               <Tr>
//                 <Td colSpan={6} textAlign="center" color="gray.500">No tasks found for this schedule.</Td>
//               </Tr>
//             )}
//           </Tbody>
//         </Table>
//       </Box>
//     );
//   }



// Version 2 


import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Select,
    Stack,
    Text,
    useToast,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useLocation } from "react-router-dom";
  
  type Vendor = { id: number; name: string; type: string; city?: string };
  
  function supportsType(v: Vendor, vendorType: string) {
    if (!v?.type || !vendorType) return false;
    return v.type
      .toLowerCase()
      .split(",")
      .map((s) => s.trim())
      .includes(vendorType.toLowerCase());
  }
  
  export default function ScheduleEditor() {
    const toast = useToast();
    const location = useLocation();
    const [scheduleId, setScheduleId] = useState<string>(
      (location.state as any)?.scheduleId || ""
    );
    const [searchId, setSearchId] = useState("");
    const [bookingCity, setBookingCity] = useState("");
    const [tasks, setTasks] = useState<any[]>([]);
    const [vendorsInCity, setVendorsInCity] = useState<Vendor[]>([]);
  
    // Load schedule & city
    // useEffect(() => {
    //   if (!scheduleId) return;
    //   axios
    //     .get(`https://admee.in:3003/api/schedule/${scheduleId}/details`)
    //     .then((res) => {
    //       if (res.data.success) {
    //         setTasks(res.data.tasks || []);
    //         setBookingCity(res.data.booking_city || "");
    //       } else setTasks([]);
    //     })
    //     .catch(() => setTasks([]));
    // }, [scheduleId]);

    // ✅ Load schedule & city
useEffect(() => {
    if (!scheduleId) return;
    axios
      .get(`https://admee.in:3003/api/schedule/${scheduleId}/details`)
      .then((res) => {
        if (res.data.success) {
          const fetched = res.data.tasks || [];
  
          // 👇 Normalize date/time so browser displays correctly
          const formatted = fetched.map((t: any) => ({
            ...t,
            scheduled_date: t.scheduled_date
              ? new Date(t.scheduled_date).toISOString().split("T")[0]
              : "",
            scheduled_time: t.scheduled_time
              ? t.scheduled_time.slice(0, 5)
              : "",
          }));
  
          setTasks(formatted);
          setBookingCity(res.data.booking_city || "");
        } else setTasks([]);
      })
      .catch(() => setTasks([]));
  }, [scheduleId]);
  
  
    // Load vendors
    useEffect(() => {
      if (!bookingCity) return;
      axios
        .get(
          `https://admee.in:3003/api/vendors/by-city/${encodeURIComponent(
            bookingCity
          )}`
        )
        .then((res) => setVendorsInCity(res.data?.vendors || []))
        .catch(() => setVendorsInCity([]));
    }, [bookingCity]);
  
    const handleSearch = () => {
      if (!searchId.trim())
        return toast({ title: "Enter Schedule ID", status: "warning" });
      setScheduleId(searchId.trim());
    };
  
    const updateTaskField = (taskId: number, field: string, value: any) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, [field]: value } : t))
      );
    };
  
    const handleSave = async (task: any) => {
      try {
        await axios.patch(
          `https://admee.in:3003/api/schedule/update-task/${task.id}`,
          {
            vendor_id: task.vendor_id || "",
            scheduled_date: task.scheduled_date || null,
            scheduled_time: task.scheduled_time || null,
          }
        );
        toast({
          title: task.vendor_id ? "Assigned Successfully" : "Vendor Unassigned",
          status: "success",
        });
      } catch {
        toast({ title: "Save failed", status: "error" });
      }
    };
  
    const handleSendForApproval = () => {
      if (!tasks.length)
        return toast({ title: "No tasks to send", status: "info" });
      toast({
        title: "Schedule ready for client approval",
        status: "success",
      });
    };
  
    return (
      <Box p={{ base: 4, md: 8 }}>
        <Heading size="lg" mb={6} color="blue.700">
          Schedule Editor
        </Heading>
  
        {/* Search Box */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={3}
          mb={6}
          align="flex-start"
        >
          <Input
            placeholder="Enter Schedule ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            maxW={{ base: "100%", md: "300px" }}
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
        </Flex>
  
        {scheduleId && (
          <Text mb={6} fontSize="md" color="gray.600">
            Viewing Schedule <b>#{scheduleId}</b> {bookingCity && `• ${bookingCity}`}
          </Text>
        )}
  
        {/* Task Cards */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {tasks.length > 0 ? (
            tasks.map((t) => {
              const eligible = vendorsInCity.filter((v) =>
                supportsType(v, t.vendor_type)
              );
  
              return (
                <Card
                  key={t.id}
                  borderRadius="xl"
                  shadow="md"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{ shadow: "lg", transform: "scale(1.01)" }}
                  transition="0.2s"
                >
                  <CardHeader pb={2}>
                    <Heading size="md" color="blue.600">
                      {t.action_item}
                    </Heading>
                    <Text color="gray.500" fontSize="sm">
                      Vendor Type: {t.vendor_type}
                    </Text>
                  </CardHeader>
  
                  <Divider />
  
                  <CardBody>
                    <Stack spacing={4}>
                      <Box>
                        <Text fontWeight="500" mb={1}>
                          Select Vendor
                        </Text>
                        <Select
                          placeholder={
                            eligible.length
                              ? "Select Vendor"
                              : "No vendors available"
                          }
                          value={t.vendor_id || ""}
                          onChange={(e) =>
                            updateTaskField(t.id, "vendor_id", e.target.value)
                          }
                        >
                          <option value="">— Unassigned —</option>
                          {eligible.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                        </Select>
                      </Box>
  
                      <Flex gap={3} wrap="wrap">
                        <Box flex="1">
                          <Text fontWeight="500" mb={1}>
                            Date
                          </Text>
                          <Input
                            type="date"
                            value={t.scheduled_date || ""}
                            onChange={(e) =>
                              updateTaskField(
                                t.id,
                                "scheduled_date",
                                e.target.value
                              )
                            }
                          />
                        </Box>
                        <Box flex="1">
                          <Text fontWeight="500" mb={1}>
                            Time
                          </Text>
                          <Input
                            type="time"
                            value={t.scheduled_time || ""}
                            onChange={(e) =>
                              updateTaskField(
                                t.id,
                                "scheduled_time",
                                e.target.value
                              )
                            }
                          />
                        </Box>
                      </Flex>
                    </Stack>
                  </CardBody>
  
                  <CardFooter justifyContent="flex-end" gap={3}>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => handleSave(t)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => {
                        updateTaskField(t.id, "vendor_id", "");
                        handleSave({ ...t, vendor_id: "" });
                      }}
                    >
                      Unassign
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <Text color="gray.500">No schedule tasks found.</Text>
          )}
        </SimpleGrid>
  
        {tasks.length > 0 && (
          <Flex justify="flex-end" mt={8}>
            <Button colorScheme="green" onClick={handleSendForApproval}>
              Send Schedule for Client Approval
            </Button>
          </Flex>
        )}
      </Box>
    );
  }
  
  