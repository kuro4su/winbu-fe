'use client';

import { useEffect, useState } from 'react';
import { getHomeData } from '@/lib/api';
import { ContentCarousel } from '@/components/content/ContentCarousel';
import { ContentGrid } from '@/components/content/ContentGrid';
import { SkeletonCarousel, SkeletonGrid } from '@/components/content/SkeletonCard';
import { HomeNavigation } from '@/components/navigation/HomeNavigation';
import type { ContentItem } from '@/lib/types';

export default function Home() {
    const [homeData, setHomeData] = useState<any>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Fetch data
        getHomeData().then(setHomeData);

        // Parallax scroll effect
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!homeData) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8">
                <SkeletonCarousel />
                <SkeletonGrid />
                <SkeletonCarousel />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* Brutal Grid Background */}
            <div className="fixed inset-0 brutal-grid-lg opacity-20 pointer-events-none" />

            {/* Home Navigation - Sticky Sidebar */}
            <HomeNavigation />

            {/* Parallax Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b-4 border-foreground bg-background">
                {/* Parallax Layers */}
                <div
                    className="absolute inset-0 brutal-grid opacity-10"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                />

                {/* Floating Brutal Elements */}
                <div
                    className="absolute top-20 left-10 brutal-border brutal-shadow bg-primary w-20 h-20"
                    style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}
                />
                <div
                    className="absolute bottom-40 right-20 brutal-border brutal-shadow bg-accent w-16 h-16"
                    style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${-scrollY * 0.1}deg)` }}
                />
                <div
                    className="absolute top-1/2 right-1/4 brutal-border bg-secondary w-12 h-12"
                    style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                />

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4">
                    <div className="brutal-border brutal-shadow-lg bg-background p-8 md:p-12 inline-block">
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                            BELLO<span className="text-primary">NIME</span>
                        </h1>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-2 w-24 bg-primary" />
                            <p className="text-xl md:text-2xl font-black uppercase">
                                BRUTAL ANIME
                            </p>
                            <div className="h-2 w-24 bg-secondary" />
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-12 brutal-border brutal-shadow-sm bg-card px-6 py-3 inline-block">
                        <p className="font-black uppercase text-xs">SCROLL DOWN ↓</p>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="relative container mx-auto px-4 py-12 space-y-12">
                {/* Top 10 Anime - Carousel */}
                {homeData.top10_anime && homeData.top10_anime.length > 0 && (
                    <section id="top-anime">
                        <ContentCarousel
                            title="⚡ TOP 10 ANIME"
                            items={homeData.top10_anime as ContentItem[]}
                        />
                    </section>
                )}

                {/* Latest Anime - Vertical Grid */}
                {homeData.latest_anime && homeData.latest_anime.length > 0 && (
                    <section id="latest-anime">
                        <ContentGrid
                            title="🆕 LATEST ANIME EPISODES"
                            items={homeData.latest_anime as ContentItem[]}
                            moreLink="/latest-anime"
                        />
                    </section>
                )}

                {/* Top 10 Films - Carousel */}
                {homeData.top10_film && homeData.top10_film.length > 0 && (
                    <section id="top-films">
                        <ContentCarousel
                            title="🎬 TOP 10 FILMS"
                            items={homeData.top10_film as ContentItem[]}
                        />
                    </section>
                )}

                {/* Latest Films - Vertical Grid */}
                {homeData.latest_film && homeData.latest_film.length > 0 && (
                    <section id="latest-films">
                        <ContentGrid
                            title="🎥 FILMS"
                            items={homeData.latest_film as ContentItem[]}
                            moreLink="/latest-films"
                        />
                    </section>
                )}

                {/* Around the World - Vertical Grid */}
                {homeData.jepang_korea_china_barat && homeData.jepang_korea_china_barat.length > 0 && (
                    <section id="around-world">
                        <ContentGrid
                            title="🌍 KOREA CHINA JEPANG BARAT"
                            items={homeData.jepang_korea_china_barat as ContentItem[]}
                            moreLink="/around-the-world"
                        />
                    </section>
                )}

                {/* Latest TV Shows - Vertical Grid */}
                {homeData.tv_show && homeData.tv_show.length > 0 && (
                    <section id="tv-shows">
                        <ContentGrid
                            title="📺 TV SHOWS"
                            items={homeData.tv_show as ContentItem[]}
                            moreLink="/tv-shows"
                        />
                    </section>
                )}
            </div>
        </div>
    );
}
