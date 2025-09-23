import { Box, Text, Stack, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="skyblue.50" py={6} mt={12}>
      <Stack spacing={2} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} FuneralCo. All rights reserved.</Text>
        <Link href="tel:+911234567890" color="brand.600">
          Call us anytime: +91 12345 67890
        </Link>
      </Stack>
    </Box>
  );
}
