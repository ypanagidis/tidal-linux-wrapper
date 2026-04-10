import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Spinner } from "@repo/ui";
import { getDesktopApi } from "../lib/desktop";

export const Route = createFileRoute("/electron")({
  component: ElectronHelloPage,
});

function ElectronHelloPage() {
  const helloQuery = useQuery({
    queryKey: ["desktop", "hello"],
    queryFn: async () => {
      const desktopApi = getDesktopApi();

      if (!desktopApi) {
        return "Electron bridge unavailable. Open this page inside the desktop app.";
      }

      try {
        const response = await desktopApi.hello();
        return `${response.message} Version ${response.appVersion} on ${response.platform}.`;
      } catch {
        return "Could not load greeting from Electron.";
      }
    },
    staleTime: 30_000,
  });

  const message = helloQuery.isPending
    ? "Loading greeting from Electron..."
    : helloQuery.data ?? "Could not load greeting from Electron.";

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Hello from Electron</CardTitle>
        <CardDescription>Checks desktop bridge health from the renderer route.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Badge variant={helloQuery.isPending ? "outline" : "secondary"}>
          {helloQuery.isPending ? "Loading" : "Ready"}
        </Badge>
        <p className="m-0 text-sm text-muted-foreground">
          {helloQuery.isPending && <Spinner className="mr-2 inline-flex size-3.5" />}
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
