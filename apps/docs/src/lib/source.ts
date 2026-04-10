import { loader } from "fumadocs-core/source";
import type { InferPageType } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "collections/server";
import { docsContentRoute, docsRoute } from "./shared";

type FumadocsCollection = {
  toFumadocsSource: () => unknown;
};

type PageDataWithProcessedText = {
  getText: (format: "processed") => Promise<string>;
};

type LoaderOptions = Parameters<typeof loader>[0];

const docsCollection = docs as unknown as FumadocsCollection;

export const source = loader({
  source: docsCollection.toFumadocsSource() as LoaderOptions["source"],
  baseUrl: docsRoute,
  plugins: [lucideIconsPlugin()],
});

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await (page.data as unknown as PageDataWithProcessedText).getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
