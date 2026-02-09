interface StarRatingProps {
    rating: number;
    size?: number;
}

function StarIcon({ filled, size }: { filled: boolean; size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={filled ? "opacity-90" : "opacity-30"}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export default function StarRating({ rating, size = 14 }: StarRatingProps) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < rating} size={size} />
            ))}
        </div>
    );
}
