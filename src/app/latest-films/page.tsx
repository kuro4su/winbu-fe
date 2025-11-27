import { notFound } from 'next/navigation';
import { getLatestFilms } from '@/lib/api';
import { ContentGrid } from '@/components/content/ContentGrid';
import { SkeletonGrid } from '@/components/content/SkeletonCard';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default async function LatestFilmsPage({
    searchParams
}: {
    searchParams: { page?: string }
}) {
    const page = parseInt(searchParams.page || '1');
    const result = await getLatestFilms(page);

    if (!result) {
        notFound();
    }

    return (
        <>
            <PageNavigation />
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Brutal Header */}
                <div className="brutal-border brutal-shadow-lg bg-background p-6 relative overflow-hidden">
                    {/* Brutal Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 -rotate-12" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary opacity-10 rotate-45" />

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
                            <Clapperboard className="inline h-8 w-8 mr-2 mb-1" />
                            LATEST FILMS
                        </h1>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-muted-foreground font-bold">
                                PAGE {result.pagination.current_page} OF {result.pagination.total_pages}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <ContentGrid
                    title="🎬 FILM TERBARU"
                    items={result.data.latest_film}
                />

                {/* Brutal Pagination */}
                {result.pagination.total_pages > 1 && (
                    <div className="brutal-border brutal-shadow-lg bg-background p-6">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            {/* Previous Page */}
                            {result.pagination.prev_page ? (
                                <Link
                                    href={`/latest-films?page=${result.pagination.prev_page}`}
                                    className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black uppercase hover:brutal-shadow transition-all"
                                >
                                    ← PREV
                                </Link>
                            ) : (
                                <div className="brutal-border bg-muted px-4 py-2 font-black uppercase text-muted-foreground opacity-50">
                                    ← PREV
                                </div>
                            )}

                            {/* Page Numbers */}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: result.pagination.total_pages }, (_, i) => i + 1)
                                    .filter(pageNum => {
                                        return (
                                            pageNum === 1 ||
                                            pageNum === result.pagination.total_pages ||
                                            Math.abs(pageNum - result.pagination.current_page) <= 1
                                        );
                                    })
                                    .map((pageNum, idx, arr) => {
                                        const prevPageNum = arr[idx - 1];
                                        const showEllipsis = prevPageNum && pageNum - prevPageNum > 1;

                                        return (
                                            <div key={pageNum} className="flex items-center gap-2">
                                                {showEllipsis && (
                                                    <span className="font-black text-muted-foreground">...</span>
                                                )}
                                                {pageNum === result.pagination.current_page ? (
                                                    <div className="brutal-border bg-primary text-primary-foreground px-4 py-2 font-black min-w-[3rem] text-center">
                                                        {pageNum}
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={`/latest-films?page=${pageNum}`}
                                                        className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black hover:brutal-shadow transition-all min-w-[3rem] text-center"
                                                    >
                                                        {pageNum}
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Next Page */}
                            {result.pagination.next_page ? (
                                <Link
                                    href={`/latest-films?page=${result.pagination.next_page}`}
                                    className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black uppercase hover:brutal-shadow transition-all"
                                >
                                    NEXT →
                                </Link>
                            ) : (
                                <div className="brutal-border bg-muted px-4 py-2 font-black uppercase text-muted-foreground opacity-50">
                                    NEXT →
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
