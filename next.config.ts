import type { NextConfig } from "next";

const config: NextConfig = {
  // Not "standalone": the Dockerfile runs `next start` against the full build (it also needs
  // devDependencies at runtime for db:migrate/db:seed, which use tsx), not `node
  // .next/standalone/server.js`. Declaring "standalone" here while never consuming that output
  // produced a harmless but real warning on every boot ("next start does not work with output:
  // standalone") — removed rather than restructure the Dockerfile this close to submission and
  // risk the verified working build path.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
        ],
      },
    ];
  },
};

export default config;
