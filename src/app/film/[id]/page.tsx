import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getFilmDetails } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Film as FilmIcon } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';
import { SynopsisSummary } from '@/components/content/SynopsisSummary';
import { VideoPlayer } from '@/components/content/VideoPlayer';
import type { ContentItem } from '@/lib/types';

export default async function FilmDetailPage({ params }: { params: { id: string } }) {
  const film = await getFilmDetails(params.id);

  if (!film) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <aside className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={film.image}
                alt={film.title}
                fill
                className="object-cover"
                data-ai-hint="film poster"
                priority
              />
            </div>
          </Card>
        </aside>

        <div className="md:col-span-2 lg:col-span-3">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {film.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span>{film.info.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <FilmIcon className="h-4 w-4" />
                  <span>Film</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {film.info.genres.map((genre) => (
                <Badge key={genre.name} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            
            <VideoPlayer streamOptions={film.stream_options} />

            <Card>
              <CardHeader>
                <CardTitle>Synopsis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{film.synopsis}</p>
                <SynopsisSummary synopsis={film.synopsis} />
              </CardContent>
            </Card>

            {film.recommendations.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">
                  Recommendations
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {film.recommendations.map((rec) => (
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
