import { getAllReviews } from "@/lib/reviews";
import ReviewsGrid from "../components/ReviewsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Critiques | Gabriel's Blog",
    description: "Albums, books, games, and movies I've experienced.",
};

export default function ReviewsPage() {
    const reviews = getAllReviews();

    return <ReviewsGrid reviews={reviews} />;
}
