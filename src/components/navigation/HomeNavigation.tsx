'use client';

import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const sections = [
    'top-anime',
    'latest-anime',
    'top-films',
    'latest-films',
    'around-world',
    'tv-shows'
];

export function HomeNavigation() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canGoUp, setCanGoUp] = useState(false);
    const [canGoDown, setCanGoDown] = useState(true);
    const [availableSections, setAvailableSections] = useState<string[]>([]);

    useEffect(() => {
        const updateSections = () => {
            const existingSections = sections.filter(id => document.getElementById(id));
            setAvailableSections(existingSections);
            return existingSections;
        };

        // Initial check
        let existingSections = updateSections();

        // Observer for scrolling
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Re-check existing sections in case they changed
                        existingSections = updateSections();
                        const index = existingSections.indexOf(entry.target.id);
                        if (index !== -1) {
                            setCurrentIndex(index);
                            setCanGoUp(index > 0);
                            setCanGoDown(index < existingSections.length - 1);
                        }
                    }
                });
            },
            // Root margin creates a "trigger line" near the top of the screen
            // -80px: Ignore the top 80px (header height + buffer)
            // -80%: Ignore the bottom 80% of the screen
            // This ensures we only detect what's currently at the top
            { threshold: 0, rootMargin: '-80px 0px -80% 0px' }
        );

        // Watch for DOM changes (in case sections load late)
        const mutationObserver = new MutationObserver(() => {
            const newSections = updateSections();
            // Re-observe elements if they appeared
            newSections.forEach((id) => {
                const element = document.getElementById(id);
                if (element) observer.observe(element);
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        // Initial observation
        existingSections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    const scrollToSection = (direction: 'up' | 'down') => {
        if (availableSections.length === 0) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (targetIndex >= 0 && targetIndex < availableSections.length) {
            const element = document.getElementById(availableSections[targetIndex]);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    if (availableSections.length === 0) return null;

    return (
        <div className="fixed right-4 bottom-20 md:right-6 md:bottom-6 z-50 flex flex-col gap-2">
            {/* Up Button */}
            <button
                onClick={() => scrollToSection('up')}
                disabled={!canGoUp}
                className={`
          brutal-border brutal-shadow-sm bg-background p-4 md:p-3
          transition-all duration-200
          ${canGoUp
                        ? 'hover:brutal-shadow hover:bg-primary hover:text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px]'
                        : 'opacity-30 cursor-not-allowed'
                    }
        `}
                aria-label="Previous section"
            >
                <ChevronUp className="h-6 w-6" />
            </button>

            {/* Section Indicator */}
            <div className="brutal-border bg-background px-3 py-2 text-center">
                <span className="font-black text-xs">
                    {currentIndex + 1}/{availableSections.length}
                </span>
            </div>

            {/* Down Button */}
            <button
                onClick={() => scrollToSection('down')}
                disabled={!canGoDown}
                className={`
          brutal-border brutal-shadow-sm bg-background p-4 md:p-3
          transition-all duration-200
          ${canGoDown
                        ? 'hover:brutal-shadow hover:bg-primary hover:text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px]'
                        : 'opacity-30 cursor-not-allowed'
                    }
        `}
                aria-label="Next section"
            >
                <ChevronDown className="h-6 w-6" />
            </button>
        </div>
    );
}
