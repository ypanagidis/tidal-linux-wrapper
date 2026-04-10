import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@repo/ui";
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
      <h1 className="mb-2 mt-0 text-xl font-semibold text-slate-900">Hello from Electron</h1>
      <p className="m-0 text-slate-600">{message}</p>
    </Card>
  );
}
