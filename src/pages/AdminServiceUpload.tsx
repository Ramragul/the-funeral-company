// Version 1

// import {
//     Tabs, TabList, TabPanels, Tab, TabPanel,
//     Box, Button, Input, FormControl, FormLabel,
//     VStack, HStack, Image, Select, Textarea
//   } from "@chakra-ui/react";
//   import { useState, useEffect } from "react";
//   import axios from "axios";
  
//   export default function AdminServiceUpload() {
//     return (
//       <Box p={6}>
//         <Tabs>
//           <TabList>
//             <Tab>Categories</Tab>
//             <Tab>Services</Tab>
//             <Tab>Variants</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel><CategoryForm /></TabPanel>
//             <TabPanel><ServiceForm /></TabPanel>
//             <TabPanel><VariantForm /></TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     );
//   }
  
//   // ========== CATEGORY FORM ==========
//   function CategoryForm() {
//     const [cat, setCat] = useState({ code: "", name: "", image: null });
//     const [preview, setPreview] = useState<string | null>(null);
  
//     const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (!e.target.files?.length) return;
//       const fd = new FormData();
//       fd.append("photos", e.target.files[0]);
//       const res = await axios.post("/aws/upload", fd);
//       setCat({ ...cat, image: res.data.imageURLs[0] });
//       setPreview(res.data.imageURLs[0].url);
//     };
  
//     const save = async () => {
//       await axios.post(`https://admee.in:3003/api/admin/categories`, cat);
//       alert("Category saved!");
//     };
  
//     return (
//       <VStack spacing={4}>
//         <FormControl><FormLabel>Code</FormLabel>
//           <Input value={cat.code} onChange={(e) => setCat({ ...cat, code: e.target.value })} />
//         </FormControl>
//         <FormControl><FormLabel>Name</FormLabel>
//           <Input value={cat.name} onChange={(e) => setCat({ ...cat, name: e.target.value })} />
//         </FormControl>
//         <FormControl><FormLabel>Image</FormLabel>
//           <Input type="file" onChange={uploadFile} />
//           {preview && <Image src={preview} boxSize="100px" />}
//         </FormControl>
//         <Button onClick={save} colorScheme="pink">Save Category</Button>
//       </VStack>
//     );
//   }
  
//   // ========== SERVICE FORM ==========
//   function ServiceForm() {
//     const [cats, setCats] = useState<any[]>([]);
//     const [svc, setSvc] = useState<any>({
//       code: "", name: "", price: 0, description: "",
//       categoryId: "", pricingType: "flat", image: null, images: []
//     });
  
//     useEffect(() => { axios.get(`https://admee.in:3003/api/admin/categories`).then(r => setCats(r.data)); }, []);
  
//     const addImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (!e.target.files?.length) return;
//       const fd = new FormData();
//       for (let f of e.target.files) fd.append("photos", f);
//       const res = await axios.post("/aws/upload", fd);
//       setSvc({ ...svc, images: [...svc.images, ...res.data.imageURLs] });
//     };
  
//     const save = async () => {
//       await axios.post(`https://admee.in:3003/api/admin/services`, svc);
//       alert("Service saved!");
//     };
  
//     return (
//       <VStack spacing={4}>
//         <FormControl><FormLabel>Code</FormLabel>
//           <Input value={svc.code} onChange={(e) => setSvc({ ...svc, code: e.target.value })} />
//         </FormControl>
//         <FormControl><FormLabel>Name</FormLabel>
//           <Input value={svc.name} onChange={(e) => setSvc({ ...svc, name: e.target.value })} />
//         </FormControl>
//         <FormControl><FormLabel>Description</FormLabel>
//           <Textarea value={svc.description} onChange={(e) => setSvc({ ...svc, description: e.target.value })} />
//         </FormControl>
//         <FormControl><FormLabel>Price</FormLabel>
//           <Input type="number" value={svc.price} onChange={(e) => setSvc({ ...svc, price: +e.target.value })} />
//         </FormControl>
//         <FormControl><FormLabel>Category</FormLabel>
//           <Select value={svc.categoryId} onChange={(e) => setSvc({ ...svc, categoryId: e.target.value })}>
//             <option value="">Select Category</option>
//             {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//           </Select>
//         </FormControl>
//         <FormControl><FormLabel>Pricing Type</FormLabel>
//           <Select value={svc.pricingType} onChange={(e) => setSvc({ ...svc, pricingType: e.target.value })}>
//             <option value="flat">Flat</option>
//             <option value="variant">Variant</option>
//             <option value="per_piece">Per Piece</option>
//             <option value="per_person">Per Person</option>
//           </Select>
//         </FormControl>
//         <FormControl><FormLabel>Images</FormLabel>
//           <Input type="file" multiple onChange={addImages} />
//           <HStack>{svc.images.map((i: any, idx: number) => <Image key={idx} src={i.url} boxSize="80px" />)}</HStack>
//         </FormControl>
//         <Button onClick={save} colorScheme="blue">Save Service</Button>
//       </VStack>
//     );
//   }
  
//   // ========== VARIANT FORM ==========
//   function VariantForm() {
//     const [svcs, setSvcs] = useState<any[]>([]);
//     const [serviceCode, setServiceCode] = useState("");
//     const [variants, setVariants] = useState<any[]>([]);
  
//     useEffect(() => { axios.get(`https://admee.in:3003/api/admin/services`).then(r => setSvcs(r.data)); }, []);
  
//     const addVariant = () => setVariants([...variants, { variant_code: "", label: "", price: 0, image: null }]);
  
//     const uploadImage = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
//       if (!e.target.files?.length) return;
//       const fd = new FormData();
//       fd.append("photos", e.target.files[0]);
//       const res = await axios.post("/aws/upload", fd);
//       const copy = [...variants];
//       copy[idx].image = res.data.imageURLs[0].url;
//       setVariants(copy);
//     };
  
//     const save = async () => {
//       await axios.post(`https://admee.in:3003/api/admin/services/${serviceCode}/variants`, { variants });
//       alert("Variants saved!");
//     };
  
//     return (
//       <VStack spacing={4}>
//         <FormControl><FormLabel>Service</FormLabel>
//           <Select value={serviceCode} onChange={(e) => setServiceCode(e.target.value)}>
//             <option value="">Select Service</option>
//             {svcs.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
//           </Select>
//         </FormControl>
//         {variants.map((v, idx) => (
//           <Box key={idx} p={3} borderWidth="1px" borderRadius="md">
//             <Input placeholder="Variant Code" value={v.variant_code}
//               onChange={(e) => { const c=[...variants]; c[idx].variant_code=e.target.value; setVariants(c); }} />
//             <Input placeholder="Label" value={v.label}
//               onChange={(e) => { const c=[...variants]; c[idx].label=e.target.value; setVariants(c); }} />
//             <Input type="number" placeholder="Price" value={v.price}
//               onChange={(e) => { const c=[...variants]; c[idx].price=+e.target.value; setVariants(c); }} />
//             <Input type="file" onChange={(e) => uploadImage(idx, e)} />
//             {v.image && <Image src={v.image} boxSize="80px" />}
//           </Box>
//         ))}
//         <Button onClick={addVariant}>Add Variant</Button>
//         <Button onClick={save} colorScheme="green">Save Variants</Button>
//       </VStack>
//     );
//   }
  


// Version 2 

import {
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Box, Button, Input, FormControl, FormLabel,
    VStack, HStack, Image, Select, Textarea
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import axios from "axios";
  
  export default function AdminServiceUpload() {
    return (
      <Box p={6}>
        <Tabs>
          <TabList>
            <Tab>Categories</Tab>
            <Tab>Services</Tab>
            <Tab>Variants</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><CategoryForm /></TabPanel>
            <TabPanel><ServiceForm /></TabPanel>
            <TabPanel><VariantForm /></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  }
  
  // ========== CATEGORY FORM ==========
  function CategoryForm() {
    const [cat, setCat] = useState<any>({ code: "", name: "", image: null });
    const [preview, setPreview] = useState<string | null>(null);
  
    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const fd = new FormData();
      fd.append("photos", e.target.files[0]);
      const res = await axios.post("https://admee.in:3003/aws/upload", fd);
      setCat({ ...cat, image: res.data.imageURLs[0].url, extra: { s3Key: res.data.imageURLs[0].s3Key } });
      setPreview(res.data.imageURLs[0].url);
    };
  
    const save = async () => {
      await axios.post(`https://admee.in:3003/api/admin/categories`, cat);
      alert("Category saved!");
    };
  
    return (
      <VStack spacing={4}>
        <FormControl><FormLabel>Code</FormLabel>
          <Input value={cat.code} onChange={(e) => setCat({ ...cat, code: e.target.value })} />
        </FormControl>
        <FormControl><FormLabel>Name</FormLabel>
          <Input value={cat.name} onChange={(e) => setCat({ ...cat, name: e.target.value })} />
        </FormControl>
        <FormControl><FormLabel>Image</FormLabel>
          <Input type="file" onChange={uploadFile} />
          {preview && <Image src={preview} boxSize="100px" />}
        </FormControl>
        <Button onClick={save} colorScheme="pink">Save Category</Button>
      </VStack>
    );
  }
  
  // ========== SERVICE FORM ==========
  function ServiceForm() {
    const [cats, setCats] = useState<any[]>([]);
    const [svc, setSvc] = useState<any>({
      code: "", name: "", price: 0, description: "",
      categoryId: "", pricingType: "flat", image: null, images: []
    });
  
    useEffect(() => { axios.get(`https://admee.in:3003/api/admin/categories`).then(r => setCats(r.data)); }, []);
  
    const addImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const fd = new FormData();
      for (let f of e.target.files) fd.append("photos", f);
      const res = await axios.post("https://admee.in:3003/aws/upload", fd);
      setSvc({ ...svc, images: [...svc.images, ...res.data.imageURLs] });
    };
  
    const save = async () => {
      await axios.post(`https://admee.in:3003/api/admin/services`, svc);
      alert("Service saved!");
    };
  
    return (
      <VStack spacing={4}>
        <FormControl><FormLabel>Code</FormLabel>
          <Input value={svc.code} onChange={(e) => setSvc({ ...svc, code: e.target.value })} />
        </FormControl>
        <FormControl><FormLabel>Name</FormLabel>
          <Input value={svc.name} onChange={(e) => setSvc({ ...svc, name: e.target.value })} />
        </FormControl>
        <FormControl><FormLabel>Description</FormLabel>
          <Textarea value={svc.description} onChange={(e) => setSvc({ ...svc, description: e.target.value })} />
        </FormControl>
        <FormControl><FormLabel>Price</FormLabel>
          <Input type="number" value={svc.price} onChange={(e) => setSvc({ ...svc, price: +e.target.value })} />
        </FormControl>
        <FormControl><FormLabel>Category</FormLabel>
          <Select value={svc.categoryId} onChange={(e) => setSvc({ ...svc, categoryId: e.target.value })}>
            <option value="">Select Category</option>
            {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </FormControl>
        <FormControl><FormLabel>Pricing Type</FormLabel>
          <Select value={svc.pricingType} onChange={(e) => setSvc({ ...svc, pricingType: e.target.value })}>
            <option value="flat">Flat</option>
            <option value="variant">Variant</option>
            <option value="per_piece">Per Piece</option>
            <option value="per_person">Per Person</option>
          </Select>
        </FormControl>
        <FormControl><FormLabel>Images</FormLabel>
          <Input type="file" multiple onChange={addImages} />
          <HStack>{svc.images.map((i: any, idx: number) => <Image key={idx} src={i.url} boxSize="80px" />)}</HStack>
        </FormControl>
        <Button onClick={save} colorScheme="blue">Save Service</Button>
      </VStack>
    );
  }
  
  // ========== VARIANT FORM ==========
  function VariantForm() {
    const [svcs, setSvcs] = useState<any[]>([]);
    const [serviceCode, setServiceCode] = useState("");
    const [variants, setVariants] = useState<any[]>([]);
  
    useEffect(() => { axios.get(`https://admee.in:3003/api/admin/services`).then(r => setSvcs(r.data)); }, []);
  
    const addVariant = () => setVariants([...variants, { variant_code: "", label: "", price: 0, image: null, extra: {} }]);
  
    const uploadImage = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const fd = new FormData();
      fd.append("photos", e.target.files[0]);
      const res = await axios.post("https://admee.in:3003/aws/upload", fd);
      const copy = [...variants];
      copy[idx].image = res.data.imageURLs[0].url;
      copy[idx].extra = { s3Key: res.data.imageURLs[0].s3Key };
      setVariants(copy);
    };
  
    const save = async () => {
      await axios.post(`https://admee.in:3003/api/admin/services/${serviceCode}/variants`, { variants });
      alert("Variants saved!");
    };
  
    return (
      <VStack spacing={4}>
        <FormControl><FormLabel>Service</FormLabel>
          <Select value={serviceCode} onChange={(e) => setServiceCode(e.target.value)}>
            <option value="">Select Service</option>
            {svcs.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
          </Select>
        </FormControl>
        {variants.map((v, idx) => (
          <Box key={idx} p={3} borderWidth="1px" borderRadius="md">
            <Input placeholder="Variant Code" value={v.variant_code}
              onChange={(e) => { const c=[...variants]; c[idx].variant_code=e.target.value; setVariants(c); }} />
            <Input placeholder="Label" value={v.label}
              onChange={(e) => { const c=[...variants]; c[idx].label=e.target.value; setVariants(c); }} />
            <Input type="number" placeholder="Price" value={v.price}
              onChange={(e) => { const c=[...variants]; c[idx].price=+e.target.value; setVariants(c); }} />
            <Input type="file" onChange={(e) => uploadImage(idx, e)} />
            {v.image && <Image src={v.image} boxSize="80px" />}
          </Box>
        ))}
        <Button onClick={addVariant}>Add Variant</Button>
        <Button onClick={save} colorScheme="green">Save Variants</Button>
      </VStack>
    );
  }
  