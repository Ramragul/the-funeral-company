// Version 1

// import { Box, Flex, HStack, Link, Button } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// export default function NavBar() {
//   const navigate = useNavigate();

//   return (
//     <Box bg="white" boxShadow="sm" px={6} py={3}>
//       <Flex h={16} align="center" justify="space-between">
//         <Button variant="ghost" onClick={() => navigate("/")}>
//           The Funeral Company
//         </Button>

//         <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
//          <Link onClick={() => navigate("/")}>Home</Link>
//           <Link onClick={() => navigate("/about")}>About</Link>
//           <Link onClick={() => navigate("/services")}>Services</Link>
//           <Link onClick={() => navigate("/contact")}>Contact</Link>
//         </HStack>

//         <Button
//           colorScheme="brand"
//           onClick={() => (window.location.href = "tel:+911234567890")}
//         >
//           Call 24/7
//         </Button>
//       </Flex>
//     </Box>
//   );
// }


// Version 2 


// import {
//   Box,
//   Flex,
//   HStack,
//   Link,
//   Button,
//   IconButton,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   VStack,
//   Image,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { HamburgerIcon } from "@chakra-ui/icons";

// export default function NavBar() {
//   const navigate = useNavigate();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box bg="white" boxShadow="sm" px={6} py={3}>
//       <Flex h={16} align="center" justify="space-between">
//         {/* Logo */}
//         <Button variant="ghost" onClick={() => navigate("/")}>
//           <Image src="../../assets/logo1.png" alt="The Funeral Company" h="40px" />
//         </Button>

//         {/* Desktop Menu */}
//         <HStack
//           as="nav"
//           spacing={6}
//           display={{ base: "none", md: "flex" }}
//         >
//           <Link onClick={() => navigate("/")}>Home</Link>
//           <Link onClick={() => navigate("/about")}>About</Link>
//           <Link onClick={() => navigate("/services")}>Services</Link>
//           <Link onClick={() => navigate("/contact")}>Contact</Link>
//         </HStack>

//         {/* Call button - always visible */}
//         <HStack spacing={3}>
//           <Button
//             display={{ base: "none", md: "inline-flex" }}
//             colorScheme="brand"
//             onClick={() => (window.location.href = "tel:+911234567890")}
//           >
//             Call 24/7
//           </Button>

//           {/* Mobile Hamburger */}
//           <IconButton
//             display={{ base: "inline-flex", md: "none" }}
//             icon={<HamburgerIcon />}
//             aria-label="Open Menu"
//             onClick={onOpen}
//           />
//         </HStack>
//       </Flex>

//       {/* Mobile Drawer */}
//       <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Menu</DrawerHeader>
//           <DrawerBody>
//             <VStack align="start" spacing={4}>
//               <Link onClick={() => { navigate("/"); onClose(); }}>Home</Link>
//               <Link onClick={() => { navigate("/about"); onClose(); }}>About</Link>
//               <Link onClick={() => { navigate("/services"); onClose(); }}>Services</Link>
//               <Link onClick={() => { navigate("/contact"); onClose(); }}>Contact</Link>
//               <Button
//                 colorScheme="brand"
//                 w="full"
//                 onClick={() => (window.location.href = "tel:+911234567890")}
//               >
//                 Call 24/7
//               </Button>
//             </VStack>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </Box>
//   );
// }



// Version 3 


// import {
//   Box,
//   Flex,
//   HStack,
//   Link,
//   Button,
//   IconButton,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   VStack,
//   Image,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import { FiHome, FiInfo, FiBox, FiPhone, FiMapPin } from "react-icons/fi";
// import logo from "../assets/logo1.png"; // ✅ correct way to load logo in Vite/React

// export default function NavBar() {
//   const navigate = useNavigate();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const menuLinks = [
//     { label: "Home", icon: <FiHome />, path: "/" },
//     { label: "About", icon: <FiInfo />, path: "/about" },
//     { label: "Services", icon: <FiBox />, path: "/services" },
//     { label: "Contact", icon: <FiPhone />, path: "/contact" },
//     { label: "Funeral Ground Search", icon: <FiMapPin />, path: "/funeral-ground" },
//   ];

//   return (
//     <Box bg="white" boxShadow="sm" px={6} py={3}>
//       <Flex h={16} align="center" justify="space-between">
//         {/* Logo */}
//         <Image
//           src={logo}
//           alt="The Funeral Company"
//           h="40px"
//           cursor="pointer"
//           onClick={() => navigate("/")}
//         />

//         {/* Desktop Menu */}
//         <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
//           {menuLinks.map((link, i) => (
//             <HStack
//               key={i}
//               spacing={1}
//               cursor="pointer"
//               onClick={() => navigate(link.path)}
//             >
//               {link.icon}
//               <Link>{link.label}</Link>
//             </HStack>
//           ))}
//         </HStack>

//         {/* Call button - always visible */}
//         <HStack spacing={3}>
//           <Button
//             display={{ base: "none", md: "inline-flex" }}
//             colorScheme="brand"
//             onClick={() => (window.location.href = "tel:+911234567890")}
//           >
//             Call 24/7
//           </Button>

//           {/* Mobile Hamburger */}
//           <IconButton
//             display={{ base: "inline-flex", md: "none" }}
//             icon={<HamburgerIcon />}
//             aria-label="Open Menu"
//             onClick={onOpen}
//           />
//         </HStack>
//       </Flex>

//       {/* Mobile Drawer */}
//       <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Menu</DrawerHeader>
//           <DrawerBody>
//             <VStack align="start" spacing={4}>
//               {menuLinks.map((link, i) => (
//                 <HStack
//                   key={i}
//                   spacing={2}
//                   cursor="pointer"
//                   onClick={() => {
//                     navigate(link.path);
//                     onClose();
//                   }}
//                 >
//                   {link.icon}
//                   <Link>{link.label}</Link>
//                 </HStack>
//               ))}
//               <Button
//                 colorScheme="brand"
//                 w="full"
//                 onClick={() => (window.location.href = "tel:+911234567890")}
//               >
//                 Call 24/7
//               </Button>
//             </VStack>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </Box>
//   );
// }


// Version 4

import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { LuHouse, LuInfo, LuBox, LuPhone, LuMapPin } from "react-icons/lu"; // ✅ Lucide icons
import logo from "../assets/logo1.png";

export default function NavBar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuLinks = [
    { label: "Home", icon: LuHouse, path: "/" },
    { label: "About", icon: LuInfo, path: "/about" },
    { label: "Services", icon: LuBox, path: "/services" },
    { label: "Contact", icon: LuPhone, path: "/contact" },
    { label: "Funeral Ground Search", icon: LuMapPin, path: "/services/funeralground" },
  ];

  return (
    <Box bg="white" boxShadow="sm" px={6} py={3}>
      <Flex h={16} align="center" justify="space-between">
        {/* Logo */}
       
  


        <Image
          src={logo}
          alt="The Funeral Company"
          h={{ base: "100px", md: "100px" }} // ✅ larger, responsive
          cursor="pointer"
          onClick={() => navigate("/")}
        />
      

        {/* Desktop Menu */}
        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
          {menuLinks.map((link, i) => (
            <HStack
              key={i}
              spacing={2}
              cursor="pointer"
              onClick={() => navigate(link.path)}
            >
              <Box as={link.icon} color="brand.500" boxSize={5} /> {/* ✅ themed icons */}
              <Link>{link.label}</Link>
            </HStack>
          ))}
        </HStack>

        {/* Call button */}
        <HStack spacing={3}>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            colorScheme="brand"
            onClick={() => (window.location.href = "tel:+911234567890")}
          >
            Call 24/7
          </Button>
          <IconButton
            display={{ base: "inline-flex", md: "none" }}
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={onOpen}
          />
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {menuLinks.map((link, i) => (
                <HStack
                  key={i}
                  spacing={2}
                  cursor="pointer"
                  onClick={() => {
                    navigate(link.path);
                    onClose();
                  }}
                >
                  <Box as={link.icon} color="brand.500" boxSize={5} /> {/* ✅ themed icons */}
                  <Link>{link.label}</Link>
                </HStack>
              ))}
              <Button
                colorScheme="brand"
                w="full"
                onClick={() => (window.location.href = "tel:+911234567890")}
              >
                Call 24/7
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
