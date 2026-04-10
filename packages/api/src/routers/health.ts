import { makeHealthCheckEffect } from "@repo/core";
import { HealthCheckInputSchema, HealthCheckOutputSchema } from "@repo/validators";
import { Effect } from "effect";
import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  ping: publicProcedure
    .input(HealthCheckInputSchema)
    .output(HealthCheckOutputSchema)
    .query(async ({ ctx, input }) => {
      return Effect.runPromise(makeHealthCheckEffect(input, ctx.requestId));
    }),
});
