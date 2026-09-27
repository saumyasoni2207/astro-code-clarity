import { createFileRoute } from "@tanstack/react-router";

import { OrbGallery } from "@/shaders/orb-gallery/OrbGallery";
import "@/shaders/threeui.css";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Orb Gallery | Interactive Interface Archive" },
      {
        name: "description",
        content: "Explore a slowly turning sphere of curated interface references with tactile drag and hover interactions.",
      },
      { property: "og:title", content: "Orb Gallery | Interactive Interface Archive" },
      {
        property: "og:description",
        content: "Explore a slowly turning sphere of curated interface references with tactile drag and hover interactions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Scene,
});

function Scene() {
  return (
    <main className="h-svh min-h-[640px] w-full bg-background">
      <div className="shader-frame h-full w-full">
        <OrbGallery />
      </div>
    </main>
  );
}