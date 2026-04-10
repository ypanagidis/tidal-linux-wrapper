import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col flex-1 justify-center px-4 py-8 text-center">
        <h1 className="font-medium text-xl mb-4">Tidal Wrapper documentation.</h1>
        <p className="mx-auto mb-4 max-w-2xl text-sm text-fd-muted-foreground">
          Product and architecture docs for the Tidal Wrapper monorepo.
        </p>
        <Link
          to="/docs/$"
          params={{
            _splat: "",
          }}
          className="px-3 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm mx-auto"
        >
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  );
}
