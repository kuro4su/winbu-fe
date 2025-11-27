import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAnimeDetails } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Tv, Calendar, ListVideo } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { CompactSynopsis } from '@/components/content/CompactSynopsis';
import { EpisodeList } from '@/components/content/EpisodeList';
import type { ContentItem } from '@/lib/types';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);

    if (!anime) {
        return {
            title: 'Anime Not Found',
        };
    }

    return {
        title: `${anime.title} - Bellonime`,
        description: anime.synopsis?.slice(0, 160) || `Watch ${anime.title} on Bellonime`,
        openGraph: {
            title: `${anime.title} - Bellonime`,
            description: anime.synopsis?.slice(0, 160) || `Watch ${anime.title} on Bellonime`,
            images: [
                {
                    url: anime.image,
                    width: 800,
                    height: 600,
                    alt: anime.title,
                },
            ],
        },
    };
}

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
    const anime = await getAnimeDetails(params.id);

    if (!anime) {
        notFound();
    }

    return (
        <>
            <PageNavigation />
            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {/* Poster - Smaller on mobile */}
                    <aside className="md:col-span-1">
                        <Card className="overflow-hidden max-w-[200px] md:max-w-none mx-auto">
                            <div className="relative aspect-[2/3] w-full">
                                <Image
                                    src={anime.image}
                                    alt={anime.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint="anime poster"
                                    priority
                                />
                            </div>
                        </Card>
                    </aside>

                    <div className="md:col-span-2 lg:col-span-3">
                        <div className="space-y-4 md:space-y-6">
                            {/* Title & Info */}
                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    {anime.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                        <span>{anime.info.rating}</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1">
                                        <Tv className="h-4 w-4" />
                                        <span>Anime Series</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{anime.info.season}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2">
                                {anime.info.genres.map((genre) => {
                                    // Convert genre name to slug (lowercase, replace spaces with hyphens)
                                    const slug = genre.name.toLowerCase().replace(/\s+/g, '-');
                                    return (
                                        <Link key={genre.name} href={`/genre/${slug}`}>
                                            <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80 transition-colors">
                                                {genre.name}
                                            </Badge>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Synopsis - Compact */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Synopsis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CompactSynopsis synopsis={anime.synopsis} maxLength={250} />
                                </CardContent>
                            </Card>

                            {/* Episodes - Collapsible */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <ListVideo className="h-5 w-5" />
                                        Episodes ({anime.episodes.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <EpisodeList episodes={anime.episodes} initialShow={10} />
                                </CardContent>
                            </Card>

                            {/* Recommendations */}
                            {anime.recommendations.length > 0 && (
                                <div>
                                    <h2 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold tracking-tight">
                                        Recommendations
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                        {anime.recommendations.slice(0, 10).map((rec) => (
                                            <ContentCard key={rec.id} item={rec as ContentItem} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
