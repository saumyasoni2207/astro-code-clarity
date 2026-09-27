import { createFileRoute } from "@tanstack/react-router";
import { KageLandingPage } from "../shaders/landing-pages/LandingPages";
import "../shaders/threeui.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kage — Where stillness reveals the unseen" },
      { name: "description", content: "A five-chapter night walk through a Kyoto mountain temple. Charred cypress, lantern light and a vermilion moon, rendered live in WebGL." },
      { property: "og:title", content: "Kage — Where stillness reveals the unseen" },
      { property: "og:description", content: "Explore Kage, an interactive five-chapter night walk through a Kyoto mountain temple." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Scene,
});

function Scene() {
  return (
    <div className="shader-frame h-dvh w-full overflow-hidden bg-background">
      <KageLandingPage
        className="h-full w-full"
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
