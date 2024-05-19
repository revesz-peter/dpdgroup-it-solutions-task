import { z } from "zod";

const addressSchema = z.object({
  postalCode: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  street: z.string().min(1, { message: "Required" }),
  houseNumber: z.string().min(1, { message: "Required" }),
});

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is required" })
    .regex(/^[\p{L}\s\-]+$/u, {
      message: "First name can only contain letters, spaces, and hyphens",
    }),

  lastName: z
    .string()
    .min(2, { message: "Last name is required" })
    .regex(/^[\p{L}\s\-]+$/u, {
      message: "Last name can only contain letters, spaces, and hyphens",
    }),

  birth: z.object({
    date: z
      .string()
      .refine(
        (val) => /^\d{4}-\d{2}-\d{2}$|^\d{4}\.\d{2}\.\d{2}\.$/.test(val),
        { message: "Date must be in the format YYYY-MM-DD or YYYY.MM.DD." }
      )
      .refine(
        (val) => {
          const isDashedFormat = /^\d{4}-\d{2}-\d{2}$/.test(val);
          const cleanDate = isDashedFormat ? val : val.slice(0, -1);
          const dateParts = cleanDate.split(isDashedFormat ? "-" : ".");
          const date = new Date(
            `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`
          );
          return (
            !isNaN(date.getTime()) &&
            date.getFullYear() > 1900 &&
            date.getFullYear() < 2024 &&
            date.getMonth() >= 0 &&
            date.getMonth() < 12 &&
            date.getDate() > 0 &&
            date.getDate() <= 31
          );
        },
        { message: "Not a valid date" }
      ),
    place: z
    .string()
    .min(2, { message: "Birthplace is required" })
    .regex(/^[\p{L}\s\-]+$/u, {
      message: "Birthplace can only contain letters, spaces, and hyphens",
    }),
  }),
  mothersMaidenName: z
    .string()
    .min(2, { message: "Mother's maiden name is required" })
    .regex(/^[\p{L}\s\-]+$/u, {
      message:
        "Mother's maiden name can only contain letters, spaces, and hyphens",
    }),
  tajNumber: z.string().min(1, { message: "TAJ number is required" }),
  taxId: z.string().min(1, { message: "Tax ID is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(6, { message: "Phone number is required" })
    .regex(/^[0-9+\-\s]+$/, {
      message: "Phone number can only contain numbers, +, -, and spaces",
    }),
  address: z
    .array(addressSchema)
    .min(1, { message: "At least one address is required" }),
});

const editFormSchema = z.object({
  tajNumber: z.string().min(1, { message: "TAJ number is required" }),
  taxId: z.string().min(1, { message: "Tax ID is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(6, { message: "Phone number is required" })
    .regex(/^[0-9+\-\s]+$/, {
      message: "Phone number can only contain numbers, +, -, and spaces",
    }),
  address: z
    .array(addressSchema)
    .min(1, { message: "At least one address is required" }),
});

export { formSchema, editFormSchema };
