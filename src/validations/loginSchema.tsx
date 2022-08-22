import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

const loginSchema = z.object({
    username: z
    .string()
    .min(1, "Username is required"),
    
    password: z
    .string()
    .min(1, "Password is required")
    .max(8, "Password must be less than 9 characters"),
});

export default loginSchema;
export type { LoginFormData };