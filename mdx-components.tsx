import type { MDXComponents } from "mdx/types";
import { TextLink } from "@/components/TextLink";

/**
 * Global element mapping for every MDX file in the app.
 *
 * Case-study bodies are plain prose — authors write markdown, not classNames —
 * so the brand type scale and spacing is applied here once. Headings inherit
 * the responsive h1–h4 rules from globals.css; only the rhythm between blocks
 * and the inline elements need styling.
 */
const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 className="mt-space-2xl mb-space-md first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-space-xl mb-space-sm" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-grey-700 mb-space-md" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="text-grey-700 mb-space-md ml-space-lg gap-space-xs flex list-disc flex-col"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="text-grey-700 mb-space-md ml-space-lg gap-space-xs flex list-decimal flex-col"
      {...props}
    >
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-red pl-space-md my-space-lg text-grey-700 border-l-2 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-grey-100/50 text-small rounded px-1.5 py-0.5 font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  a: ({ href, children }) => <TextLink href={href ?? "#"}>{children}</TextLink>,
  hr: (props) => <hr className="border-grey-100 my-space-2xl" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
