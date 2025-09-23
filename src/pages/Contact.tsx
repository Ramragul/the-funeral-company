import { Box, Input, Textarea, Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = { name: string; phone: string; notes?: string };

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/enquiries", data);
      alert("Thank you. We’ll reach out shortly.");
      reset();
    } catch {
      alert("Something went wrong. Please call us directly.");
    }
  };

  return (
    <Box maxW="md" mx="auto" py={12}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Input placeholder="Full Name" {...register("name")} required />
          <Input placeholder="Phone Number" {...register("phone")} required />
          <Textarea placeholder="Special requests (optional)" {...register("notes")} />
          <Button type="submit" colorScheme="brand">
            Submit Request
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
