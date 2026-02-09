import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Custom components that replace default HTML elements when rendering MDX.
 * Each key (h1, h2, p, a, etc.) maps to the corresponding markdown syntax.
 */
export const mdxComponents: MDXComponents = {
    h1: (props: ComponentPropsWithoutRef<"h1">) => (
        <h1 className="text-3xl font-bold mt-10 mb-4" {...props} />
    ),
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
        <h2 className="text-2xl font-bold mt-8 mb-3" {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
        <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
        <p className="text-base leading-relaxed mb-4 opacity-85" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
        <a
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
        <ul className="list-disc pl-6 mb-4 flex flex-col gap-1" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
        <ol
            className="list-decimal pl-6 mb-4 flex flex-col gap-1"
            {...props}
        />
    ),
    li: (props: ComponentPropsWithoutRef<"li">) => (
        <li className="text-base leading-relaxed opacity-85" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
        <blockquote
            className="border-l-2 border-current pl-4 my-6 opacity-70 italic"
            {...props}
        />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
        <code
            className="bg-foreground/10 rounded px-1.5 py-0.5 text-sm font-mono"
            {...props}
        />
    ),
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
        <pre
            className="bg-foreground/5 rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono"
            {...props}
        />
    ),
    hr: (props: ComponentPropsWithoutRef<"hr">) => (
        <hr className="my-8 border-foreground/10" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
        <strong className="font-bold" {...props} />
    ),
    img: (props: ComponentPropsWithoutRef<"img">) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-lg my-4 max-w-full" alt="" {...props} />
    ),
};
