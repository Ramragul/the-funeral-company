// Version 1

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Input,
//   Textarea,
//   Switch,
//   FormControl,
//   FormLabel,
//   Button,
//   Heading,
//   VStack,
//   HStack,
//   Image,
//   IconButton,
//   useToast,
//   Spinner,
//   Center,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Checkbox,
//   CheckboxGroup,
//   Stack,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";

// export default function GroundEditPage() {
//   const { id } = useParams();
//   const toast = useToast();

//   const [ground, setGround] = useState<any>({});
//   const [images, setImages] = useState<any[]>([]);
//   const [newFiles, setNewFiles] = useState<FileList | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     axios
//       .get(`https://admee.in:3003/api/tfc/grounds/${id}`)
//       .then((res) => {
//         setGround(res.data || {});
//         setImages(res.data.images || []);
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const saveContent = async () => {
//     try {
//       await axios.post("https://admee.in:3003/api/tfc/grounds/update", {
//         ...ground,
//         id,
//       });
//       toast({ title: "Saved", status: "success" });
//     } catch (e: any) {
//       toast({
//         title: "Error",
//         description: e.message,
//         status: "error",
//       });
//     }
//   };

//   const uploadImages = async () => {
//     if (!newFiles) return toast({ title: "No files", status: "error" });
//     const form = new FormData();
//     Array.from(newFiles).forEach((f) => form.append("photos", f));

//     try {
//       const up = await axios.post("https://admee.in:3003/aws/upload", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       const uploaded = up.data.imageURLs;

//       await axios.post(
//         `https://admee.in:3003/api/tfc/grounds/${id}/images`,
//         { images: uploaded }
//       );

//       const fresh = await axios.get(
//         `https://admee.in:3003/api/tfc/grounds/${id}`
//       );
//       setImages(fresh.data.images || []);
//       toast({ title: "Images added", status: "success" });
//       setNewFiles(null);
//     } catch (err: any) {
//       toast({ title: "Upload failed", description: err.message, status: "error" });
//     }
//   };

//   const reorder = async (index: number, dir: "up" | "down") => {
//     const newImgs = [...images];
//     if (dir === "up" && index > 0)
//       [newImgs[index - 1], newImgs[index]] = [newImgs[index], newImgs[index - 1]];
//     if (dir === "down" && index < newImgs.length - 1)
//       [newImgs[index + 1], newImgs[index]] = [newImgs[index], newImgs[index + 1]];
//     setImages(newImgs);

//     const payload = newImgs.map((img, i) => ({
//       imageId: img.id,
//       position: i,
//     }));
//     await axios.post(
//       `https://admee.in:3003/api/tfc/grounds/${id}/images/reorder`,
//       { images: payload }
//     );
//     toast({ title: "Order saved", status: "success" });
//   };

//   const deleteImg = async (img: any) => {
//     if (!confirm("Delete image?")) return;
//     await axios.post(
//       `https://admee.in:3003/api/tfc/grounds/${id}/images/delete`,
//       { imageId: img.id, s3Key: img.s3_key }
//     );
//     const fresh = await axios.get(`https://admee.in:3003/api/tfc/grounds/${id}`);
//     setImages(fresh.data.images || []);
//     toast({ title: "Deleted", status: "info" });
//   };

//   if (loading) return <Center py={20}><Spinner size="xl" /></Center>;

//   return (
//     <Box p={{ base: 4, md: 6 }} maxW="6xl" mx="auto">
//       <Heading mb={4} fontSize={{ base: "lg", md: "2xl" }}>
//         Edit Ground — {ground.name}
//       </Heading>

//       <Tabs isFitted variant="enclosed">
//         <TabList>
//           <Tab>Details</Tab>
//           <Tab>Images</Tab>
//         </TabList>

//         <TabPanels>
//           {/* ---------- DETAILS TAB ---------- */}
//           <TabPanel>
//             <VStack spacing={4} align="stretch">
//               <FormControl>
//                 <FormLabel>Name</FormLabel>
//                 <Input
//                   value={ground.name || ""}
//                   onChange={(e) =>
//                     setGround({ ...ground, name: e.target.value })
//                   }
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Address</FormLabel>
//                 <Textarea
//                   value={ground.address || ""}
//                   onChange={(e) =>
//                     setGround({ ...ground, address: e.target.value })
//                   }
//                 />
//               </FormControl>

//               {/* Responsive row */}
//               <Stack
//                 direction={{ base: "column", md: "row" }}
//                 spacing={4}
//                 w="100%"
//               >
//                 <FormControl>
//                   <FormLabel>City</FormLabel>
//                   <Input
//                     value={ground.city || ""}
//                     onChange={(e) =>
//                       setGround({ ...ground, city: e.target.value })
//                     }
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Pincode</FormLabel>
//                   <Input
//                     value={ground.pincode || ""}
//                     onChange={(e) =>
//                       setGround({ ...ground, pincode: e.target.value })
//                     }
//                   />
//                 </FormControl>
//               </Stack>

//               <Stack
//                 direction={{ base: "column", md: "row" }}
//                 spacing={4}
//                 w="100%"
//               >
//                 <FormControl>
//                   <FormLabel>Phone</FormLabel>
//                   <Input
//                     value={ground.phone || ""}
//                     onChange={(e) =>
//                       setGround({ ...ground, phone: e.target.value })
//                     }
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Email</FormLabel>
//                   <Input
//                     value={ground.email || ""}
//                     onChange={(e) =>
//                       setGround({ ...ground, email: e.target.value })
//                     }
//                   />
//                 </FormControl>
//               </Stack>

//               <Stack direction={{ base: "column", md: "row" }} spacing={4}>
//                 <FormControl display="flex" alignItems="center">
//                   <FormLabel mb="0">Parking</FormLabel>
//                   <Switch
//                     isChecked={!!ground.parking}
//                     onChange={(e) =>
//                       setGround({ ...ground, parking: e.target.checked })
//                     }
//                   />
//                 </FormControl>
//                 <FormControl display="flex" alignItems="center">
//                   <FormLabel mb="0">Water Facility</FormLabel>
//                   <Switch
//                     isChecked={!!ground.water_facility}
//                     onChange={(e) =>
//                       setGround({ ...ground, water_facility: e.target.checked })
//                     }
//                   />
//                 </FormControl>
//               </Stack>

//               <FormControl>
//                 <FormLabel>Operating Hours</FormLabel>
//                 <Input
//                   value={ground.operating_hours || ""}
//                   onChange={(e) =>
//                     setGround({ ...ground, operating_hours: e.target.value })
//                   }
//                   placeholder="08:00-20:00"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Description</FormLabel>
//                 <Textarea
//                   value={ground.description || ""}
//                   onChange={(e) =>
//                     setGround({ ...ground, description: e.target.value })
//                   }
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Google Map URL</FormLabel>
//                 <Input
//                   value={ground.google_map_url || ""}
//                   onChange={(e) =>
//                     setGround({ ...ground, google_map_url: e.target.value })
//                   }
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Religions Supported</FormLabel>
//                 <CheckboxGroup
//                   value={ground.religions_supported || []}
//                   onChange={(vals) =>
//                     setGround({ ...ground, religions_supported: vals })
//                   }
//                 >
//                   <Stack direction={{ base: "column", md: "row" }}>
//                     {["Hindu", "Christian", "Muslim", "Jain", "Parsi"].map(
//                       (rel) => (
//                         <Checkbox key={rel} value={rel}>
//                           {rel}
//                         </Checkbox>
//                       )
//                     )}
//                   </Stack>
//                 </CheckboxGroup>
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Services</FormLabel>
//                 <CheckboxGroup
//                   value={ground.services || []}
//                   onChange={(vals) =>
//                     setGround({ ...ground, services: vals })
//                   }
//                 >
//                   <Stack direction={{ base: "column", md: "row" }}>
//                     {["Burial", "Cremation", "Electric", "Manual", "Memorial"].map(
//                       (s) => (
//                         <Checkbox key={s} value={s}>
//                           {s}
//                         </Checkbox>
//                       )
//                     )}
//                   </Stack>
//                 </CheckboxGroup>
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Procedures</FormLabel>
//                 <Textarea
//                   value={ground.procedures || ""}
//                   onChange={(e) =>
//                     setGround({ ...ground, procedures: e.target.value })
//                   }
//                 />
//               </FormControl>

//               <Button
//                 colorScheme="blue"
//                 onClick={saveContent}
//                 w={{ base: "100%", md: "auto" }}
//               >
//                 Save Content
//               </Button>
//             </VStack>
//           </TabPanel>

//           {/* ---------- IMAGES TAB ---------- */}
//           <TabPanel>
//             <FormControl>
//               <FormLabel>Upload (multiple)</FormLabel>
//               <Input
//                 type="file"
//                 multiple
//                 onChange={(e) => setNewFiles(e.target.files)}
//               />
//             </FormControl>
//             <Button onClick={uploadImages} mt={2} w={{ base: "100%", md: "auto" }}>
//               Upload to S3 & Attach
//             </Button>

//             <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
//               {images.map((img, idx) => (
//                 <Box
//                   key={img.id}
//                   borderWidth="1px"
//                   borderRadius="md"
//                   overflow="hidden"
//                   p={2}
//                   textAlign="center"
//                 >
//                   <Image
//                     src={img.url}
//                     boxSize="150px"
//                     objectFit="cover"
//                     mx="auto"
//                     mb={2}
//                   />
//                   <HStack justify="center">
//                     <IconButton
//                       aria-label="Up"
//                       icon={<ArrowUpIcon />}
//                       size="sm"
//                       onClick={() => reorder(idx, "up")}
//                     />
//                     <IconButton
//                       aria-label="Down"
//                       icon={<ArrowDownIcon />}
//                       size="sm"
//                       onClick={() => reorder(idx, "down")}
//                     />
//                     <IconButton
//                       aria-label="Delete"
//                       icon={<DeleteIcon />}
//                       size="sm"
//                       onClick={() => deleteImg(img)}
//                     />
//                   </HStack>
//                 </Box>
//               ))}
//             </SimpleGrid>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </Box>
//   );
// }



// Version 2 


import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Switch,
  FormControl,
  FormLabel,
  Button,
  Heading,
  VStack,
  HStack,
  Image,
  IconButton,
  useToast,
  Spinner,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  CheckboxGroup,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";

export default function GroundEditPage() {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [ground, setGround] = useState<any>({});
  const [images, setImages] = useState<any[]>([]);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://admee.in:3003/api/tfc/grounds/${id}`)
      .then((res) => {
        setGround(res.data || {});
        setImages(res.data.images || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const saveContent = async () => {
    try {
      await axios.post("https://admee.in:3003/api/tfc/grounds/update", {
        ...ground,
        id,
      });
      toast({ title: "Saved", status: "success" });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        status: "error",
      });
    }
  };

  const uploadImages = async () => {
    if (!newFiles) return toast({ title: "No files", status: "error" });
    const form = new FormData();
    Array.from(newFiles).forEach((f) => form.append("photos", f));

    try {
      const up = await axios.post("https://admee.in:3003/aws/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploaded = up.data.imageURLs;

      await axios.post(
        `https://admee.in:3003/api/tfc/grounds/${id}/images`,
        { images: uploaded }
      );

      const fresh = await axios.get(
        `https://admee.in:3003/api/tfc/grounds/${id}`
      );
      setImages(fresh.data.images || []);
      toast({ title: "Images added", status: "success" });
      setNewFiles(null);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, status: "error" });
    }
  };

  const reorder = async (index: number, dir: "up" | "down") => {
    const newImgs = [...images];
    if (dir === "up" && index > 0)
      [newImgs[index - 1], newImgs[index]] = [newImgs[index], newImgs[index - 1]];
    if (dir === "down" && index < newImgs.length - 1)
      [newImgs[index + 1], newImgs[index]] = [newImgs[index], newImgs[index + 1]];
    setImages(newImgs);

    const payload = newImgs.map((img, i) => ({
      imageId: img.id,
      position: i,
    }));
    await axios.post(
      `https://admee.in:3003/api/tfc/grounds/${id}/images/reorder`,
      { images: payload }
    );
    toast({ title: "Order saved", status: "success" });
  };

  const deleteImg = async (img: any) => {
    if (!confirm("Delete image?")) return;
    await axios.post(
      `https://admee.in:3003/api/tfc/grounds/${id}/images/delete`,
      { imageId: img.id, s3Key: img.s3_key }
    );
    const fresh = await axios.get(`https://admee.in:3003/api/tfc/grounds/${id}`);
    setImages(fresh.data.images || []);
    toast({ title: "Deleted", status: "info" });
  };

  if (loading) return <Center py={20}><Spinner size="xl" /></Center>;

  return (
    <Box p={{ base: 4, md: 6 }} maxW="6xl" mx="auto">

    {/* 🌸 Stylish Back Button */}
      <Button
        leftIcon={<ArrowBackIcon />}
        // bgGradient="linear(to-r, blue.400, blue.600)"
        colorScheme="brand"
        color="white"
        _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)" }}
        borderRadius="full"
        px={6}
        mb={4}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Heading mb={4} fontSize={{ base: "lg", md: "2xl" }}>
        Edit Ground — {ground.name}
      </Heading>

      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Details</Tab>
          <Tab>Images</Tab>
        </TabList>

        <TabPanels>
          {/* ---------- DETAILS TAB ---------- */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={ground.name || ""}
                  onChange={(e) =>
                    setGround({ ...ground, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Textarea
                  value={ground.address || ""}
                  onChange={(e) =>
                    setGround({ ...ground, address: e.target.value })
                  }
                />
              </FormControl>

              {/* Responsive row */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                w="100%"
              >
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input
                    value={ground.city || ""}
                    onChange={(e) =>
                      setGround({ ...ground, city: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Pincode</FormLabel>
                  <Input
                    value={ground.pincode || ""}
                    onChange={(e) =>
                      setGround({ ...ground, pincode: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>

              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                w="100%"
              >
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    value={ground.phone || ""}
                    onChange={(e) =>
                      setGround({ ...ground, phone: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={ground.email || ""}
                    onChange={(e) =>
                      setGround({ ...ground, email: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>

              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Parking</FormLabel>
                  <Switch
                    isChecked={!!ground.parking}
                    onChange={(e) =>
                      setGround({ ...ground, parking: e.target.checked })
                    }
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Water Facility</FormLabel>
                  <Switch
                    isChecked={!!ground.water_facility}
                    onChange={(e) =>
                      setGround({ ...ground, water_facility: e.target.checked })
                    }
                  />
                </FormControl>
              </Stack>

              <FormControl>
                <FormLabel>Operating Hours</FormLabel>
                <Input
                  value={ground.operating_hours || ""}
                  onChange={(e) =>
                    setGround({ ...ground, operating_hours: e.target.value })
                  }
                  placeholder="08:00-20:00"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={ground.description || ""}
                  onChange={(e) =>
                    setGround({ ...ground, description: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Google Map URL</FormLabel>
                <Input
                  value={ground.google_map_url || ""}
                  onChange={(e) =>
                    setGround({ ...ground, google_map_url: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Religions Supported</FormLabel>
                <CheckboxGroup
                  value={ground.religions_supported || []}
                  onChange={(vals) =>
                    setGround({ ...ground, religions_supported: vals })
                  }
                >
                  <Stack direction={{ base: "column", md: "row" }}>
                    {["Hindu", "Christian", "Muslim", "Jain", "Parsi"].map(
                      (rel) => (
                        <Checkbox key={rel} value={rel}>
                          {rel}
                        </Checkbox>
                      )
                    )}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Services</FormLabel>
                <CheckboxGroup
                  value={ground.services || []}
                  onChange={(vals) =>
                    setGround({ ...ground, services: vals })
                  }
                >
                  <Stack direction={{ base: "column", md: "row" }}>
                    {["Burial", "Cremation", "Electric", "Manual", "Memorial"].map(
                      (s) => (
                        <Checkbox key={s} value={s}>
                          {s}
                        </Checkbox>
                      )
                    )}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Procedures</FormLabel>
                <Textarea
                  value={ground.procedures || ""}
                  onChange={(e) =>
                    setGround({ ...ground, procedures: e.target.value })
                  }
                />
              </FormControl>

              <Button
                colorScheme="brand"
                onClick={saveContent}
                w={{ base: "100%", md: "auto" }}
              >
                Save Content
              </Button>
            </VStack>
          </TabPanel>

          {/* ---------- IMAGES TAB ---------- */}
          <TabPanel>
            <FormControl>
              <FormLabel>Upload (multiple)</FormLabel>
              <Input
                type="file"
                multiple
                onChange={(e) => setNewFiles(e.target.files)}
              />
            </FormControl>
            <Button onClick={uploadImages} mt={2} w={{ base: "100%", md: "auto" }}  colorScheme="brand">
              Upload to S3 & Attach
            </Button>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
              {images.map((img, idx) => (
                <Box
                  key={img.id}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  p={2}
                  textAlign="center"
                >
                  <Image
                    src={img.url}
                    boxSize="150px"
                    objectFit="cover"
                    mx="auto"
                    mb={2}
                  />
                  <HStack justify="center">
                    <IconButton
                      aria-label="Up"
                      icon={<ArrowUpIcon />}
                      size="sm"
                      onClick={() => reorder(idx, "up")}
                    />
                    <IconButton
                      aria-label="Down"
                      icon={<ArrowDownIcon />}
                      size="sm"
                      onClick={() => reorder(idx, "down")}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => deleteImg(img)}
                    />
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
