import * as yup from "yup";

export const promptSchema = yup.object({
  prompt: yup
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(50, "Must be 50 characters or less")
    .required("Prompt is required"),
});
