import { getGenres } from '@/lib/api';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import Link from 'next/link';
import { Tag } from 'lucide-react';

export default async function GenresPage() {
    const genres = await getGenres();

    return (
        <>
            <PageNavigation />

            <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
                {/* Brutal Header */}
                <div className="brutal-border brutal-shadow-lg bg-background p-6 md:p-10 relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary opacity-20 -rotate-12 translate-x-10 -translate-y-10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary opacity-20 rotate-45 -translate-x-10 translate-y-10" />

                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                            <Tag className="inline-block w-8 h-8 md:w-12 md:h-12 mr-4 mb-2" />
                            Browse Genres
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-muted-foreground max-w-2xl">
                            EXPLORE OUR COLLECTION OF {genres?.length || 0} GENRES. FIND YOUR VIBE.
                        </p>
                    </div>
                </div>

                {/* Genres Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {genres?.map((genre) => (
                        <Link
                            key={genre.slug}
                            href={`/genre/${genre.slug}`}
                            className="group relative"
                        >
                            <div className="brutal-border bg-card p-6 h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:brutal-shadow-lg flex flex-col justify-between min-h-[120px]">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity">
                                        #
                                    </span>
                                    <span className="brutal-border bg-primary text-primary-foreground text-xs font-bold px-2 py-1">
                                        {genre.count}
                                    </span>
                                </div>

                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors break-words">
                                    {genre.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>

                {!genres?.length && (
                    <div className="brutal-border bg-destructive/10 p-8 text-center">
                        <h3 className="text-2xl font-bold text-destructive mb-2">NO GENRES FOUND</h3>
                        <p className="font-mono">Could not load genre list. Please try again later.</p>
                    </div>
                )}
            </div>
        </>
    );
}
