import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, InfoTooltip } from "@repo/ui";
import { getDesktopApi } from "../lib/desktop";
import { useTRPC } from "../integrations/trpc";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const trpc = useTRPC();
  const [desktopPingResult, setDesktopPingResult] = useState("Not run yet");

  const healthQuery = useQuery(trpc.health.ping.queryOptions({ name: "Developer" }));

  async function runDesktopPing() {
    const desktopApi = getDesktopApi();

    if (!desktopApi) {
      setDesktopPingResult("Desktop bridge unavailable (running in browser mode).");
      return;
    }

    try {
      const result = await desktopApi.ping({ message: "Hello from TanStack Start" });
      setDesktopPingResult(result.message);
    } catch {
      setDesktopPingResult("Desktop ping failed.");
    }
  }

  return (
    <div className="grid gap-4">
      <Card>
        <div className="mb-3 flex items-center gap-2">
          <h1 className="m-0 text-xl font-semibold text-slate-900">First vertical slice</h1>
          <InfoTooltip label="This info icon is rendered with Base UI Tooltip primitives." />
        </div>
        <p className="m-0 text-slate-600">
          This page proves: TanStack Start renderer, tRPC endpoint, TanStack Query cache,
          Effect-powered domain logic, Zod boundary validation, and Electron preload bridge.
        </p>
      </Card>

      <Card>
        <h2 className="mb-2 mt-0 text-base font-semibold text-slate-900">
          tRPC + Query + Effect + Zod
        </h2>
        <p className="m-0 text-sm text-slate-600">
          {healthQuery.isPending && "Loading from /api/trpc/health.ping..."}
          {healthQuery.isError && "Request failed."}
          {healthQuery.data &&
            `${healthQuery.data.message} (requestId: ${healthQuery.data.requestId}, time: ${healthQuery.data.serverTime})`}
        </p>
      </Card>

      <Card>
        <h2 className="mb-2 mt-0 text-base font-semibold text-slate-900">
          Electron preload bridge
        </h2>
        <div className="flex items-center gap-3">
          <Button onClick={runDesktopPing}>Run desktop ping</Button>
          <span className="text-sm text-slate-600">{desktopPingResult}</span>
        </div>
      </Card>
    </div>
  );
}
