import type { NextConfig } from "next";

// Add TailwindCSS and MUI specific configuration
const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  webpack: (config) => {
    // Aliasing MUI styled-engine to use styled-components if needed
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine', // Switch to styled-components
      '@emotion/react': 'node_modules/@memotion/react', // Switch to styled-components

    };
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

};

export default nextConfig;

