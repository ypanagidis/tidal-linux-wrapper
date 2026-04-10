import type { HealthCheckInput, HealthCheckOutput } from "@repo/validators";
import { Effect } from "effect";

export const makeHealthCheckEffect = (input: HealthCheckInput, requestId: string) =>
  Effect.gen(function* () {
    const now = yield* Effect.sync(() => new Date().toISOString());

    const response: HealthCheckOutput = {
      ok: true,
      message: `Hello ${input.name}, the desktop stack is wired end-to-end.`,
      requestId,
      serverTime: now,
    };

    return response;
  });
