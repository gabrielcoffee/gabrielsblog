import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllReviews } from "@/lib/reviews";

type RecentItem = {
    title: string;
    date: string;
    type: "writing" | "critique";
    url: string;
    critiqueType?: string;
};

export default function Home() {
    const writings = getAllPosts();
    const critiques = getAllReviews();

    // Combine and sort by date
    const allItems: RecentItem[] = [
        ...writings.map((post) => ({
            title: post.title,
            date: post.date,
            type: "writing" as const,
            url: `/posts/${post.slug}`,
        })),
        ...critiques.map((review) => ({
            title: review.title,
            date: review.date,
            type: "critique" as const,
            url: `/reviews/${review.slug}`,
            critiqueType: review.type,
        })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Get the 3 most recent
    const recentItems = allItems.slice(0, 3);

    return (
        <div className="flex flex-col justify-center gap-8 h-screen px-6 max-w-[600px] mx-auto">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold font-hk-grotesk">
                    hi, i'm gabriel
                </h1>
                <div className="flex flex-col">
                    <p className="text-lg font-hk-grotesk">
                        this is the place, sit down, you're safe now
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold font-hk-grotesk">
                    recent updates:
                </h1>
                <div className="flex flex-col gap-1">
                    {recentItems.map((item, i) => (
                        <Link
                            key={i}
                            href={item.url}
                            className="text-lg font-hk-grotesk underline decoration-dotted hover:opacity-70 transition-opacity"
                        >
                            {item.type === "critique"
                                ? `new ${item.critiqueType} review: ${item.title}`
                                : `new post: ${item.title}`}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
