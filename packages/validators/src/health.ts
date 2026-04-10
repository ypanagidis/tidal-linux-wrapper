import { z } from "zod";

export const HealthCheckInputSchema = z.object({
  name: z.string().min(1).max(64),
});

export const HealthCheckOutputSchema = z.object({
  ok: z.literal(true),
  message: z.string(),
  requestId: z.string(),
  serverTime: z.string().datetime(),
});

export type HealthCheckInput = z.infer<typeof HealthCheckInputSchema>;
export type HealthCheckOutput = z.infer<typeof HealthCheckOutputSchema>;
