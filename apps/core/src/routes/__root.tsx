import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppProviders } from "../integrations/providers";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Tidal Wrapper Core",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProviders>
          <div className="mx-auto min-h-screen max-w-4xl px-4 py-8">
            <header className="mb-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm">
              <strong className="text-slate-900">Tidal Wrapper Core</strong>
              <nav className="flex gap-2 text-sm">
                <Link
                  to="/"
                  className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100"
                  activeProps={{ className: "rounded-md bg-slate-900 px-3 py-1.5 text-white" }}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100"
                  activeProps={{ className: "rounded-md bg-slate-900 px-3 py-1.5 text-white" }}
                >
                  About
                </Link>
                <Link
                  to="/electron"
                  className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100"
                  activeProps={{ className: "rounded-md bg-slate-900 px-3 py-1.5 text-white" }}
                >
                  Electron
                </Link>
              </nav>
            </header>

            {children}
          </div>
          <TanStackRouterDevtools position="bottom-right" />
        </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}
