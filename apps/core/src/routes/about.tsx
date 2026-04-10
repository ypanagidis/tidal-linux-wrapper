import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Architecture notes</CardTitle>
        <CardDescription>
          Renderer isolation, typed bridge contracts, and shared validation boundaries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="m-0 text-sm text-muted-foreground">
          The renderer is portable and only talks to desktop capabilities through a typed preload
          bridge. Shared contracts live in workspace packages and are validated with Zod at every
          boundary.
        </p>
      </CardContent>
    </Card>
  );
}
