import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Card, CardContent, TooltipProvider, buttonVariants, cn } from "@repo/ui";
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

const navButtonClass = cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-foreground/80");
const navButtonActiveClass = buttonVariants({ variant: "default", size: "sm" });

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProviders>
          <TooltipProvider>
            <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
              <Card className="mb-8 border-border/70 bg-background/80 py-0 shadow-sm backdrop-blur-sm">
                <CardContent className="flex items-center justify-between gap-3 py-3">
                  <strong className="text-sm font-semibold tracking-wide">Tidal Wrapper Core</strong>
                  <nav className="flex flex-wrap gap-2">
                    <Link
                      to="/"
                      className={navButtonClass}
                      activeProps={{ className: navButtonActiveClass }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      className={navButtonClass}
                      activeProps={{ className: navButtonActiveClass }}
                    >
                      About
                    </Link>
                    <Link
                      to="/electron"
                      className={navButtonClass}
                      activeProps={{ className: navButtonActiveClass }}
                    >
                      Electron
                    </Link>
                  </nav>
                </CardContent>
              </Card>

              {children}
            </div>
            <TanStackRouterDevtools position="bottom-right" />
          </TooltipProvider>
        </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}
