import { createFileRoute } from "@tanstack/react-router";
import { AstroPage } from "../components/astronumero/AstroPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online Numerology & Kundli Consultation | AstroNumero Clarity" },
      { name: "description", content: "Get instant clarity on Career, Wealth, Marriage & Business with Vedic Kundli Insights and Life Path Numerology. Claim your free audit today!" },
      { property: "og:title", content: "Online Numerology & Kundli Consultation | AstroNumero Clarity" },
      { property: "og:description", content: "Explore your Life Path Number and request a free Kundli & Destiny Audit with AstroNumero Clarity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AstroPage,
});
