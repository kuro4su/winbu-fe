'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Episode {
    id: string;
    title: string;
}

interface EpisodeListProps {
    episodes: Episode[];
    initialShow?: number;
}

export function EpisodeList({ episodes, initialShow = 10 }: EpisodeListProps) {
    const [showAll, setShowAll] = useState(false);
    const displayedEpisodes = showAll ? episodes : episodes.slice(0, initialShow);
    const hasMore = episodes.length > initialShow;

    return (
        <div className="space-y-3">
            <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {displayedEpisodes.map((ep) => (
                    <li key={ep.id}>
                        <a
                            href={`/episode/${ep.id}`}
                            className="block rounded-md border p-2.5 hover:bg-muted/50 transition-colors text-sm"
                        >
                            {ep.title}
                        </a>
                    </li>
                ))}
            </ul>

            {hasMore && (
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? (
                        <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            Show More ({episodes.length - initialShow} more episodes)
                        </>
                    )}
                </Button>
            )}
        </div>
    );
}
