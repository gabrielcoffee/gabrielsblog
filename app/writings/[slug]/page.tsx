import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/app/components/mdx-components";
import type { Metadata } from "next";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

// Tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic metadata per post (for SEO and browser tab title)
export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { metadata } = getPostBySlug(slug);
    return {
        title: `${metadata.title} | Gabriel's Blog`,
        description: metadata.description,
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const { metadata, content } = getPostBySlug(slug);

    // Calculate read time (words / 200 words per minute)
    const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    return (
        <article className="flex flex-col px-6 pt-24 pb-48 max-w-[600px] mx-auto">
                {/* Post header */}
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-3">
                        {metadata.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm opacity-50">
                        <time>
                            {new Date(
                                metadata.date + "T00:00:00",
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                        <span>·</span>
                        <span>{readTime} min read</span>
                    </div>
                </header>

                {/* MDX content rendered with custom components */}
                <div className="prose-custom">
                    <MDXRemote
                        source={content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                            },
                        }}
                    />
                </div>
        </article>
    );
}
