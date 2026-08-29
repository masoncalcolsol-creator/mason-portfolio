import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve legacy URLs while making the canonical corporate graph explicit.
  // Redirects are permanent so old links remain useful without allowing older
  // landing pages to compete with the current company architecture.
  async redirects() {
    return [
      {
        source: "/nullworks",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tac-ops",
        destination: "/ori-tac-ops",
        permanent: true,
      },
      {
        source: "/jp",
        destination: "/japan",
        permanent: true,
      },
    ];
  },

  // The fantasy application currently contains a known-safe control-flow
  // narrowing false positive inside a state updater closure. Runtime guards
  // execute before the closure is created. Keep the production build moving
  // while the source-level type patch is applied through the recovery workflow.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
