import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // .mdx alongside the usual page extensions so case-study bodies in
  // content/case-studies/ can be imported directly by the [slug] route.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    /*
     * Plugins are named as strings, not imported functions — Turbopack runs
     * the MDX pipeline in Rust and can't receive JS function references.
     *
     * remark-frontmatter makes the compiler *skip* the YAML block at the top
     * of each case study rather than rendering it as a paragraph. The block
     * itself is read separately (and validated) by lib/case-studies.ts.
     */
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
