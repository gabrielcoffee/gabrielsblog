import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Gabriel's Blog",
    description: "Things I've built and worked on.",
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="flex flex-col px-6 pt-24 pb-48 max-w-[600px] mx-auto">
            <h1 className="text-4xl mb-10 font-bold">projects</h1>
            <ul className="flex flex-col gap-6">
                {projects.map((project) => (
                    <li key={project.slug}>
                        <Link
                            href={`/projects/${project.slug}`}
                            className="group block"
                        >
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-medium group-hover:underline">
                                    {project.title}
                                </h2>
                                <p className="text-sm opacity-60">
                                    {project.description}
                                </p>
                                <time className="text-xs opacity-40 mt-1">
                                    {new Date(
                                        project.date + "T00:00:00",
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
