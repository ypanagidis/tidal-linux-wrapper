import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <h1 className="mb-2 mt-0 text-xl font-semibold text-slate-900">Architecture notes</h1>
      <p className="m-0 text-slate-600">
        The renderer is portable and only talks to desktop capabilities through a typed preload
        bridge. Shared contracts live in workspace packages and are validated with Zod at every
        boundary.
      </p>
    </section>
  );
}
