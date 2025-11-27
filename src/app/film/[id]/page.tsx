import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFilmDetails } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Film as FilmIcon } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';
import { VideoPlayer } from '@/components/content/VideoPlayer';
import type { ContentItem } from '@/lib/types';
import { Download, HardDrive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { CompactSynopsis } from '@/components/content/CompactSynopsis';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const film = await getFilmDetails(params.id);

  if (!film) {
    return {
      title: 'Film Not Found',
    };
  }

  return {
    title: `${film.title} - Bellonime`,
    description: film.synopsis?.slice(0, 160) || `Watch ${film.title} on Bellonime`,
    openGraph: {
      title: `${film.title} - Bellonime`,
      description: film.synopsis?.slice(0, 160) || `Watch ${film.title} on Bellonime`,
      images: [
        {
          url: film.image,
          width: 800,
          height: 600,
          alt: film.title,
        },
      ],
    },
  };
}

export default async function FilmDetailPage({ params }: { params: { id: string } }) {
  const film = await getFilmDetails(params.id);

  if (!film) {
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
            <div className="space-y-4 md:space-y-6">
              {/* Title & Info */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
                  {film.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground">
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

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {film.info.genres.map((genre) => {
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

              {/* Video Player */}
              <VideoPlayer streamOptions={film.stream_options} />

              {/* Download Links */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Download className="h-5 w-5" />
                    Download Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={film.downloads[0]?.resolution || '720p'} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      {film.downloads.map(res => (
                        <TabsTrigger key={res.resolution} value={res.resolution} className="text-xs md:text-sm">
                          {res.resolution}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {film.downloads.map(res => (
                      <TabsContent key={res.resolution} value={res.resolution} className="mt-3">
                        <div className="space-y-2">
                          {res.links.map(link => (
                            <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.server}>
                              <Button variant="outline" className="w-full justify-start text-sm">
                                <HardDrive className="mr-2 h-4 w-4" />
                                {link.server}
                              </Button>
                            </a>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Synopsis - Compact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Synopsis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompactSynopsis synopsis={film.synopsis} maxLength={250} />
                </CardContent>
              </Card>

              {/* Recommendations */}
              {film.recommendations.length > 0 && (
                <div>
                  <h2 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold tracking-tight">
                    Recommendations
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {film.recommendations.slice(0, 10).map((rec) => (
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
