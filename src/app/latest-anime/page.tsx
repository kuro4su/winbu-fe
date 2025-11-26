import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getAnimeDonghua } from '@/lib/api';
import { ContentCard } from '@/components/content/ContentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import Link from 'next/link';

export default async function AnimeDonghuaPage({
    searchParams
}: {
    searchParams: { page?: string }
}) {
    const page = parseInt(searchParams.page || '1');
    const result = await getAnimeDonghua(page);

    if (!result) {
        notFound();
    }

    const { data, pagination } = result;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Film className="h-8 w-8" />
                    <h1 className="text-4xl font-bold tracking-tight">Latest Anime Episodes</h1>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>
                                Page {pagination.current_page} of {pagination.total_pages}
                            </CardTitle>
                            <div className="flex gap-2">
                                {pagination.prev_page && (
                                    <Link href={`/latest-anime?page=${pagination.prev_page}`}>
                                        <Button variant="outline" size="sm">
                                            <ChevronLeft className="h-4 w-4 mr-1" />
                                            Previous
                                        </Button>
                                    </Link>
                                )}
                                {pagination.next_page && (
                                    <Link href={`/latest-anime?page=${pagination.next_page}`}>
                                        <Button variant="outline" size="sm">
                                            Next
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {data.latest_anime.map((anime) => (
                                <ContentCard key={anime.id} item={anime} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom Pagination */}
                <div className="flex justify-center gap-2">
                    {pagination.prev_page && (
                        <Link href={`/latest-anime?page=${pagination.prev_page}`}>
                            <Button variant="outline">
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Previous
                            </Button>
                        </Link>
                    )}
                    <Button variant="secondary" disabled>
                        Page {pagination.current_page}
                    </Button>
                    {pagination.next_page && (
                        <Link href={`/latest-anime?page=${pagination.next_page}`}>
                            <Button variant="outline">
                                Next
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
