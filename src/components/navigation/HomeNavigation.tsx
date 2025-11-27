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
        // Filter sections that actually exist in the DOM
        const existingSections = sections.filter(id => document.getElementById(id));
        setAvailableSections(existingSections);

        if (existingSections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = existingSections.indexOf(entry.target.id);
                        if (index !== -1) {
                            setCurrentIndex(index);
                            setCanGoUp(index > 0);
                            setCanGoDown(index < existingSections.length - 1);
                        }
                    }
                });
            },
            { threshold: 0.2, rootMargin: '-100px 0px -100px 0px' }
        );

        existingSections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (direction: 'up' | 'down') => {
        if (availableSections.length === 0) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (targetIndex >= 0 && targetIndex < availableSections.length) {
            const element = document.getElementById(availableSections[targetIndex]);
            if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
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
