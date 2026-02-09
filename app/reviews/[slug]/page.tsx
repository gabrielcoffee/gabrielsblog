import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllReviews, getReviewBySlug } from "@/lib/reviews";
import { mdxComponents } from "@/app/components/mdx-components";
import StarRating from "@/app/components/StarRating";
import type { Metadata } from "next";

interface ReviewPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const reviews = getAllReviews();
    return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({
    params,
}: ReviewPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { metadata } = getReviewBySlug(slug);
    return {
        title: `${metadata.title} | Gabriel's Blog`,
        description: `Review of ${metadata.title} by ${metadata.creator}`,
    };
}

const typeLabels: Record<string, string> = {
    album: "Album",
    book: "Book",
    game: "Game",
    movie: "Movie",
};

export default async function ReviewPage({ params }: ReviewPageProps) {
    const { slug } = await params;
    const { metadata, content } = getReviewBySlug(slug);

    return (
        <article className="flex flex-col px-6 pt-24 pb-48 max-w-[600px] mx-auto">
            {/* Review header with cover image */}
            <header className="mb-10">
                <div className="w-40 aspect-square overflow-hidden rounded-md bg-foreground/5 mb-6 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={metadata.image}
                        alt={metadata.title}
                        className="h-full w-full object-contain"
                    />
                </div>
                <h1 className="text-3xl font-bold mb-1">{metadata.title}</h1>
                <p className="text-base opacity-60 mb-2">{metadata.creator}</p>
                <div className="flex items-center gap-3 mb-1">
                    <StarRating rating={metadata.rating} size={16} />
                    <span className="text-sm opacity-40">
                        {typeLabels[metadata.type] ?? metadata.type}
                    </span>
                </div>
                <time className="text-xs opacity-40">
                    {new Date(metadata.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        },
                    )}
                </time>
            </header>

            {/* MDX content */}
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
