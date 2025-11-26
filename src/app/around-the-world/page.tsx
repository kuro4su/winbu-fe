import { notFound } from 'next/navigation';
import { getOthers } from '@/lib/api';
import { ContentCard } from '@/components/content/ContentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';

export default async function AroundTheWorldPage({
    searchParams
}: {
    searchParams: { page?: string }
}) {
    const page = parseInt(searchParams.page || '1');
    const result = await getOthers(page);

    if (!result) {
        notFound();
    }

    const { data, pagination } = result;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Globe className="h-8 w-8" />
                    <h1 className="text-4xl font-bold tracking-tight">From Around the World</h1>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>
                                Page {pagination.current_page} of {pagination.total_pages}
                            </CardTitle>
                            <div className="flex gap-2">
                                {pagination.prev_page && (
                                    <Link href={`/around-the-world?page=${pagination.prev_page}`}>
                                        <Button variant="outline" size="sm">
                                            <ChevronLeft className="h-4 w-4 mr-1" />
                                            Previous
                                        </Button>
                                    </Link>
                                )}
                                {pagination.next_page && (
                                    <Link href={`/around-the-world?page=${pagination.next_page}`}>
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
                            {data.jepang_korea_china_barat.map((item) => (
                                <ContentCard key={item.id} item={item} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom Pagination */}
                <div className="flex justify-center gap-2">
                    {pagination.prev_page && (
                        <Link href={`/around-the-world?page=${pagination.prev_page}`}>
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
                        <Link href={`/around-the-world?page=${pagination.next_page}`}>
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
