import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pro-bike.ru", pathname: "/**" },

      { protocol: "https", hostname: "media.cdn.kaufland.de", pathname: "/**" },

      { protocol: "https", hostname: "bikesonline.com", pathname: "/**" },
      { protocol: "https", hostname: "www.buybestgear.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
