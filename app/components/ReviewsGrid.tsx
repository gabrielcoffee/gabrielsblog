"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
import type { ReviewMetadata, ReviewType } from "@/lib/reviews";

type SortOption = "best" | "worst" | "abc" | "zxy";

const filterLabels: Record<ReviewType, string> = {
    album: "albums",
    book: "books",
    game: "games",
    movie: "movies",
};

const sortLabels: Record<SortOption, string> = {
    best: "Best",
    worst: "Worst",
    abc: "ABC",
    zxy: "ZXY",
};

interface ReviewsGridProps {
    reviews: ReviewMetadata[];
}

export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
    const [activeFilter, setActiveFilter] = useState<ReviewType | null>(null);
    const [activeSort, setActiveSort] = useState<SortOption | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                filterRef.current &&
                !filterRef.current.contains(e.target as Node)
            ) {
                setFilterOpen(false);
            }
            if (
                sortRef.current &&
                !sortRef.current.contains(e.target as Node)
            ) {
                setSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter
    const filtered = activeFilter
        ? reviews.filter((r) => r.type === activeFilter)
        : reviews;

    // Sort
    const sorted = [...filtered].sort((a, b) => {
        switch (activeSort) {
            case "best":
                return b.rating - a.rating;
            case "worst":
                return a.rating - b.rating;
            case "abc":
                return a.title.localeCompare(b.title);
            case "zxy":
                return b.title.localeCompare(a.title);
            default:
                // Default: newest first
                return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
        }
    });

    // Dynamic title
    const title = activeFilter ? filterLabels[activeFilter] : "critiques";

    return (
        <div className="flex flex-col px-6 pt-24 pb-48 max-w-[700px] mx-auto">
            {/* Header row: title + filter/sort buttons */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">{title}</h1>
                <div className="flex items-center gap-3">
                    {/* Filter dropdown */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => {
                                setFilterOpen(!filterOpen);
                                setSortOpen(false);
                            }}
                            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                                activeFilter
                                    ? "border-foreground/40 bg-foreground/10"
                                    : "border-foreground/15 hover:border-foreground/30"
                            }`}
                        >
                            {activeFilter ? filterLabels[activeFilter] : "filter"}
                        </button>
                        <AnimatePresence>
                            {filterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 z-10 flex flex-col bg-background border border-foreground/15 rounded-md shadow-lg overflow-hidden"
                                >
                                    {(
                                        Object.keys(filterLabels) as ReviewType[]
                                    ).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setActiveFilter(
                                                    activeFilter === type
                                                        ? null
                                                        : type,
                                                );
                                                setFilterOpen(false);
                                            }}
                                            className={`text-sm px-4 py-2 text-left whitespace-nowrap hover:bg-foreground/5 transition-colors ${
                                                activeFilter === type
                                                    ? "bg-foreground/10 font-medium"
                                                    : ""
                                            }`}
                                        >
                                            {filterLabels[type]}
                                        </button>
                                    ))}
                                    {activeFilter && (
                                        <button
                                            onClick={() => {
                                                setActiveFilter(null);
                                                setFilterOpen(false);
                                            }}
                                            className="text-sm px-4 py-2 text-left whitespace-nowrap hover:bg-foreground/5 transition-colors opacity-50"
                                        >
                                            clear
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => {
                                setSortOpen(!sortOpen);
                                setFilterOpen(false);
                            }}
                            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                                activeSort
                                    ? "border-foreground/40 bg-foreground/10"
                                    : "border-foreground/15 hover:border-foreground/30"
                            }`}
                        >
                            {activeSort ? sortLabels[activeSort] : "sort"}
                        </button>
                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 z-10 flex flex-col bg-background border border-foreground/15 rounded-md shadow-lg overflow-hidden"
                                >
                                    {(
                                        Object.keys(sortLabels) as SortOption[]
                                    ).map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setActiveSort(
                                                    activeSort === option
                                                        ? null
                                                        : option,
                                                );
                                                setSortOpen(false);
                                            }}
                                            className={`text-sm px-4 py-2 text-left whitespace-nowrap hover:bg-foreground/5 transition-colors ${
                                                activeSort === option
                                                    ? "bg-foreground/10 font-medium"
                                                    : ""
                                            }`}
                                        >
                                            {sortLabels[option]}
                                        </button>
                                    ))}
                                    {activeSort && (
                                        <button
                                            onClick={() => {
                                                setActiveSort(null);
                                                setSortOpen(false);
                                            }}
                                            className="text-sm px-4 py-2 text-left whitespace-nowrap hover:bg-foreground/5 transition-colors opacity-50"
                                        >
                                            clear
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
                {sorted.map((review) => (
                    <ReviewCard key={review.slug} review={review} />
                ))}
            </div>

            {/* Empty state */}
            {sorted.length === 0 && (
                <p className="text-center opacity-40 mt-16">
                    no critiques yet for this category.
                </p>
            )}
        </div>
    );
}
