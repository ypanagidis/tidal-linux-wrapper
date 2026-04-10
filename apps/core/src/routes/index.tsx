import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InfoTooltip,
  Spinner,
} from "@repo/ui";
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            First vertical slice
            <InfoTooltip label="This info icon is rendered with shadcn tooltip primitives." />
          </CardTitle>
          <CardDescription>
            This page proves: TanStack Start renderer, tRPC endpoint, TanStack Query cache,
            Effect-powered domain logic, Zod boundary validation, and Electron preload bridge.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>tRPC + Query + Effect + Zod</CardTitle>
          <CardDescription>Live server state from `/api/trpc/health.ping`.</CardDescription>
          <CardAction>
            <Badge variant={healthQuery.isError ? "destructive" : "secondary"}>
              {healthQuery.isPending ? "Loading" : healthQuery.isError ? "Error" : "Healthy"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="m-0 text-sm text-muted-foreground">
            {healthQuery.isPending && (
              <span className="inline-flex items-center gap-2">
                <Spinner className="size-3.5" /> Loading from /api/trpc/health.ping...
              </span>
            )}
            {healthQuery.isError && "Request failed."}
            {healthQuery.data &&
              `${healthQuery.data.message} (requestId: ${healthQuery.data.requestId}, time: ${healthQuery.data.serverTime})`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Electron preload bridge</CardTitle>
          <CardDescription>Runs a typed IPC ping through `window.desktop`.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div>
            <Button onClick={runDesktopPing}>Run desktop ping</Button>
          </div>
          <Alert>
            <AlertTitle>Desktop ping result</AlertTitle>
            <AlertDescription>{desktopPingResult}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
