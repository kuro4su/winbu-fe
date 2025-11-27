'use client';

import { ContentCard } from './ContentCard';
import { Button } from '@/components/ui/button';
import type { ContentItem } from '@/lib/types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ContentGridProps {
    title: string;
    items: ContentItem[];
    moreLink?: string;
}

export function ContentGrid({ title, items, moreLink }: ContentGridProps) {
    return (
        <section className="brutal-border brutal-shadow bg-background p-6 md:p-8">
            {/* Section Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                        {title}
                    </h2>
                    {moreLink && (
                        <Link href={moreLink}>
                            <Button
                                className="brutal-border brutal-shadow-sm bg-primary text-primary-foreground font-black uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
                            >
                                VIEW ALL
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    )}
                </div>
                <div className="h-1 w-24 bg-primary" />
            </div>

            {/* Vertical Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {items.map((item, index) => (
                    <ContentCard key={`${item.id}-${index}`} item={item} />
                ))}
            </div>
        </section>
    );
}
