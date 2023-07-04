"use client";
import { useState } from "react";
import {
  Heading,
  HStack,
  Center,
  VStack,
  FormControl,
  Button,
  Input,
  CircularProgress,
  AlertIcon,
  Alert,
  AlertTitle,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaSuperpowers, FaImage } from "react-icons/fa";
import { promptSchema } from "@/validations/prompt-schema";

export default function ImageGeneratorForm() {
  const [progress, setProgress] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: promptSchema,
    onSubmit: async (values) => {
      setUrl("");
      setError("");
      setProgress(true);
      try {
        const { prompt } = values;
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: prompt }),
        });

        const data = await response.json();

        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }

        setUrl(data.url);
      } catch (err: any) {
        setError(err.message || err);
      }

      setProgress(false);
    },
  });

  return (
    <Center py={6}>
      <VStack>
        <HStack>
          <FaSuperpowers size="3em" />
          <FaImage size="3em" />
        </HStack>
        <Heading as="h1" noOfLines={1}>
          Image Generator
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="center">
            <FormControl isInvalid={!!formik.errors.prompt}>
              <Input
                id="prompt"
                name="prompt"
                type="prompt"
                placeholder="Image Description"
                data-test="prompt-input"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.prompt}
              />
              <FormErrorMessage data-test="request-error">
                {formik.errors.prompt}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              disabled={progress}
              style={{ width: "256px" }}
            >
              Generate Image
            </Button>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            {progress && (
              <CircularProgress
                data-test="request-progress"
                isIndeterminate
                value={30}
                size="120px"
              />
            )}
            {url && (
              <Image
                src={url}
                boxSize="256px"
                alt="Generated"
                border="1px solid gray"
                data-test="generated-image"
              />
            )}
          </VStack>
        </form>
      </VStack>
    </Center>
  );
}
