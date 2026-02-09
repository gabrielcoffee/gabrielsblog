import Link from "next/link";
import StarRating from "./StarRating";
import type { ReviewMetadata } from "@/lib/reviews";

interface ReviewCardProps {
    review: ReviewMetadata;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <Link href={`/reviews/${review.slug}`} className="group flex flex-col">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-foreground/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={review.image}
                    alt={review.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-95"
                />
            </div>
            <div className="mt-2 flex flex-col gap-0.5">
                <h3 className="text-sm font-medium leading-tight group-hover:underline">
                    {review.title}
                </h3>
                <p className="text-xs opacity-50">{review.creator}</p>
                <StarRating rating={review.rating} size={12} />
            </div>
        </Link>
    );
}
