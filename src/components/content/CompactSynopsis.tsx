'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CompactSynopsisProps {
    synopsis: string;
    maxLength?: number;
}

export function CompactSynopsis({ synopsis, maxLength = 300 }: CompactSynopsisProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = synopsis.length > maxLength;
    const displayText = isExpanded || !shouldTruncate
        ? synopsis
        : synopsis.slice(0, maxLength) + '...';

    return (
        <div className="space-y-3">
            <p className="text-muted-foreground text-sm leading-relaxed">
                {displayText}
            </p>
            {shouldTruncate && (
                <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
            )}
        </div>
    );
}
