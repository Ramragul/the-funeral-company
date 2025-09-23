// Version 1

// import React, { useState } from "react";
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
// } from "@chakra-ui/react";
// import axios from "axios";
// import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";
// import { v4 as uuidv4 } from "uuid";

// export default function GroundCreatePage() {
//   const toast = useToast();

//   // --- State ---
//   const [ground, setGround] = useState<any>({
//     id: `GROUND-${uuidv4().slice(0, 8)}`, // generate unique ID
//     name: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: "",
//     email: "",
//     parking: false,
//     water_facility: false,
//     operating_hours: "",
//     description: "",
//   });
//   const [images, setImages] = useState<any[]>([]);
//   const [newFiles, setNewFiles] = useState<FileList | null>(null);

//   // --- Save Ground ---
//   const saveGround = async () => {
//     try {
//       await axios.post("https://admee.in:3003/api/tfc/grounds/create", ground);
//       toast({ title: "Ground saved", status: "success" });
//     } catch (err: any) {
//       console.error(err);
//       toast({ title: "Save failed", description: err.message, status: "error" });
//     }
//   };

//   // --- Upload Images ---
//   const uploadImages = async () => {
//     if (!newFiles) return toast({ title: "No files selected", status: "error" });
//     const form = new FormData();
//     Array.from(newFiles).forEach((f) => form.append("photos", f));

//     try {
//       // 1) upload to S3
//       const up = await axios.post("https://admee.in:3003/aws/upload", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       const uploaded = up.data.imageURLs; // [{url,s3Key}]

//       // 2) attach to DB
//       await axios.post(`https://admee.in:3003/api/tfc/grounds/${ground.id}/images`, {
//         images: uploaded,
//       });

//       // 3) refresh images
//       setImages((prev) => [...prev, ...uploaded.map((u: any, i: number) => ({
//         id: `temp-${Date.now()}-${i}`,
//         url: u.url,
//         s3_key: u.s3Key,
//         position: prev.length + i,
//       }))]);

//       toast({ title: "Images uploaded", status: "success" });
//       setNewFiles(null);
//     } catch (err: any) {
//       console.error(err);
//       toast({ title: "Upload failed", description: err.message, status: "error" });
//     }
//   };

//   // --- Reorder Images ---
//   const reorder = async (index: number, dir: "up" | "down") => {
//     const newImgs = [...images];
//     if (dir === "up" && index > 0)
//       [newImgs[index - 1], newImgs[index]] = [newImgs[index], newImgs[index - 1]];
//     if (dir === "down" && index < newImgs.length - 1)
//       [newImgs[index + 1], newImgs[index]] = [newImgs[index], newImgs[index + 1]];
//     setImages(newImgs);

//     // send reorder to backend
//     const payload = newImgs.map((img, i) => ({ imageId: img.id, position: i }));
//     try {
//       await axios.post(
//         `https://admee.in:3003/api/tfc/grounds/${ground.id}/images/reorder`,
//         { images: payload }
//       );
//       toast({ title: "Order saved", status: "success" });
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   // --- Delete Image ---
//   const deleteImg = async (img: any) => {
//     if (!window.confirm("Delete this image?")) return;
//     try {
//       await axios.post(
//         `https://admee.in:3003/api/tfc/grounds/${ground.id}/images/delete`,
//         { imageId: img.id, s3Key: img.s3_key }
//       );
//       setImages((prev) => prev.filter((i) => i.id !== img.id));
//       toast({ title: "Image deleted", status: "info" });
//     } catch (err: any) {
//       console.error(err);
//       toast({ title: "Delete failed", description: err.message, status: "error" });
//     }
//   };

//   return (
//     <Box p={6} maxW="3xl" mx="auto">
//       <Heading mb={4}>Create New Ground</Heading>

//       <VStack spacing={4} align="stretch">
//         <FormControl>
//           <FormLabel>Name</FormLabel>
//           <Input
//             value={ground.name}
//             onChange={(e) => setGround({ ...ground, name: e.target.value })}
//           />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Address</FormLabel>
//           <Textarea
//             value={ground.address}
//             onChange={(e) => setGround({ ...ground, address: e.target.value })}
//           />
//         </FormControl>
//         <HStack>
//           <FormControl>
//             <FormLabel>City</FormLabel>
//             <Input
//               value={ground.city}
//               onChange={(e) => setGround({ ...ground, city: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Pincode</FormLabel>
//             <Input
//               value={ground.pincode}
//               onChange={(e) => setGround({ ...ground, pincode: e.target.value })}
//             />
//           </FormControl>
//         </HStack>
//         <HStack>
//           <FormControl>
//             <FormLabel>Phone</FormLabel>
//             <Input
//               value={ground.phone}
//               onChange={(e) => setGround({ ...ground, phone: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Email</FormLabel>
//             <Input
//               value={ground.email}
//               onChange={(e) => setGround({ ...ground, email: e.target.value })}
//             />
//           </FormControl>
//         </HStack>

//         <HStack>
//           <FormControl display="flex" alignItems="center">
//             <FormLabel mb="0">Parking</FormLabel>
//             <Switch
//               isChecked={ground.parking}
//               onChange={(e) =>
//                 setGround({ ...ground, parking: e.target.checked })
//               }
//             />
//           </FormControl>
//           <FormControl display="flex" alignItems="center">
//             <FormLabel mb="0">Water Facility</FormLabel>
//             <Switch
//               isChecked={ground.water_facility}
//               onChange={(e) =>
//                 setGround({ ...ground, water_facility: e.target.checked })
//               }
//             />
//           </FormControl>
//         </HStack>

//         <FormControl>
//           <FormLabel>Operating Hours</FormLabel>
//           <Input
//             value={ground.operating_hours}
//             onChange={(e) =>
//               setGround({ ...ground, operating_hours: e.target.value })
//             }
//             placeholder="08:00-20:00"
//           />
//         </FormControl>

//         <FormControl>
//           <FormLabel>Description</FormLabel>
//           <Textarea
//             value={ground.description}
//             onChange={(e) =>
//               setGround({ ...ground, description: e.target.value })
//             }
//           />
//         </FormControl>

//         <Button colorScheme="blue" onClick={saveGround}>
//           Save Ground
//         </Button>

//         {/* --- Image Management --- */}
//         <Heading size="md" mt={6}>
//           Images
//         </Heading>
//         <FormControl>
//           <FormLabel>Upload Images</FormLabel>
//           <Input type="file" multiple onChange={(e) => setNewFiles(e.target.files)} />
//         </FormControl>
//         <Button onClick={uploadImages}>Upload to S3 & Attach</Button>

//         {images.map((img, idx) => (
//           <HStack key={img.id} align="center">
//             <Image src={img.url} boxSize="120px" objectFit="cover" />
//             <Button
//               size="sm"
//               onClick={() => reorder(idx, "up")}
//               leftIcon={<ArrowUpIcon />}
//             >
//               Up
//             </Button>
//             <Button
//               size="sm"
//               onClick={() => reorder(idx, "down")}
//               leftIcon={<ArrowDownIcon />}
//             >
//               Down
//             </Button>
//             <IconButton
//               aria-label="Delete"
//               icon={<DeleteIcon />}
//               onClick={() => deleteImg(img)}
//             />
//           </HStack>
//         ))}
//       </VStack>
//     </Box>
//   );
// }



// Version 2 


// GroundCreatePage.tsx
import React, { useState } from "react";
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
  Checkbox,
  CheckboxGroup,
  Stack,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import axios from "axios";
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";

type UploadedImage = { id: string | number; url: string; s3_key?: string; position?: number };

const RELIGION_OPTIONS = ["Hindu", "Christian", "Muslim", "Sikh", "Jain", "Other"];
const SERVICE_OPTIONS = ["Burial", "Cremation", "Memorial", "Transport", "Other"];
const CREMATION_TYPES = ["Electric", "Gas", "Manual"];

export default function GroundCreatePage() {
  const toast = useToast();

  // --- Ground state (id blank until backend creates and returns it) ---
  const [ground, setGround] = useState<any>({
    id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    capacity: "",
    parking: false,
    water_facility: false,
    operating_hours: "",
    description: "",
    procedures: "",
    google_map_url: "",
    religions_supported: [] as string[],
    services_selected: [] as string[], // for UI checkboxes
    cremation_types: [] as string[], // only used if Cremation selected
  });

  // images (either uploaded and attached or staged)
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [otherReligionInput, setOtherReligionInput] = useState("");
  const [otherServiceInput, setOtherServiceInput] = useState("");

  // --- Save ground (create) ---
  const saveGround = async () => {
    // basic validation
    if (!ground.name || !ground.city) {
      return toast({ title: "Name & City required", status: "error" });
    }

    // prepare services payload — allow detailed object for cremation
    const servicesPayload: any[] = [];
    for (const s of ground.services_selected) {
      if (s === "Cremation") {
        // include methods if chosen
        servicesPayload.push({
          type: "Cremation",
          methods: ground.cremation_types || [],
        });
      } else {
        servicesPayload.push(s);
      }
    }

    try {
      const payload = {
        name: ground.name,
        address: ground.address,
        city: ground.city,
        state: ground.state,
        pincode: ground.pincode,
        phone: ground.phone,
        email: ground.email,
        capacity: Number(ground.capacity) || null,
        parking: !!ground.parking,
        water_facility: !!ground.water_facility,
        operating_hours: ground.operating_hours || null,
        description: ground.description || null,
        procedures: ground.procedures || null,
        google_map_url: ground.google_map_url || null,
        religions_supported: ground.religions_supported || [],
        services: servicesPayload,
      };

      const res = await axios.post("https://admee.in:3003/api/tfc/grounds/create", payload);
      const newId = res.data?.groundId;
      if (newId) {
        setGround((g: any) => ({ ...g, id: newId }));
        toast({ title: "Ground saved", status: "success" });
        // optionally fetch existing images (if any) here by calling GET endpoint if implemented
      } else {
        toast({ title: "Saved but no id returned", status: "warning" });
      }
    } catch (err: any) {
      console.error("Save ground error:", err);
      toast({ title: "Save failed", description: err?.response?.data?.error || err.message, status: "error" });
    }
  };

  // --- Upload files to S3 then attach to DB ---
  const uploadImages = async () => {
    if (!ground.id) return toast({ title: "Save ground first", status: "error" });
    if (!newFiles || newFiles.length === 0) return toast({ title: "No files selected", status: "error" });

    const form = new FormData();
    Array.from(newFiles).forEach((f) => form.append("photos", f));

    try {
      const up = await axios.post("https://admee.in:3003/aws/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploaded: { url: string; s3Key?: string }[] = up.data.imageURLs || [];
      if (!Array.isArray(uploaded) || uploaded.length === 0) {
        return toast({ title: "Upload returned no URLs", status: "error" });
      }

      // Attach to DB
      await axios.post(`https://admee.in:3003/api/tfc/grounds/${ground.id}/images`, {
        images: uploaded,
      });

      // Push into UI state (temporary ids if backend doesn't return image ids)
      setImages((prev) => [
        ...prev,
        ...uploaded.map((u, i) => ({
          id: `tmp-${Date.now()}-${i}`,
          url: u.url,
          s3_key: u.s3Key,
          position: prev.length + i,
        })),
      ]);
      setNewFiles(null);
      toast({ title: "Images uploaded & attached", status: "success" });
    } catch (err: any) {
      console.error("UploadImages error:", err);
      toast({ title: "Upload failed", description: err?.response?.data?.error || err.message, status: "error" });
    }
  };

  // --- Reorder images locally + backend ---
  const reorder = async (index: number, dir: "up" | "down") => {
    const newImgs = [...images];
    if (dir === "up" && index > 0) {
      [newImgs[index - 1], newImgs[index]] = [newImgs[index], newImgs[index - 1]];
    }
    if (dir === "down" && index < newImgs.length - 1) {
      [newImgs[index + 1], newImgs[index]] = [newImgs[index], newImgs[index + 1]];
    }
    setImages(newImgs);

    // notify backend
    try {
      await axios.post(`https://admee.in:3003/api/tfc/grounds/${ground.id}/images/reorder`, {
        images: newImgs.map((img, i) => ({ imageId: img.id, position: i })),
      });
      toast({ title: "Order saved", status: "success" });
    } catch (err: any) {
      console.error("Reorder error:", err);
      toast({ title: "Reorder failed", status: "error" });
    }
  };

  // --- Delete image ---
  const deleteImg = async (img: UploadedImage) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.post(`https://admee.in:3003/api/tfc/grounds/${ground.id}/images/delete`, {
        imageId: img.id,
        s3Key: img.s3_key,
      });
      setImages((prev) => prev.filter((i) => i.id !== img.id));
      toast({ title: "Image deleted", status: "info" });
    } catch (err: any) {
      console.error("Delete image error:", err);
      toast({ title: "Delete failed", description: err?.response?.data?.error || err.message, status: "error" });
    }
  };

  // --- Helpers: add "Other" religion or service to arrays ---
  const addOtherReligion = () => {
    if (!otherReligionInput.trim()) return;
    setGround((g: any) => ({
      ...g,
      religions_supported: Array.from(new Set([...(g.religions_supported || []), otherReligionInput.trim()])),
    }));
    setOtherReligionInput("");
  };
  const addOtherService = () => {
    if (!otherServiceInput.trim()) return;
    setGround((g: any) => ({
      ...g,
      services_selected: Array.from(new Set([...(g.services_selected || []), otherServiceInput.trim()])),
    }));
    setOtherServiceInput("");
  };

  return (
    <Box p={6} maxW="3xl" mx="auto">
      <Heading mb={4}>Create / Edit Funeral Ground</Heading>

      <VStack spacing={4} align="stretch">
        {/* Basic */}
        <FormControl isRequired>
          <FormLabel>Ground Name</FormLabel>
          <Input value={ground.name} onChange={(e) => setGround({ ...ground, name: e.target.value })} />
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Textarea value={ground.address} onChange={(e) => setGround({ ...ground, address: e.target.value })} />
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input value={ground.city} onChange={(e) => setGround({ ...ground, city: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>State</FormLabel>
            <Input value={ground.state} onChange={(e) => setGround({ ...ground, state: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Pincode</FormLabel>
            <Input value={ground.pincode} onChange={(e) => setGround({ ...ground, pincode: e.target.value })} />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input value={ground.phone} onChange={(e) => setGround({ ...ground, phone: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={ground.email} onChange={(e) => setGround({ ...ground, email: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Capacity</FormLabel>
            <NumberInput min={0} value={ground.capacity} onChange={(_, v) => setGround({ ...ground, capacity: String(v) })}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </HStack>

        <HStack>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Parking</FormLabel>
            <Switch isChecked={ground.parking} onChange={(e) => setGround({ ...ground, parking: e.target.checked })} />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Water Facility</FormLabel>
            <Switch isChecked={ground.water_facility} onChange={(e) => setGround({ ...ground, water_facility: e.target.checked })} />
          </FormControl>
          <FormControl>
            <FormLabel>Operating Hours</FormLabel>
            <Input value={ground.operating_hours} onChange={(e) => setGround({ ...ground, operating_hours: e.target.value })} placeholder="e.g. 08:00-20:00" />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea value={ground.description} onChange={(e) => setGround({ ...ground, description: e.target.value })} />
        </FormControl>

        <FormControl>
          <FormLabel>Procedures / Requirements</FormLabel>
          <Textarea value={ground.procedures} onChange={(e) => setGround({ ...ground, procedures: e.target.value })} placeholder="Aadhar, doctor certificate, ID proof..." />
        </FormControl>

        <FormControl>
          <FormLabel>Google Map URL</FormLabel>
          <Input value={ground.google_map_url} onChange={(e) => setGround({ ...ground, google_map_url: e.target.value })} />
        </FormControl>

        {/* Religions supported */}
        <FormControl>
          <FormLabel>Religions Supported</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            value={ground.religions_supported}
            onChange={(vals) => setGround({ ...ground, religions_supported: vals as string[] })}
          >
            <Stack direction="row" wrap="wrap">
              {RELIGION_OPTIONS.map((r) => (
                <Checkbox key={r} value={r}>
                  {r}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>

          <HStack mt={2}>
            <Input placeholder="Other religion" value={otherReligionInput} onChange={(e) => setOtherReligionInput(e.target.value)} />
            <Button onClick={addOtherReligion}>Add</Button>
          </HStack>
        </FormControl>

        {/* Services */}
        <FormControl>
          <FormLabel>Services</FormLabel>
          <CheckboxGroup
            colorScheme="green"
            value={ground.services_selected}
            onChange={(vals) => setGround({ ...ground, services_selected: vals as string[] })}
          >
            <Stack direction="row" wrap="wrap">
              {SERVICE_OPTIONS.map((s) => (
                <Checkbox key={s} value={s}>
                  {s}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>

          <HStack mt={2}>
            <Input placeholder="Other service" value={otherServiceInput} onChange={(e) => setOtherServiceInput(e.target.value)} />
            <Button onClick={addOtherService}>Add</Button>
          </HStack>
        </FormControl>

        {/* Cremation types (conditional) */}
        {ground.services_selected?.includes("Cremation") && (
          <FormControl>
            <FormLabel>Cremation Methods / Types</FormLabel>
            <CheckboxGroup
              colorScheme="orange"
              value={ground.cremation_types}
              onChange={(vals) => setGround({ ...ground, cremation_types: vals as string[] })}
            >
              <Stack direction="row" wrap="wrap">
                {CREMATION_TYPES.map((t) => (
                  <Checkbox key={t} value={t}>
                    {t}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
        )}

        <HStack>
          <Button colorScheme="blue" onClick={saveGround}>Save Ground</Button>
          <Button variant="outline" onClick={() => {
            // quick reset
            setGround({
              id: "",
              name: "",
              address: "",
              city: "",
              state: "",
              pincode: "",
              phone: "",
              email: "",
              capacity: "",
              parking: false,
              water_facility: false,
              operating_hours: "",
              description: "",
              procedures: "",
              google_map_url: "",
              religions_supported: [],
              services_selected: [],
              cremation_types: [],
            });
            setImages([]);
            setNewFiles(null);
            toast({ title: "Form cleared", status: "info" });
          }}>
            Clear
          </Button>
        </HStack>

        {/* Image management */}
        <Heading size="md" mt={6}>Images</Heading>
        <FormControl>
          <FormLabel>Upload Images (save ground first)</FormLabel>
          <Input type="file" multiple onChange={(e) => setNewFiles(e.target.files)} />
        </FormControl>
        <HStack>
          <Button colorScheme="blue" onClick={uploadImages}>Upload & Attach</Button>
        </HStack>

        {images.map((img, idx) => (
          <HStack key={String(img.id)} align="center">
            <Image src={img.url} boxSize="120px" objectFit="cover" />
            <Button size="sm" onClick={() => reorder(idx, "up")} leftIcon={<ArrowUpIcon />}>Up</Button>
            <Button size="sm" onClick={() => reorder(idx, "down")} leftIcon={<ArrowDownIcon />}>Down</Button>
            <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={() => deleteImg(img)} />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
