import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Callout, PremiumBadge } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { DocScreenshot } from "@/components/docs/doc-screenshot";

function MdxLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  a: MdxLink,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  Callout,
  PremiumBadge,
  Screenshot: DocScreenshot,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
