import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Where your MDX critique files live
const critiquesDirectory = path.join(process.cwd(), "critiques");

export type ReviewType = "album" | "book" | "game" | "movie";

export interface ReviewMetadata {
    title: string;
    type: ReviewType;
    creator: string;
    image: string;
    rating: number;
    slug: string;
    date: string;
}

export interface Review {
    metadata: ReviewMetadata;
    content: string;
}

/**
 * Reads all .mdx files from the reviews/ directory,
 * extracts their frontmatter, and returns a sorted list (newest first).
 */
export function getAllReviews(): ReviewMetadata[] {
    if (!fs.existsSync(critiquesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(critiquesDirectory);

    const reviews = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const filePath = path.join(critiquesDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                title: data.title,
                type: data.type,
                creator: data.creator,
                image: data.image,
                rating: data.rating,
                slug: data.slug ?? fileName.replace(/\.mdx$/, ""),
                date: data.date,
            } as ReviewMetadata;
        });

    // Sort by date, newest first
    return reviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

/**
 * Reads a single .mdx file by slug and returns its metadata + raw content.
 */
export function getReviewBySlug(slug: string): Review {
    const filePath = path.join(critiquesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        metadata: {
            title: data.title,
            type: data.type,
            creator: data.creator,
            image: data.image,
            rating: data.rating,
            slug: data.slug ?? slug,
            date: data.date,
        },
        content,
    };
}
