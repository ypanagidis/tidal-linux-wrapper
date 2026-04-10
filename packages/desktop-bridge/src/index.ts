import { z } from "zod";

export const DESKTOP_CHANNELS = {
  ping: "desktop:ping",
  hello: "desktop:hello",
} as const;

export const DesktopPingRequestSchema = z.object({
  message: z.string().min(1).max(120),
});

export const DesktopPingResponseSchema = z.object({
  ok: z.literal(true),
  message: z.string(),
  platform: z.string(),
});

export type DesktopPingRequest = z.infer<typeof DesktopPingRequestSchema>;
export type DesktopPingResponse = z.infer<typeof DesktopPingResponseSchema>;

export const DesktopHelloResponseSchema = z.object({
  message: z.string(),
  appVersion: z.string(),
  platform: z.string(),
});

export type DesktopHelloResponse = z.infer<typeof DesktopHelloResponseSchema>;

export interface DesktopApi {
  ping(input: DesktopPingRequest): Promise<DesktopPingResponse>;
  hello(): Promise<DesktopHelloResponse>;
}
