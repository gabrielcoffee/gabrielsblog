import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Writings | Gabriel's Blog",
    description: "Things I've been thinking about.",
};

export default function PostsPage() {
    const posts = getAllPosts();

    return (
        <div className="flex flex-col px-6 pt-24 pb-48 max-w-[600px] mx-auto">
            <h1 className="text-4xl mb-10 font-bold">writings</h1>
                <ul className="flex flex-col gap-6">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/posts/${post.slug}`}
                                className="group block"
                            >
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-xl font-medium group-hover:underline">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm opacity-60">
                                        {post.description}
                                    </p>
                                    <time className="text-xs opacity-40 mt-1">
                                        {new Date(
                                            post.date + "T00:00:00",
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
        </div>
    );
}
