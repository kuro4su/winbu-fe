'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchContent } from '@/lib/api';
import { ContentGrid } from '@/components/content/ContentGrid';
import { SkeletonGrid } from '@/components/content/SkeletonCard';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import type { ContentItem, PaginationInfo } from '@/lib/types';
import Link from 'next/link';
import { Search, AlertCircle } from 'lucide-react';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

    const [results, setResults] = useState<ContentItem[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        if (!query) {
            setResults([]);
            setPagination(null);
            setLoading(false);
            return () => {
                mounted = false;
            };
        }

        setLoading(true);
        searchContent(query, currentPage)
            .then((data) => {
                if (!mounted) return;
                if (data) {
                    setResults(data.results);
                    setPagination(data.pagination);
                } else {
                    setResults([]);
                    setPagination(null);
                }
            })
            .catch(() => {
                if (!mounted) return;
                setResults([]);
                setPagination(null);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [query, currentPage]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="brutal-border brutal-shadow-lg bg-background p-6 mb-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                        <Search className="inline h-8 w-8 mr-2" />
                        SEARCHING...
                    </h1>
                </div>
                <SkeletonGrid />
            </div>
        );
    }

    if (!query) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="brutal-border brutal-shadow-lg bg-card p-12 text-center">
                    <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h2 className="text-3xl font-black uppercase mb-4">NO SEARCH QUERY</h2>
                    <p className="text-muted-foreground mb-6">Enter a keyword to search for anime, series, or films.</p>
                    <Link href="/" className="brutal-button">
                        BACK TO HOME
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageNavigation />

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Search Header */}
                <div className="brutal-border brutal-shadow-lg bg-background p-6 relative overflow-hidden">
                    {/* Brutal Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 -rotate-12" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary opacity-10 rotate-45" />

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
                            <Search className="inline h-8 w-8 mr-2 mb-1" />
                            SEARCH RESULTS
                        </h1>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-muted-foreground font-bold">FOR:</span>
                            <span className="brutal-border bg-primary text-primary-foreground px-3 py-1 font-black uppercase">"{query}"</span>
                            {pagination && (
                                <span className="text-muted-foreground font-bold">
                                    ({results.length} results on page {pagination.current_page} of {pagination.total_pages})
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {results.length > 0 ? (
                    <>
                        <ContentGrid title="🔍 SEARCH RESULTS" items={results} />

                        {/* Brutal Pagination */}
                        {pagination && pagination.total_pages > 1 && (
                            <div className="brutal-border brutal-shadow-lg bg-background p-6">
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                    {/* Previous Page */}
                                    {pagination.prev_page ? (
                                        <Link
                                            href={`/search?q=${encodeURIComponent(query)}&page=${pagination.prev_page}`}
                                            className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black uppercase hover:brutal-shadow transition-all"
                                        >
                                            ← PREV
                                        </Link>
                                    ) : (
                                        <div className="brutal-border bg-muted px-4 py-2 font-black uppercase text-muted-foreground opacity-50">← PREV</div>
                                    )}

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
                                            .filter((pageNum) => {
                                                return (
                                                    pageNum === 1 ||
                                                    pageNum === pagination.total_pages ||
                                                    Math.abs(pageNum - pagination.current_page) <= 1
                                                );
                                            })
                                            .map((pageNum, idx, arr) => {
                                                const prevPageNum = arr[idx - 1];
                                                const showEllipsis = prevPageNum && pageNum - prevPageNum > 1;

                                                return (
                                                    <div key={pageNum} className="flex items-center gap-2">
                                                        {showEllipsis && <span className="font-black text-muted-foreground">...</span>}

                                                        {pageNum === pagination.current_page ? (
                                                            <div className="brutal-border bg-primary text-primary-foreground px-4 py-2 font-black min-w-[3rem] text-center">{pageNum}</div>
                                                        ) : (
                                                            <Link
                                                                href={`/search?q=${encodeURIComponent(query)}&page=${pageNum}`}
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
                                    {pagination.next_page ? (
                                        <Link
                                            href={`/search?q=${encodeURIComponent(query)}&page=${pagination.next_page}`}
                                            className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black uppercase hover:brutal-shadow transition-all"
                                        >
                                            NEXT →
                                        </Link>
                                    ) : (
                                        <div className="brutal-border bg-muted px-4 py-2 font-black uppercase text-muted-foreground opacity-50">NEXT →</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="brutal-border brutal-shadow-lg bg-card p-12 text-center">
                        <AlertCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
                        <h2 className="text-3xl font-black uppercase mb-4">NO RESULTS FOUND</h2>
                        <p className="text-muted-foreground mb-6">We couldn&apos;t find anything matching <span className="font-bold text-foreground">{query}</span></p>
                        <p className="text-sm text-muted-foreground mb-6">Try searching with different keywords or check your spelling.</p>
                        <Link href="/" className="brutal-button">BACK TO HOME</Link>
                    </div>
                )}
            </div>
        </>
    );
}
