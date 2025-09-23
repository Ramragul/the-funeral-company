// Version 1

//   import {
//     Box,
//     Container,
//     Heading,
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     Button,
//     VStack,
//     HStack,
//     Image,
//     IconButton,
//     useToast,
//   } from "@chakra-ui/react";
//   import { DeleteIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
//   import { useState } from "react";
//   import axios from "axios";
  
//   // slugify for product.id (safe key)
//   function slugify(s: string): string {
//     return String(s || "")
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, "-") // spaces → hyphens
//       .replace(/[^a-z0-9\-]/g, ""); // remove special chars
//   }
  
//   export default function ProductCataloguePage() {
//     const toast = useToast();
//     const [product, setProduct] = useState<any>({
//       id: "",
//       sku: "",
//       name: "",
//       description: "",
//       base_price: "",
//       inventory: "",
//     });
//     const [images, setImages] = useState<any[]>([]); // {url, s3Key, id?, position?}
  
//     // handle input changes
//     const handleChange = (e: any) => {
//       setProduct({ ...product, [e.target.name]: e.target.value });
//     };
  
//     // upload images → only S3 (not DB yet)
//     const handleUpload = async (e: any) => {
//       const files = e.target.files;
//       if (!files || files.length === 0) return;
  
//       const formData = new FormData();
//       for (let f of files) formData.append("photos", f);
  
//       try {
//         const res = await axios.post(`https://admee.in:3003/aws/upload`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
  
//         const uploaded = res.data.imageURLs; // [{url, s3Key}]
//         setImages((prev) => [...prev, ...uploaded]);
//         toast({ title: "Images uploaded (not saved yet)", status: "info" });
//       } catch (err: any) {
//         toast({ title: "Upload Error", description: err.message, status: "error" });
//       }
//     };
  
//     // save product + images → backend will upsert
//     const saveProductWithImages = async () => {
//         if (!product.id || !product.name) {
//           return toast({ title: "Product ID and Name required", status: "error" });
//         }
      
//         try {
//           const payload = { ...product, images };
//           const res = await axios.post("https://admee.in:3003/api/tfc/products/create", payload);
      
//           console.log("✅ Save response:", res.data);
      
//           toast({ title: "Product + Images saved", status: "success" });
//         } catch (err: any) {
//           console.error("❌ Save error:", err);
//           toast({ title: "Error", description: err.message, status: "error" });
//         }
//       };
      
  
//     // reorder images locally
//     const reorder = (index: number, dir: "up" | "down") => {
//       const newImages = [...images];
//       if (dir === "up" && index > 0) {
//         [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
//       } else if (dir === "down" && index < newImages.length - 1) {
//         [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
//       }
//       setImages(newImages);
//     };
  
//     // remove image from local state (unsaved until next Save)
//     const deleteImage = (img: any) => {
//       setImages(images.filter((i) => i !== img));
//       toast({ title: "Image removed (unsaved)", status: "info" });
//     };
  
//     return (
//       <Box py={8} bg="gray.50" minH="100vh">
//         <Container maxW="2xl">
//           <Heading size="lg" mb={6}>
//             Manage Coffin Product
//           </Heading>
  
//           <VStack spacing={4} align="stretch">
//             <FormControl isRequired>
//               <FormLabel>Product ID (slug)</FormLabel>
//               <Input
//                 name="id"
//                 value={product.id}
//                 onChange={handleChange}
//                 placeholder="coffin-elm-01"
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>SKU</FormLabel>
//               <Input name="sku" value={product.sku} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               <Input name="name" value={product.name} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Description</FormLabel>
//               <Textarea name="description" value={product.description} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Base Price</FormLabel>
//               <Input
//                 type="number"
//                 name="base_price"
//                 value={product.base_price}
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Inventory</FormLabel>
//               <Input
//                 type="number"
//                 name="inventory"
//                 value={product.inventory}
//                 onChange={handleChange}
//               />
//             </FormControl>
  
//             <FormControl>
//               <FormLabel>Upload Images</FormLabel>
//               <Input type="file" multiple accept="image/*" onChange={handleUpload} />
//             </FormControl>
  
//             <Heading size="md" mt={4}>
//               Images
//             </Heading>
//             {images.map((img, idx) => (
//               <HStack key={idx} spacing={3} align="center">
//                 <Image src={img.url} boxSize="100px" objectFit="cover" />
//                 <IconButton icon={<ArrowUpIcon />} aria-label="Up" onClick={() => reorder(idx, "up")} />
//                 <IconButton icon={<ArrowDownIcon />} aria-label="Down" onClick={() => reorder(idx, "down")} />
//                 <IconButton icon={<DeleteIcon />} aria-label="Delete" onClick={() => deleteImage(img)} />
//               </HStack>
//             ))}
  
//             <Button colorScheme="blue" onClick={saveProductWithImages}>
//               Save Product + Images
//             </Button>
//           </VStack>
//         </Container>
//       </Box>
//     );
//   }

// Version 2 - size, prize customization

import {
    Box, Container, Heading, FormControl, FormLabel, Input, Textarea, Button, VStack, HStack,
    Image, IconButton, useToast
  } from "@chakra-ui/react";
  import { DeleteIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import axios from "axios";
  
  export default function ProductCataloguePage() {
    const toast = useToast();
    const [product, setProduct] = useState<any>({
      id: "", sku: "", name: "", description: "", base_price: "", inventory: "",
    });
    const [images, setImages] = useState<any[]>([]);
    const [sizes, setSizes] = useState<any[]>([]);
    const [customizations, setCustomizations] = useState<any[]>([]);
  
    const handleChange = (e: any) => setProduct({ ...product, [e.target.name]: e.target.value });
  
    const handleUpload = async (e: any) => {
      const files = e.target.files;
      if (!files?.length) return;
  
      const formData = new FormData();
      for (let f of files) formData.append("photos", f);
  
      try {
        const res = await axios.post(`https://admee.in:3003/aws/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImages((prev) => [...prev, ...res.data.imageURLs]);
        toast({ title: "Images uploaded (not saved yet)", status: "info" });
      } catch (err: any) {
        toast({ title: "Upload Error", description: err.message, status: "error" });
      }
    };
  
    const saveProductWithImages = async () => {
      if (!product.id || !product.name) {
        return toast({ title: "Product ID and Name required", status: "error" });
      }
      try {
        const payload = { ...product, images, sizes, customizations };
        const res = await axios.post("https://admee.in:3003/api/tfc/products/create", payload);
        console.log("✅ Save response:", res.data);
        toast({ title: "Product saved", status: "success" });
      } catch (err: any) {
        toast({ title: "Error", description: err.message, status: "error" });
      }
    };
  
    const reorder = (index: number, dir: "up" | "down") => {
      const newImages = [...images];
      if (dir === "up" && index > 0) [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
      else if (dir === "down" && index < newImages.length - 1) [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      setImages(newImages);
    };
  
    const deleteImage = (img: any) => setImages(images.filter((i) => i !== img));
  
    return (
      <Box py={8} bg="gray.50" minH="100vh">
        <Container maxW="2xl">
          <Heading size="lg" mb={6}>Manage Coffin Product</Heading>
  
          <VStack spacing={4} align="stretch">
            {/* Core fields */}
            <FormControl isRequired><FormLabel>ID</FormLabel><Input name="id" value={product.id} onChange={handleChange} /></FormControl>
            <FormControl><FormLabel>SKU</FormLabel><Input name="sku" value={product.sku} onChange={handleChange} /></FormControl>
            <FormControl><FormLabel>Name</FormLabel><Input name="name" value={product.name} onChange={handleChange} /></FormControl>
            <FormControl><FormLabel>Description</FormLabel><Textarea name="description" value={product.description} onChange={handleChange} /></FormControl>
            <FormControl><FormLabel>Base Price</FormLabel><Input type="number" name="base_price" value={product.base_price} onChange={handleChange} /></FormControl>
            <FormControl><FormLabel>Inventory</FormLabel><Input type="number" name="inventory" value={product.inventory} onChange={handleChange} /></FormControl>
  
            {/* Sizes */}
            <Heading size="sm" mt={4}>Sizes</Heading>
            {sizes.map((s, idx) => (
              <HStack key={idx}>
                <Input placeholder="Label" value={s.label} onChange={e => {
                  const newSizes = [...sizes]; newSizes[idx].label = e.target.value; setSizes(newSizes);
                }} />
                <Input type="number" placeholder="Multiplier" value={s.multiplier} onChange={e => {
                  const newSizes = [...sizes]; newSizes[idx].multiplier = e.target.value; setSizes(newSizes);
                }} />
                <IconButton icon={<DeleteIcon />} aria-label="Del" onClick={() => setSizes(sizes.filter((_, i) => i !== idx))} />
              </HStack>
            ))}
            <Button onClick={() => setSizes([...sizes, { label: "", multiplier: 1 }])}>+ Add Size</Button>
  
            {/* Customizations */}
            <Heading size="sm" mt={4}>Customizations</Heading>
            {customizations.map((c, idx) => (
              <HStack key={idx}>
                <Input placeholder="Label" value={c.label} onChange={e => {
                  const newC = [...customizations]; newC[idx].label = e.target.value; setCustomizations(newC);
                }} />
                <Input type="number" placeholder="Price" value={c.price} onChange={e => {
                  const newC = [...customizations]; newC[idx].price = e.target.value; setCustomizations(newC);
                }} />
                <IconButton icon={<DeleteIcon />} aria-label="Del" onClick={() => setCustomizations(customizations.filter((_, i) => i !== idx))} />
              </HStack>
            ))}
            <Button onClick={() => setCustomizations([...customizations, { label: "", price: 0 }])}>+ Add Customization</Button>
  
            {/* Images */}
            <FormControl><FormLabel>Upload Images</FormLabel><Input type="file" multiple onChange={handleUpload} /></FormControl>
            {images.map((img, idx) => (
              <HStack key={idx}><Image src={img.url} boxSize="80px" /><IconButton icon={<DeleteIcon />} aria-label="Del" onClick={() => deleteImage(img)} /></HStack>
            ))}
  
            <Button colorScheme="blue" onClick={saveProductWithImages}>Save Product</Button>
          </VStack>
        </Container>
      </Box>
    );
  }
  