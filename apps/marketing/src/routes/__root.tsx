import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
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
        title: "Tidal Wrapper | Marketing",
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
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <header className="sticky top-0 z-30 border-b border-[rgba(23,58,64,0.12)] bg-[rgba(248,252,253,0.85)] backdrop-blur">
          <div className="page-wrap flex items-center justify-between px-4 py-3">
            <strong className="text-sm tracking-wide text-[var(--sea-ink)]">Tidal Wrapper</strong>
            <nav className="flex items-center gap-2 text-sm">
              <Link
                to="/"
                className="rounded-full px-3 py-1.5 text-[var(--sea-ink-soft)] hover:bg-[rgba(79,184,178,0.15)]"
                activeProps={{
                  className: "rounded-full bg-[var(--lagoon-deep)] px-3 py-1.5 text-white",
                }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="rounded-full px-3 py-1.5 text-[var(--sea-ink-soft)] hover:bg-[rgba(79,184,178,0.15)]"
                activeProps={{
                  className: "rounded-full bg-[var(--lagoon-deep)] px-3 py-1.5 text-white",
                }}
              >
                About
              </Link>
              <a
                href="http://localhost:3002"
                className="rounded-full px-3 py-1.5 text-[var(--sea-ink-soft)] hover:bg-[rgba(79,184,178,0.15)]"
              >
                Docs
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="page-wrap px-4 pb-8 pt-8 text-sm text-[var(--sea-ink-soft)]">
          Desktop-first Tidal companion powered by Electron, Effect, and TanStack.
        </footer>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
