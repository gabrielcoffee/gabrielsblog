import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Where your MDX post files live
const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMetadata {
    title: string;
    description: string;
    date: string;
    slug: string;
}

export interface Post {
    metadata: PostMetadata;
    content: string;
}

/**
 * Reads all .mdx files from the posts/ directory,
 * extracts their frontmatter, and returns a sorted list (newest first).
 */
export function getAllPosts(): PostMetadata[] {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const filePath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                title: data.title,
                description: data.description,
                date: data.date,
                slug: data.slug ?? fileName.replace(/\.mdx$/, ""),
            } as PostMetadata;
        });

    // Sort by date, newest first
    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

/**
 * Reads a single .mdx file by slug and returns its metadata + raw content.
 */
export function getPostBySlug(slug: string): Post {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        metadata: {
            title: data.title,
            description: data.description,
            date: data.date,
            slug: data.slug ?? slug,
        },
        content,
    };
}
