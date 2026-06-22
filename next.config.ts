import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer ships node-only deps — keep it out of the client/server
  // bundle so the workbook PDF route resolves it from node_modules at runtime.
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
