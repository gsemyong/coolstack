import { z } from "zod";

export const helloSchema = z.object({
  name: z.string(),
});

export type Hello = z.infer<typeof helloSchema>;
