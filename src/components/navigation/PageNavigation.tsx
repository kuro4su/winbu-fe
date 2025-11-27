'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Home } from 'lucide-react';

export function PageNavigation() {
    const router = useRouter();

    return (
        <div className="fixed left-4 bottom-20 md:left-6 md:bottom-6 z-50 flex flex-col gap-2">
            <button
                onClick={() => router.back()}
                className="brutal-border brutal-shadow-sm bg-background p-4 md:p-3 hover:brutal-shadow hover:bg-primary hover:text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                aria-label="Go back"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={() => router.push('/')}
                className="brutal-border brutal-shadow-sm bg-background p-4 md:p-3 hover:brutal-shadow hover:bg-primary hover:text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                aria-label="Go home"
            >
                <Home className="h-6 w-6" />
            </button>
        </div>
    );
}
