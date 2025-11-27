export function SkeletonCard() {
    return (
        <div className="brutal-border bg-muted animate-pulse">
            <div className="aspect-[2/3] w-full bg-muted-foreground/10" />
        </div>
    );
}

interface SkeletonGridProps {
    count?: number;
}

export function SkeletonGrid({ count = 12 }: SkeletonGridProps) {
    return (
        <div className="brutal-border brutal-shadow bg-background p-6 md:p-8">
            {/* Skeleton Header */}
            <div className="mb-8">
                <div className="skeleton h-10 w-64 mb-4" />
                <div className="skeleton h-1 w-24" />
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}

export function SkeletonCarousel() {
    return (
        <div className="brutal-border brutal-shadow bg-background p-6">
            {/* Skeleton Header */}
            <div className="mb-6">
                <div className="skeleton h-8 w-48" />
            </div>

            {/* Skeleton Items */}
            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-40">
                        <SkeletonCard />
                    </div>
                ))}
            </div>
        </div>
    );
}
