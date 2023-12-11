import { z } from "zod";

export const input_validation = z.object({
  content: z.string().emoji("Only emojis are allowed").min(1).max(280),
});

export type input_validation_type = z.infer<typeof input_validation>;
