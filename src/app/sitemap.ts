import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/today", "/pricing", "/about", "/subscribe"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/today" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
