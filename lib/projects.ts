import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Where your MDX project files live
const projectsDirectory = path.join(process.cwd(), "projects");

export interface ProjectMetadata {
    title: string;
    description: string;
    date: string;
    slug: string;
}

export interface Project {
    metadata: ProjectMetadata;
    content: string;
}

/**
 * Reads all .mdx files from the projects/ directory,
 * extracts their frontmatter, and returns a sorted list (newest first).
 */
export function getAllProjects(): ProjectMetadata[] {
    if (!fs.existsSync(projectsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);

    const projects = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const filePath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                title: data.title,
                description: data.description,
                date: data.date,
                slug: data.slug ?? fileName.replace(/\.mdx$/, ""),
            } as ProjectMetadata;
        });

    // Sort by date, newest first
    return projects.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

/**
 * Reads a single .mdx file by slug and returns its metadata + raw content.
 */
export function getProjectBySlug(slug: string): Project {
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);
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
