// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  integrations: [
    react(),
    {
      name: "importmap-externals",
      hooks: {
        "astro:build:setup": ({ vite, target }) => {
          if (target === "client") {
            vite.build.rollupOptions["external"] = [
              "react",
              "react-dom",
              //  "@radix-ui/react-avatar",
              //  "@radix-ui/react-slot",
              "lucide-react",
              "clsx",
              "class-variance-authority",
              "tailwind-merge",
            ];
          }
        },
      },
    },
  ],

  adapter: node({
    mode: "standalone",
  }),
});
