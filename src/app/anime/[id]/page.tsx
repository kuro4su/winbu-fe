import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAnimeDetails } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Tv, Calendar, ListVideo } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';
import { SynopsisSummary } from '@/components/content/SynopsisSummary';
import type { ContentItem } from '@/lib/types';

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  const anime = await getAnimeDetails(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <aside className="md:col-span-1">
          <Card className="overflow-hidden">
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
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {anime.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
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

            <div className="flex flex-wrap gap-2">
              {anime.info.genres.map((genre) => (
                <Badge key={genre.name} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Synopsis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{anime.synopsis}</p>
                <SynopsisSummary synopsis={anime.synopsis} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListVideo /> Episodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {anime.episodes.map((ep) => (
                    <li key={ep.id}>
                      <Link href={`/episode/${ep.id}`}>
                        <div className="block rounded-md border p-3 hover:bg-muted/50 transition-colors">
                           {ep.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {anime.recommendations.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">
                  Recommendations
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {anime.recommendations.map((rec) => (
                    <ContentCard key={rec.id} item={rec as ContentItem} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
